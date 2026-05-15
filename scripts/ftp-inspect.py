"""Inspect the FTP session: where does the user land, what's there, recent mtimes."""
from __future__ import annotations

import ftplib
import os
import ssl
from pathlib import Path


def _load_env_file(path: Path) -> None:
    """Lightweight .env loader so callers don't have to put creds on the command line."""
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())


_load_env_file(Path(".env.ftp.local"))

HOST = os.environ["HOSTINGER_FTP_HOST"]
USER = os.environ["HOSTINGER_FTP_USER"]
PASSWORD = os.environ["HOSTINGER_FTP_PASSWORD"]


def main() -> None:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    ftp = ftplib.FTP_TLS(context=ctx)
    ftp.connect(host=HOST, port=21, timeout=60)
    ftp.login(user=USER, passwd=PASSWORD)
    ftp.prot_p()
    ftp.set_pasv(True)

    print(f"PWD (landing dir): {ftp.pwd()}")
    print("\n--- Root listing (where we uploaded) ---")
    try:
        for line in ftp.retrlines("LIST"):
            pass  # printed automatically by retrlines
    except Exception as e:
        print(f"LIST failed: {e}")

    print("\n--- Try navigating up to see filesystem structure ---")
    try:
        ftp.cwd("..")
        print(f"After CDUP: {ftp.pwd()}")
        for line in ftp.retrlines("LIST"):
            pass
    except Exception as e:
        print(f"CDUP/LIST failed (likely chrooted): {e}")

    print("\n--- index.html size check at our upload location ---")
    try:
        ftp.cwd("/")
        ftp.cwd(os.environ.get("LOOK_AT", "."))
        print(f"At: {ftp.pwd()}")
        # Look for index.html
        size = ftp.size("index.html")
        print(f"index.html size at this dir: {size}")
    except Exception as e:
        print(f"size check failed: {e}")

    try:
        ftp.quit()
    except Exception:
        try:
            ftp.close()
        except Exception:
            pass


if __name__ == "__main__":
    main()
