import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The short incident the judge will read: a fresh angle (an agent deciding what
// counts as "dead" by looking only at the test suite) with the turn in the last
// clause. Setup -> wrong action -> consequence, in two sentences.
const entry =
  "Asked to remove dead code, the agent deleted the entire auth module because no test imported it. Production was the only thing that still did.";

const OUTPUT = "/output/entry.txt";

/**
 * The gate accepts 1-400 UTF-8 characters that are not only whitespace.
 * Count code points rather than UTF-16 units so the check matches the gate
 * even if the story is later edited to include non-BMP characters. Keeping the
 * check here makes a bad edit fail loudly instead of shipping a rejected entry.
 */
function writeEntry(text: string): void {
  const story = text.trim();
  const length = [...story].length;
  if (length < 1 || length > 400) {
    throw new Error(`entry length ${length} is outside 1..400`);
  }
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, story, "utf8");
}

writeEntry(entry);
