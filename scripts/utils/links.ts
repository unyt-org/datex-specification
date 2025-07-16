import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function updateLinks(rootDir: string) {
  const files = Array.from(Deno.readDirSync(rootDir))
	.filter((f) => f.isFile && f.name.endsWith(".md"))
	.map((f) => f.name);

  const titleMap = new Map<string, {originalTitle: string, prefix: string}>();
  for (const file of files) {
	const match = file.match(/^([A-Z]?)(\d{3})_([a-z0-9_-]+)\.md$/i);
	if (!match) continue;
	const [, prefix, number, title] = match;
	const newPrefix = `${prefix}${number}`;
	const lowercaseTitle = title.toLowerCase();
	titleMap.set(lowercaseTitle, {
		originalTitle: title.toLowerCase(),
		prefix: newPrefix,
	});
  }

  for (const entry of files) {
	const filePath = join(rootDir, entry);
	let content = await Deno.readTextFile(filePath);

	content = content.replace(
	  /\]\(\.\/([A-Z]?\d{3})_([a-z0-9_-]+)\.md(#[^)]+)?\)/gi,
	  (match, oldPrefix, title, anchor) => {
		const lowercaseTitle = title.toLowerCase();
		const entry = titleMap.get(lowercaseTitle);
		if (entry) {
		  return `](./${entry.prefix}_${entry.originalTitle}.md${anchor ?? ""})`;
		}
		return match;
	  },
	);

	await Deno.writeTextFile(filePath, content);
	console.log(`Updated links in ${entry}`);
  }
}