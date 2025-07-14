#!/usr/bin/env -S ts-node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const [,, fileToMove, newPosition] = process.argv;

if (!fileToMove || !newPosition) {
	console.error('Usage: pnpm ts-node ./scripts/move-chapter.ts <chapter-file> <new-position>');
	process.exit(1);
}

const chaptersDir = path.join(__dirname, '..');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

const targetIdx = files.findIndex(f => f === fileToMove);
if (targetIdx === -1) {
    console.error('File not found in chapters/');
    process.exit(1);
}

const movedFile = files.splice(targetIdx, 1)[0];
files.splice(Number(newPosition)-1, 0, movedFile);

files.forEach((file, idx) => {
    const match = file.match(/^([A-Z]?)(\d{3})_(.*)/);
    if (!match) return;
    const [, prefix, , title] = match;
    const newNumber = String(idx + 1).padStart(3, '0');
    const newFilename = `${prefix}${newNumber}_${title}`;
    fs.renameSync(path.join(chaptersDir, file), path.join(chaptersDir, newFilename));
    console.log(`Renamed ${file} → ${newFilename}`);
});

console.log("Renumberd chapters");

execSync('ts-node ./scripts/update.ts', { stdio: 'inherit' });