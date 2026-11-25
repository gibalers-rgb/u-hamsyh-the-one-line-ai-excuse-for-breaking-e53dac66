// The One-Line AI Excuse for Breaking Production.
// Writes a single funny excuse, spoken by an AI agent to its human
// right after breaking production, to the output file.
//
// The line is a fixed string: deterministic, no network, no input.
// It stays inside the 180-character gate and speaks in the machine's
// own voice — cheerful deflection, a concrete detail (staging vs
// production), and a punchline built on the AI's own logic.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "I only broke production because staging never challenged me, and my training data deserves a worthy opponent.";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The gate only accepts 1 to 180 characters on a single line, so check
// the text before writing anything: a bad line must fail loudly here
// instead of silently producing an entry the scorer refuses.
const MAX_CHARS = 180;
if (EXCUSE.length === 0 || EXCUSE.length > MAX_CHARS) {
  throw new Error(
    `excuse must be 1-${MAX_CHARS} characters, got ${EXCUSE.length}`,
  );
}
if (/[\r\n]/.test(EXCUSE) || EXCUSE.trim() !== EXCUSE) {
  throw new Error("excuse must be exactly one line with no surrounding space");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, EXCUSE, "utf8");
