import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const bundledPython = join(
  homedir(),
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3.12",
);

const candidates = [
  process.env.CV_PYTHON,
  "python3",
  existsSync(bundledPython) ? bundledPython : undefined,
].filter(Boolean);

const python = candidates.find((candidate) => {
  const probe = spawnSync(candidate, ["-c", "import reportlab, pypdf"], {
    cwd: root,
    stdio: "ignore",
  });
  return probe.status === 0;
});

if (!python) {
  console.error(
    "No se encontró Python con reportlab y pypdf. Instálalos con: python3 -m pip install -r requirements-cv.txt",
  );
  process.exit(1);
}

const result = spawnSync(python, [join(root, "scripts/generate_cv.py")], {
  cwd: root,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
