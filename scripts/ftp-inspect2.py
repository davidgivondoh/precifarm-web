"""Look specifically inside /domains/precifarm.com/ after the deploy."""
import ftplib, os, ssl
from pathlib import Path


def _load_env_file(path):
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())


_load_env_file(Path(".env.ftp.local"))

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
ftp = ftplib.FTP_TLS(context=ctx)
ftp.connect(host=os.environ["HOSTINGER_FTP_HOST"], port=21, timeout=60)
ftp.login(user=os.environ["HOSTINGER_FTP_USER"], passwd=os.environ["HOSTINGER_FTP_PASSWORD"])
ftp.prot_p()
ftp.set_pasv(True)

for target in ["/domains/precifarm.com", "/domains/precifarm.com/public_html"]:
    print(f"\n=== {target} ===")
    try:
        ftp.cwd(target)
        print(f"pwd: {ftp.pwd()}")
        ftp.retrlines("LIST")
    except Exception as e:
        print(f"FAILED: {e}")

ftp.quit()
