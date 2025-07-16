import { getSortedFiles, groupFilesByPrefix, renumberFiles } from "./utils/chapters.ts";
import { updateHeadings } from "./utils/headings.ts";
import { updateLinks } from "./utils/links.ts";
const rootDir = Deno.cwd();

const files = getSortedFiles(rootDir);
const prefixGroups = groupFilesByPrefix(files);
await renumberFiles(prefixGroups, rootDir);
await updateHeadings(rootDir);
await updateLinks(rootDir);
console.log("Headings and Links updated");
