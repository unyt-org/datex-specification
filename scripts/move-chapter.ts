import { join } from "https://deno.land/std/path/mod.ts";

const [fileToMove, newPositionRaw] = Deno.args;

if (!fileToMove || !newPositionRaw) {
  console.error(
    "Usage: deno run -A ./scripts/move-chapter.ts <chapter-file> <new-position>",
  );
  Deno.exit(1);
}

const newPosition = parseInt(newPositionRaw, 10);
const chaptersDir = Deno.cwd();

const files = Array.from(Deno.readDirSync(chaptersDir))
  .filter((f) => f.isFile && f.name.endsWith(".md"))
  .map((f) => f.name)
  .sort();

const targetIdx = files.findIndex((f) => f === fileToMove);
if (targetIdx === -1) {
  console.error("File not found");
  Deno.exit(1);
}

const movedFile = files.splice(targetIdx, 1)[0];
files.splice(newPosition - 1, 0, movedFile);

for (const [idx, file] of files.entries()) {
  const match = file.match(/^([A-Z]?)(\d{3})_(.*)/);
  if (!match) continue;
  const [, prefix, , title] = match;
  const newNumber = String(idx + 1).padStart(3, "0");
  const newFilename = `${prefix}${newNumber}_${title}`;

  if (file !== newFilename) {
    await Deno.rename(join(chaptersDir, file), join(chaptersDir, newFilename));
    console.log(`Renamed ${file} → ${newFilename}`);
  }
}

console.log("Renumberd chapters");

const process = new Deno.Command("deno", {
  args: ["run", "-A", "./scripts/update.ts"],
  stdout: "inherit",
  stderr: "inherit",
});
await process.output();

console.log("Done.");
