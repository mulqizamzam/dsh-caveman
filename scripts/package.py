#!/usr/bin/env python3
"""Build a deterministic source/release ZIP with fixed timestamps and ordering."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo
import hashlib, sys
root = Path(__file__).resolve().parents[1]
out = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else root.parent / 'dsh-caveman-0.2.1-rc.3.zip'
files = sorted(p for p in root.rglob('*') if p.is_file() and not p.is_symlink() and '__pycache__' not in p.parts and p.suffix not in {'.pyc', '.pyo'})
with ZipFile(out, 'w') as archive:
    for p in files:
        rel = p.relative_to(root).as_posix()
        info = ZipInfo(f'dsh-caveman/{rel}', date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, p.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=9)
digest = hashlib.sha256(out.read_bytes()).hexdigest()
print(f'PACKAGE={out}')
print(f'FILES={len(files)}')
print(f'SIZE={out.stat().st_size}')
print(f'SHA256={digest}')
