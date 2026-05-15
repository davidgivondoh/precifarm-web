"""
One-shot FTPS deploy: mirrors ./out/ to the FTP user's landing directory.

Reads FTP credentials from environment:
  HOSTINGER_FTP_HOST, HOSTINGER_FTP_USER, HOSTINGER_FTP_PASSWORD

This script is intentional: GitHub Actions CI on the repo has been failing at
workflow startup since the repo was created, so the GH Actions FTP deploy job
hasn't run. Use this until the CI startup_failure root cause is found.
"""
from __future__ import annotations

import ftplib
import os
import ssl
import sys
import time
from pathlib import Path


LOCAL_ROOT = Path("out")
HOST = os.environ["HOSTINGER_FTP_HOST"]
USER = os.environ["HOSTINGER_FTP_USER"]
PASSWORD = os.environ["HOSTINGER_FTP_PASSWORD"]
SKIP_MATCHING_SIZE = os.environ.get("FTP_DEPLOY_SKIP_MATCHING", "1") == "1"
# Hostinger note: the .admin FTP user lands at /public_html, but the actual webroot
# for precifarm.com is the PARENT of that directory. Set REMOTE_TARGET_DIR=/ to
# upload to the chroot root.
REMOTE_TARGET_DIR = os.environ.get("REMOTE_TARGET_DIR", "/")


def open_session() -> ftplib.FTP_TLS:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    ftp = ftplib.FTP_TLS(context=ctx)
    ftp.connect(host=HOST, port=21, timeout=60)
    ftp.login(user=USER, passwd=PASSWORD)
    ftp.prot_p()
    ftp.set_pasv(True)
    if REMOTE_TARGET_DIR:
        try:
            ftp.cwd(REMOTE_TARGET_DIR)
        except ftplib.error_perm as e:
            raise RuntimeError(f"Failed to cwd to REMOTE_TARGET_DIR={REMOTE_TARGET_DIR}: {e}")
    return ftp


def remote_size(ftp: ftplib.FTP_TLS, remote_path: str) -> int | None:
    try:
        return ftp.size(remote_path)
    except ftplib.error_perm:
        return None
    except Exception:
        return None


def main() -> int:
    if not LOCAL_ROOT.is_dir():
        sys.exit(f"./{LOCAL_ROOT} not found. Run `pnpm build` first.")

    files = sorted(p for p in LOCAL_ROOT.rglob("*") if p.is_file())
    total_files = len(files)
    total_bytes = sum(p.stat().st_size for p in files)
    print(f"Deploying {total_files} files ({total_bytes // 1024} KB) to ftps://{USER}@{HOST}/")

    ftp = open_session()
    pwd = ftp.pwd()
    print(f"Connected. Landed at: {pwd}")

    ensured_dirs: set[str] = set()

    def ensure_dir(_ftp: ftplib.FTP_TLS, remote_dir: str) -> None:
        if not remote_dir or remote_dir in ensured_dirs:
            return
        parts = remote_dir.split("/")
        path = ""
        for part in parts:
            if not part:
                continue
            path = f"{path}/{part}" if path else part
            if path in ensured_dirs:
                continue
            try:
                _ftp.mkd(path)
            except ftplib.error_perm as e:
                if not str(e).startswith("550"):
                    raise
            ensured_dirs.add(path)

    start = time.time()
    uploaded_bytes = 0
    skipped = 0
    for i, local in enumerate(files, 1):
        rel = local.relative_to(LOCAL_ROOT).as_posix()
        remote_dir = "/".join(rel.split("/")[:-1])
        size = local.stat().st_size

        last_err: Exception | None = None
        for attempt in range(1, 4):
            try:
                if remote_dir:
                    ensure_dir(ftp, remote_dir)
                if SKIP_MATCHING_SIZE:
                    rs = remote_size(ftp, rel)
                    if rs is not None and rs == size:
                        skipped += 1
                        uploaded_bytes += size
                        pct = 100 * uploaded_bytes / total_bytes if total_bytes else 100
                        print(f"  [{i:>3}/{total_files}] {rel} ({size // 1024} KB) — skipped (already uploaded) — {pct:5.1f}%")
                        last_err = None
                        break
                with local.open("rb") as fh:
                    ftp.storbinary(f"STOR {rel}", fh, blocksize=64 * 1024)
                uploaded_bytes += size
                pct = 100 * uploaded_bytes / total_bytes if total_bytes else 100
                print(f"  [{i:>3}/{total_files}] {rel} ({size // 1024} KB) — {pct:5.1f}%")
                last_err = None
                break
            except (EOFError, ftplib.error_temp, ftplib.error_proto, OSError, TimeoutError) as e:
                last_err = e
                print(f"    -> error on attempt {attempt}: {type(e).__name__}: {e}. Reconnecting…")
                try:
                    ftp.close()
                except Exception:
                    pass
                time.sleep(2 * attempt)
                ftp = open_session()
                ensured_dirs.clear()
        if last_err is not None:
            print(f"FATAL: gave up on {rel} after 3 attempts: {last_err}")
            try:
                ftp.close()
            except Exception:
                pass
            return 1

    try:
        ftp.quit()
    except Exception:
        try:
            ftp.close()
        except Exception:
            pass
    elapsed = time.time() - start
    print(f"\nDone. {total_files} files / {total_bytes // 1024} KB in {elapsed:.1f}s ({skipped} skipped as already-uploaded)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
