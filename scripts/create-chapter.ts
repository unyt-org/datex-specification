import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { updateHeadings } from "./utils/headings.ts";
import { updateLinks } from "./utils/links.ts";
import { getSortedFiles, groupFilesByPrefix, renumberFiles } from "./utils/chapters.ts";

const excludeFiles = new Set(["README.md"]);

const [titleRaw, indexRaw] = Deno.args;

if (!titleRaw || !indexRaw) {
	console.error(
		"Usage: deno run -A ./scripts/create-chapter.ts <title> <index>",
	);
	Deno.exit(1);
}

const title = titleRaw
	.toLowerCase()
	.replace(/\s+/g, "_")
	.replace(/[^a-z0-9-]/g, "_");
const index = parseInt(indexRaw, 10);
const chaptersDir = Deno.cwd();

const files = getSortedFiles(chaptersDir)
  .filter((f) => !excludeFiles.has(f));

files.splice(Math.max(0, index - 1), 0, `TEMP_${title}.md`);

const prefixGroups = groupFilesByPrefix(files);

for (const [prefix, groupFiles] of Object.entries(prefixGroups)) {
  for (const [idx, file] of groupFiles.entries()) {
    if (file.startsWith("TEMP_")) {
      const newNumber = String(index).padStart(3, "0");
      const finalFilename = `${prefix}${newNumber}_${title}.md`;
      await Deno.writeTextFile(
        join(chaptersDir, finalFilename),
        `# ${prefix}${newNumber} ${titleRaw}\n\nTODO: Content`
      );
      console.log(`Created ${finalFilename}`);
      
      groupFiles[idx] = finalFilename;
    }
  }
}

await renumberFiles(prefixGroups, chaptersDir);
await updateHeadings(chaptersDir);
await updateLinks(chaptersDir);