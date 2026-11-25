// The Internet in One Word: "captcha"
// One word for the whole internet. The internet makes humans prove to
// robots that they are not robots. Funny, true of the whole internet,
// surprising, and it lands in one beat: 7 letters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "captcha";

if (WORD.length < 1 || WORD.length > 30) {
  throw new Error(`entry must be 1-30 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be a single word with no whitespace");
}
if (WORD.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD + "\n", "utf8");
if (readFileSync(outPath, "utf8") !== WORD + "\n") {
  throw new Error("read-back check failed: entry.txt does not match the validated word");
}
