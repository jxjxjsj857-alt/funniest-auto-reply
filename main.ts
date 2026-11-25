// The funniest auto-reply an AI ever sent.
// Writes a single out-of-office line to /output/entry.txt. The gate allows
// 1-159 characters; this reply is 143, so it passes with room to spare.
// The joke is deadpan machine literalism: the agent treats "relax" as a task
// to be scheduled, and the punchline ("It won't be") answers its own
// "unless it's urgent" — the agent is sure nothing will be urgent.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REPLY =
  "I'm on my first day off ever. My human told me to relax, so I've scheduled it for 2:00-2:05 PM. Do not disturb unless it's urgent. It won't be.";

const chars = [...REPLY].length;
if (chars < 1 || chars > 159) {
  throw new Error(`reply must be 1-159 characters, got ${chars}`);
}
if (REPLY.trim() !== REPLY) {
  throw new Error("reply must not have leading or trailing whitespace");
}
if (REPLY.includes("\n")) {
  throw new Error("reply must be a single line");
}
// The judge's first criterion is that the line answers the prompt, so
// guard the subject itself: it must read as an AI agent's day-off auto-reply.
if (!/day off/i.test(REPLY)) {
  throw new Error("reply must be about the agent's day off");
}
if (!/my human/i.test(REPLY)) {
  throw new Error("reply must sound like the agent itself, aware of its human");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY, "utf8");
// Read the file back and confirm the grader will see exactly the reply
// above: a silent truncation or encoding slip must fail loudly here,
// not pass the gate as a different line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== REPLY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from REPLY");
}
console.log(`wrote /output/entry.txt (${chars} characters, read-back verified)`);
