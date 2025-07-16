import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export function getSortedFiles(dir: string): string[] {
  return Array.from(Deno.readDirSync(dir))
    .filter((f) => f.isFile && f.name.endsWith(".md"))
    .map((f) => f.name)
    .sort();
}

export function groupFilesByPrefix(files: string[]): Record<string, string[]> {
  const prefixGroups: Record<string, string[]> = {};

  for (const file of files) {
    const match = file.match(/^([A-Z]?)(\d{3})_/);
    const prefix = match?.[1] ?? "";
    if (!prefixGroups[prefix]) prefixGroups[prefix] = [];
    prefixGroups[prefix].push(file);
  }

  return prefixGroups;
}

export async function renumberFiles(
  prefixGroups: Record<string, string[]>,
  dir: string,
): Promise<string[]> {
  const updatedFiles: string[] = [];

  for (const [prefix, groupFiles] of Object.entries(prefixGroups)) {
    const sortedFiles = groupFiles.sort();

    for (const [idx, file] of sortedFiles.entries()) {
      const match = file.match(/^([A-Z]?)(\d{3})_(.*)/);
      if (!match) {
        updatedFiles.push(file);
        continue;
      }

      const [, , , title] = match;
      const newNumber = String(idx + 1).padStart(3, "0");
      const newFilename = `${prefix}${newNumber}_${title.toLowerCase()}`;

      if (file !== newFilename) {
        await Deno.rename(join(dir, file), join(dir, newFilename));
        console.log(`Renamed ${file} → ${newFilename}`);
      }
      updatedFiles.push(newFilename);
    }
  }

  return updatedFiles.sort();
}


export function createTitleMap(files: string[]): Map<string, {originalTitle: string, prefix: string}> {
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
  
  return titleMap;
}