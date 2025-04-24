import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Get the last commit message
const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
const timestamp = new Date().toISOString();

console.log('Starting build process...');
console.log('Root directory:', rootDir);
console.log('Debug: Checking if src directory exists...');
console.log('Src directory contents:', execSync('ls -la src/').toString());

// Create public directory if it doesn't exist
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
    console.log('Creating public directory...');
    fs.mkdirSync(publicDir, { recursive: true });
}

// Clean the public directory first
console.log('Cleaning public directory...');
execSync('rm -rf public/*');

// Copy all files from src to public
console.log('Copying files from src to public...');
execSync('cp -r src/* public/');

// Verify the files were copied
console.log('Verifying copied files...');
execSync('ls -la public/');

// Read the index.html file
const indexPath = path.join(publicDir, 'index.html');
console.log('Reading index.html from:', indexPath);
let html = fs.readFileSync(indexPath, 'utf8');

// Add footer with timestamp and commit message
const footer = `
    <footer class="text-center text-sm text-gray-500 mt-8 py-4">
        <p>Last updated: ${timestamp}</p>
        <p>Last commit: ${lastCommitMessage}</p>
    </footer>
`;

// Insert footer before the closing body tag
html = html.replace('</body>', `${footer}</body>`);

// Write the modified file back
console.log('Writing updated index.html...');
fs.writeFileSync(indexPath, html);

console.log('Build completed successfully!');
console.log('Final public directory contents:');
execSync('ls -la public/'); 