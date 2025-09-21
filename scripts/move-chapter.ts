import {
  getSortedFiles,
  groupFilesByPrefix,
  renumberFiles,
} from "./utils/chapters.ts";
import { updateLinks } from "./utils/links.ts";

const [fileToMove, newPositionRaw] = Deno.args;

if (!fileToMove || !newPositionRaw) {
  console.error(
    "Usage: deno run -A ./scripts/move-chapter.ts <chapter-file> <new-position>",
  );
  Deno.exit(1);
}

const newPosition = parseInt(newPositionRaw, 10);
const chaptersDir = Deno.cwd();

const files = getSortedFiles(chaptersDir);
const targetIdx = files.findIndex((f) => f === fileToMove);

if (targetIdx === -1) {
  console.error("File not found");
  Deno.exit(1);
}

const movedFile = files.splice(targetIdx, 1)[0];
files.splice(newPosition - 1, 0, movedFile);

const prefixGroups = groupFilesByPrefix(files);
await renumberFiles(prefixGroups, chaptersDir);

const oldPrefixes = new Map<string, string>();
files.forEach((file, i) => {
  const match = file.match(/^([A-Z]?\d{3})_/);
  if (match) oldPrefixes.set(match[1], (i + 1).toString().padStart(3, "0"));
});
await updateLinks(chaptersDir, oldPrefixes);

console.log("Renumbered chapters");

const process = new Deno.Command("deno", {
  args: ["run", "-A", "./scripts/update.ts"],
  stdout: "inherit",
  stderr: "inherit",
});
await process.output();

console.log("Done.");
