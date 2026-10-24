#!/usr/bin/env python3
"""Deterministic static validation for the DSH Caveman source package."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
required = ["README.md", "INSTALL_DSH.md", "package.json", "index.js", "cordis.patch.yml", "LICENSE", "NOTICE", "assets/icon.svg", "tests/plugin.spec.mjs"]
errors = []
for item in required:
    if not (ROOT / item).is_file():
        errors.append(f"missing required file: {item}")
try:
    pkg = json.loads((ROOT / "package.json").read_text())
except Exception as exc:
    print(f"FAIL: package.json: {exc}")
    sys.exit(1)
checks = {
    "version": pkg.get("version") == "0.2.1-rc.2",
    "engine target": pkg.get("engines", {}).get("dsh") == ">=0.2.1-rc.2 <0.2.2",
    "bundle patch declaration": pkg.get("dsh", {}).get("bundle", {}).get("patch") == "./cordis.patch.yml",
    "license": pkg.get("license") == "Apache-2.0",
    "package entry": pkg.get("main") == "./index.js",
}
for label, ok in checks.items():
    if not ok:
        errors.append(f"metadata check failed: {label}")
source = (ROOT / "index.js").read_text() if (ROOT / "index.js").exists() else ""
expected = ["caveman", "ultracave", "megacave", "caveman-review", "caveman-commit", "investigate-first", "lean-build", "migration", "safe-refactor", "surgical-patch", "verify-and-stop", "caveman-help"]
for skill in expected:
    if not re.search(r"entry\('" + re.escape(skill) + r"'", source):
        errors.append(f"missing skill declaration: {skill}")
for forbidden in ["node_modules", ".env", "id_rsa", "credentials.json"]:
    if (ROOT / forbidden).exists():
        errors.append(f"unexpected secret/dependency material: {forbidden}")
for path in ROOT.rglob("*"):
    if path.is_symlink():
        errors.append(f"symlink not allowed: {path.relative_to(ROOT)}")
    if path.suffix in {".pyc", ".pyo"} or "__pycache__" in path.parts:
        errors.append(f"transient Python bytecode not allowed: {path.relative_to(ROOT)}")
if errors:
    for err in errors:
        print(f"FAIL: {err}")
    sys.exit(1)
print(f"PASS: required files ({len(required)})")
print("PASS: version/engine/bundle/license/entry metadata")
print(f"PASS: expected skill declarations ({len(expected)})")
print("PASS: no detected symlinks, bytecode, node_modules, or obvious secret files")
