import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { createTitleMap, getSortedFiles } from "./chapters.ts";

export async function updateLinks(rootDir: string) {
  const files = getSortedFiles(rootDir);
  const titleMap = createTitleMap(files);

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