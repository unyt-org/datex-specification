import { updateHeadings } from "./utils/headings.ts";
import { updateLinks } from "./utils/links.ts";
const rootDir = Deno.cwd();

await updateHeadings(rootDir);
await updateLinks(rootDir);
console.log("Headings and Links updated");
