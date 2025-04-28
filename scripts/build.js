import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Get the git information
const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
const lastCommitRef = execSync('git rev-parse --short HEAD').toString().trim();
const timestamp = new Date().toISOString();

console.log('Starting build process...');
console.log('Root directory:', rootDir);
console.log('Debug: Checking if src directory exists...');
console.log('Src directory contents:', execSync('ls -la src/').toString());

async function copyDir(src, dest) {
    try {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copyDir(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error(`Error copying directory from ${src} to ${dest}:`, error);
    }
}

async function addFooterToHtml() {
    const indexPath = path.join(rootDir, 'public', 'index.html');
    let html = await fs.readFile(indexPath, 'utf8');

    // Add footer with timestamp and commit information
    const footer = `
    <!-- Build information:
        - Last updated: ${timestamp}
        - Last commit (${lastCommitRef}): ${lastCommitMessage}
    -->`;

    // Insert footer before the closing body tag
    html = html.replace('</body>', `${footer}</body>`);

    // Write the modified file back
    await fs.writeFile(indexPath, html);
    console.log('Added footer with timestamp and commit information');
}

async function build() {
    try {
        // Ensure public directory exists and is empty
        await fs.rm('public', { recursive: true, force: true });
        await fs.mkdir('public', { recursive: true });

        // Copy all files from src to public
        await copyDir('src', 'public');

        // Add footer to index.html
        await addFooterToHtml();

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build(); 