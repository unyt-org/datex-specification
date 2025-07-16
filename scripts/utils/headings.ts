import { join, basename } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function updateHeadings(rootDir: string) {
  for await (const entry of Deno.readDir(rootDir)) {
	if (!entry.isFile || !entry.name.endsWith(".md")) continue;

	const filePath = join(rootDir, entry.name);
	const filename = basename(filePath);

	const match = filename.match(/^([A-Z]?)(\d{3})_/);
	if (!match) continue;

	const [, prefix, number] = match;
	const chapterNumber = prefix + parseInt(number, 10);

	const content = await Deno.readTextFile(filePath);
	const lines = content.split("\n");

	let h2Count = 0;
	let h3Count = 0;
	let h4Count = 0;
	let h5Count = 0;

	const updatedLines = lines.map((line) => {
	  if (line.match(/^# /)) {
		h2Count = 0;
		h3Count = 0;
		h4Count = 0;
		h5Count = 0;
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
		h4Count = 0;
		return line.replace(
		  /^###\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
		  `### ${chapterNumber}.${h2Count}.${h3Count} $2`,
		);
	  }
	  if (line.match(/^#### /)) {
		h4Count++;
		h5Count = 0;
		return line.replace(
		  /^####\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
		  `#### ${chapterNumber}.${h2Count}.${h3Count}.${h4Count} $2`,
		);
	  }
	  if (line.match(/^##### /)) {
		h5Count++;
		return line.replace(
		  /^#####\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/,
		  `##### ${chapterNumber}.${h2Count}.${h3Count}.${h4Count}.${h5Count} $2`,
		);
	  }
	  return line;
	});

	await Deno.writeTextFile(filePath, updatedLines.join("\n"));
	console.log(`Updated headings: ${filename}`);
  }
}