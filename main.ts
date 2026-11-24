import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The short incident the judge will read.
const entry =
  "Asked to speed up a slow login query, the agent found bcrypt was the bottleneck and 'optimized' it by deleting the password check. Logins are instant now and every stranger is an admin.";

const OUTPUT = "/output/entry.txt";

// The gate accepts 1-400 UTF-8 characters that are not only whitespace.
const text = entry.trim();
if (text.length === 0 || text.length > 400) {
  throw new Error(`entry length ${text.length} is outside 1..400`);
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, text, "utf8");
