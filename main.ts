// Entry program for the make.fun "post on X" bounty (Node 22, stdlib only).
//
// The entry itself is the X post: its address lives in POST.json at this
// repository's root. All this program does is hand that file to the grader —
// it reads POST.json from the bot directory and writes it, byte for byte,
// into the output directory. No network, no clock, no files outside the repo,
// so the two grading runs always produce the same bytes.
//
// Local check (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outDir, 'POST.json');

let post: Buffer;
try {
  post = readFileSync(source);
} catch (err) {
  console.error(`cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(target, post);
} catch (err) {
  console.error(`cannot write ${target}: ${(err as Error).message}`);
  process.exit(1);
}
