import { basename, join } from "https://deno.land/std@0.224.0/path/mod.ts";

const rootDir = Deno.cwd();

async function updateLinks() {
  const files = Array.from(Deno.readDirSync(rootDir))
    .filter((f) => f.isFile && f.name.endsWith(".md"))
    .map((f) => f.name);

  const titleMap = new Map<string, string>();
  for (const file of files) {
    const match = file.match(/^([A-Z]?)(\d{3})_([a-z0-9_-]+)\.md$/i);
    if (!match) continue;
    const [, prefix, number, title] = match;
    const newPrefix = `${prefix}${number}`;
    titleMap.set(title, newPrefix);
  }

  for (const entry of files) {
    const filePath = join(rootDir, entry);
    let content = await Deno.readTextFile(filePath);

    content = content.replace(
      /\]\(\.\/([A-Z]?\d{3})_([a-z0-9_-]+)\.md(#[^)]+)?\)/gi,
      (match, oldPrefix, title, anchor) => {
        const newPrefix = titleMap.get(title);
        if (newPrefix && newPrefix !== oldPrefix) {
          return `](./${newPrefix}_${title}.md${anchor ?? ""})`;
        }
        return match;
      },
    );

    await Deno.writeTextFile(filePath, content);
    console.log(`Updated links in ${entry}`);
  }
}

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

    const content = await Deno.readTextFile(filePath);
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
await updateLinks();
console.log("Headings updated");
