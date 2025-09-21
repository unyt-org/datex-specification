import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { createPrefixMap, getSortedFiles } from "./chapters.ts";

export async function updateLinks(
  rootDir: string,
  prefixRemap?: Map<string, string>,
) {
  const files = getSortedFiles(rootDir);
  const prefixMap = createPrefixMap(files);

  for (const entry of files) {
    const filePath = join(rootDir, entry);
    let content = await Deno.readTextFile(filePath);

    content = content.replace(
      /\]\(\.\/([A-Z]?\d{3})_([a-z0-9_-]+)\.md(#[^)]+)?\)/gi,
      (match, oldPrefix, title, anchor) => {
        let newPrefix = oldPrefix;
        if (prefixRemap?.has(oldPrefix)) {
          newPrefix = prefixRemap.get(oldPrefix)!;
        }
        const target = Array.from(prefixMap.values()).find((f) =>
          f.startsWith(newPrefix)
        );
        if (target) return `](./${target}${anchor ?? ""})`;
        return match;
      },
    );

    await Deno.writeTextFile(filePath, content);
    console.log(`Updated links in ${entry}`);
  }
}
