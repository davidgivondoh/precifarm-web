"""Just list /domains/precifarm.com/public_html/src/ to see cleanup progress."""
import ftplib, os, ssl
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
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
ftp = ftplib.FTP_TLS(context=ctx)
ftp.connect(host=os.environ["HOSTINGER_FTP_HOST"], port=21, timeout=60)
ftp.login(user=os.environ["HOSTINGER_FTP_USER"], passwd=os.environ["HOSTINGER_FTP_PASSWORD"])
ftp.prot_p()
ftp.set_pasv(True)
try:
    ftp.cwd("/domains/precifarm.com/public_html/src")
    print(f"=== {ftp.pwd()} ===")
    ftp.retrlines("LIST")
except Exception as e:
    print(f"src/ already gone or inaccessible: {e}")
ftp.quit()
