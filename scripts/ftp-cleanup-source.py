"""One-shot cleanup: remove repo source files left over in the Hostinger webroot
by the old hPanel Git auto-deploy. Idempotent and safe (only removes items in
the explicit allow-list below)."""
import ftplib
import os
import ssl
import sys
from pathlib import Path


def _load(path):
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())


_load(Path(".env.ftp.local"))

# Files and directories that are repo SOURCE artifacts and should NOT live in
# the webroot. Each entry is relative to /domains/precifarm.com/public_html/.
SOURCE_FILES = [
    ".editorconfig",
    ".env.example",
    ".gitignore",
    ".npmrc",
    ".nvmrc",
    ".prettierignore",
    ".prettierrc.cjs",
    "eslint.config.mjs",
    "lighthouserc.cjs",
    "next.config.mjs",
    "next-sitemap.config.mjs",
    "package.json",
    "playwright.config.ts",
    "pnpm-lock.yaml",
    "postcss.config.mjs",
    "README.md",
    "tsconfig.json",
    "TODO.md",
    "vitest.config.ts",
]

SOURCE_DIRS = [
    ".git",
    ".github",
    "content",
    "docs",
    "public",  # source assets dir; static export inlines its contents at the root, so this dir at webroot is purely leftover
    "scripts",
    "src",
]


def open_session() -> ftplib.FTP_TLS:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    ftp = ftplib.FTP_TLS(context=ctx)
    ftp.connect(host=os.environ["HOSTINGER_FTP_HOST"], port=21, timeout=60)
    ftp.login(user=os.environ["HOSTINGER_FTP_USER"], passwd=os.environ["HOSTINGER_FTP_PASSWORD"])
    ftp.prot_p()
    ftp.set_pasv(True)
    ftp.cwd("/domains/precifarm.com/public_html")
    return ftp


def rmtree_remote(ftp: ftplib.FTP_TLS, path: str) -> int:
    """Recursively delete `path` (file or dir). Returns count of items removed."""
    removed = 0
    try:
        listing = []
        ftp.retrlines(f"LIST {path}", listing.append)
    except ftplib.error_perm as e:
        if "550" in str(e):
            return 0
        raise

    # Single entry that doesn't start with 'd' → it's a file
    if len(listing) == 1 and not listing[0].lower().startswith("d"):
        try:
            ftp.delete(path)
            print(f"  file: {path}")
            return 1
        except ftplib.error_perm as e:
            print(f"  SKIP {path}: {e}")
            return 0

    # It's a directory — recurse into children
    try:
        children = []
        ftp.retrlines(f"LIST {path}", children.append)
    except ftplib.error_perm:
        return 0

    for raw in children:
        parts = raw.split(maxsplit=8)
        if len(parts) < 9:
            continue
        name = parts[8]
        if name in (".", ".."):
            continue
        child = f"{path}/{name}" if path else name
        removed += rmtree_remote(ftp, child)

    try:
        ftp.rmd(path)
        print(f"  dir : {path}/")
    except ftplib.error_perm as e:
        print(f"  SKIP {path}: {e}")
    return removed + 1


def main() -> int:
    apply = "--apply" in sys.argv
    print(f"Mode: {'APPLY (deleting)' if apply else 'DRY RUN (use --apply to delete)'}")

    ftp = open_session()
    print(f"Connected. PWD: {ftp.pwd()}")

    # Find which targets actually exist
    existing_files = []
    existing_dirs = []

    listing = []
    ftp.retrlines("LIST", listing.append)
    for raw in listing:
        parts = raw.split(maxsplit=8)
        if len(parts) < 9:
            continue
        name = parts[8]
        is_dir = raw.lower().startswith("d")
        if is_dir and name in SOURCE_DIRS:
            existing_dirs.append(name)
        elif not is_dir and name in SOURCE_FILES:
            existing_files.append(name)

    print(f"\nFound to remove: {len(existing_files)} files, {len(existing_dirs)} dirs")
    for f in existing_files:
        print(f"  file: {f}")
    for d in existing_dirs:
        print(f"  dir : {d}/")

    if not apply:
        print("\nDry run only. Re-run with --apply to actually delete.")
        ftp.quit()
        return 0

    print("\nDeleting...")
    total = 0
    for f in existing_files:
        try:
            ftp.delete(f)
            print(f"  file: {f}")
            total += 1
        except ftplib.error_perm as e:
            print(f"  SKIP {f}: {e}")
    for d in existing_dirs:
        total += rmtree_remote(ftp, d)

    print(f"\nDone. Removed {total} entries.")
    ftp.quit()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
