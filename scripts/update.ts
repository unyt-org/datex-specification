import fs from 'fs';
import path from 'path';

const rootDir = path.join(__dirname, '..');

function updateHeadings(filePath: string) {
	const filename = path.basename(filePath);
	 console.log(`Processing: ${filename}`);
	const match = filename.match(/^([A-Z]?)(\d{3})_/);

	if(!match) return;

	const [_, prefix, number] = match;
	const chapterNumber = prefix + parseInt(number, 10);

	let content = fs.readFileSync(filePath, "utf-8");
	const lines = content.split('\n');

	let h2Count = 0;
    let h3Count = 0;

	const updatedLines = lines.map(line => {
		if (line.match(/^# /)) {
			h2Count = 0;
			h3Count = 0;
			return line.replace(/^#\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/, `# ${chapterNumber} $2`);
		}
		if (line.match(/^## /)) {
			h2Count++;
			h3Count = 0;
			return line.replace(/^##\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/, `## ${chapterNumber}.${h2Count} $2`);
		}
		if (line.match(/^### /)) {
			h3Count++;
			return line.replace(/^###\s+(?:[A-Z]?\d+(\.\d+)*\s+)?(.*)/, `### ${chapterNumber}.${h2Count}.${h3Count} $2`);
		}
        return line;
	});
	fs.writeFileSync(filePath, updatedLines.join('\n'));
}

fs.readdirSync(rootDir)
		.filter(file => file.endsWith('.md'))
		.forEach(file => updateHeadings(path.join(rootDir, file)));

console.log('Headings updated');
