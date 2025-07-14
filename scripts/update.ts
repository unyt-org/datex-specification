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

	const updatedLines = lines.map(line => {
		if (line.startsWith('# ')) return line.replace(/^# (.*)/, `# ${chapterNumber} $1`);
		if (line.startsWith('## ')) return line.replace(/^## (.*)/, `## ${chapterNumber}.1 $1`);
        if (line.startsWith('### ')) return line.replace(/^### (.*)/, `### ${chapterNumber}.1.1 $1`);
        return line;
	});
	fs.writeFileSync(filePath, updatedLines.join('\n'));
}

fs.readdirSync(rootDir)
		.filter(file => file.endsWith('.md'))
		.forEach(file => updateHeadings(path.join(rootDir, file)));

console.log('Headings updated');
