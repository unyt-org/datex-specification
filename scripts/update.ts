import { basename, join } from "https://deno.land/std@0.224.0/path/mod.ts";

const rootDir = Deno.cwd();

async function updateHeadings() {
  for await (const entry of Deno.readDir(rootDir)) {
    console.log("Methode betreten: ", entry.name);
    if (!entry.isFile || !entry.name.endsWith(".md")) continue;

    const filePath = join(rootDir, entry.name);
    const filename = basename(filePath);

    console.log(`Processing: ${filename}`);

    const match = filename.match(/^([A-Z]?)(\d{3})_/);
    if (!match) continue;

    const [, prefix, number] = match;
    const chapterNumber = prefix + parseInt(number, 10);

    let content = await Deno.readTextFile(filePath);
    const lines = content.split("\n");

    let h2Count = 0;
    let h3Count = 0;

    const updatedLines = lines.map((line) => {
      if (line.match(/^# /)) {
        h2Count = 0;
        h3Count = 0;
        return line.replace(
          /^#\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
          `# ${chapterNumber} $2`,
        );
      }
      if (line.match(/^## /)) {
        h2Count++;
        h3Count = 0;
        return line.replace(
          /^##\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
          `## ${chapterNumber}.${h2Count} $2`,
        );
      }
      if (line.match(/^### /)) {
        h3Count++;
        return line.replace(
          /^###\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
          `### ${chapterNumber}.${h2Count}.${h3Count} $2`,
        );
      }
      return line;
    });

    await Deno.writeTextFile(filePath, updatedLines.join("\n"));
  }
}

await updateHeadings();
console.log("Headings updated");
