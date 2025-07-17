import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { getSortedFiles } from "./utils/chapters.ts";
import { updateHeadings } from "./utils/headings.ts";
import { updateLinks } from "./utils/links.ts";

const excludeFiles = new Set(["README.md"]);

const [indexRaw, newTitleRaw, optionalHeading] = Deno.args;

if (!indexRaw || !newTitleRaw) {
  console.error("Usage: deno run -A ./scripts/rename-chapter.ts <index> <new-filename-title> [optional-new-heading]");
  Deno.exit(1);
}

const index = parseInt(indexRaw, 10);
const newTitle = newTitleRaw
  .toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[^a-z0-9-]/g, "_");
const chaptersDir = Deno.cwd();

const files = getSortedFiles(chaptersDir)
  .filter((f) => !excludeFiles.has(f));

if (index < 1 || index > files.length) {
  console.error("Index out of range");
  Deno.exit(1);
}

const oldFile = files[index - 1];
const match = oldFile.match(/^([A-Z]?)(\d{3})_([a-z0-9_-]+)\.md$/);

if (!match) {
  console.error("Invalid file name");
  Deno.exit(1);
}

const [, prefix, number] = match;
const newFilename = `${prefix}${number}_${newTitle}.md`;

await Deno.rename(
  join(chaptersDir, oldFile),
  join(chaptersDir, newFilename)
);
console.log(`Renamed ${oldFile} → ${newFilename}`);

if (optionalHeading) {
  const filePath = join(chaptersDir, newFilename);
  let content = await Deno.readTextFile(filePath);

  content = content.replace(/^# .+$/m, `# ${optionalHeading}`);
  await Deno.writeTextFile(filePath, content);
  console.log(`Updated heading in ${newFilename} to '# ${optionalHeading}'`);
}

await updateHeadings(chaptersDir);
await updateLinks(chaptersDir);