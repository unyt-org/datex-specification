import {
  getSortedFiles,
  groupFilesByPrefix,
  renumberFiles,
} from "./utils/chapters.ts";
import { updateHeadings } from "./utils/headings.ts";
import { updateLinks } from "./utils/links.ts";
import { updateMarkdownFiles } from "@unyt/speck/markdown-generator.ts";

const rootDir = Deno.cwd();

// Generate speck tables
await updateMarkdownFiles(new URL("file://" + rootDir + "/"));
console.log("Speck tables updated");

// Update chapter numbering and linking
const files = getSortedFiles(rootDir);
const prefixGroups = groupFilesByPrefix(files);
await renumberFiles(prefixGroups, rootDir);
await updateHeadings(rootDir);
await updateLinks(rootDir);
console.log("Headings and Links updated");

// Deno fmt
new Deno.Command(Deno.execPath(), {
  args: ["fmt", rootDir],
}).output();
console.log("Files formatted");
