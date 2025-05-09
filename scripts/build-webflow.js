import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function readFile(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return '';
    }
}

async function removeDir(dir) {
    try {
        const files = await fs.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.lstat(filePath);
            if (stat.isDirectory()) {
                await removeDir(filePath);
                await fs.rmdir(filePath);
            } else {
                await fs.unlink(filePath);
            }
        }
        await fs.rmdir(dir);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
}

async function build() {
    try {
        // Ensure dist directory exists and is empty
        await removeDir('dist');
        await fs.mkdir('dist', { recursive: true });

        // Use esbuild to bundle and minify JS for Webflow
        await esbuild.build({
            entryPoints: ['src/js/main.js'],
            bundle: true,
            minify: true,
            format: 'iife',
            outfile: 'dist/bundle.js',
            target: ['es2015'],
            platform: 'browser',
        });

        // Copy CSS file
        await fs.copyFile('src/css/styles.css', 'dist/styles.css');

        // Read the HTML file
        let html = await readFile('src/index.html');

        // Extract just the body content
        const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

        // Create a new HTML file with just the body content
        const webflowHtml = `
<!-- Olark vCard Generator -->
<!-- Add these links to your Webflow page head section -->
<link rel="stylesheet" href="styles.css">
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
<script src="bundle.js"></script>

${bodyContent}
`;

        // Write the final HTML file
        await fs.writeFile('dist/body-content.html', webflowHtml);

        // Copy images
        await fs.mkdir('dist/images', { recursive: true });
        await fs.copyFile('src/images/olark-logo-white.svg', 'dist/images/olark-logo-white.svg');
        await fs.copyFile('src/images/olark-logo-black.svg', 'dist/images/olark-logo-black.svg');

        console.log('Webflow build completed successfully!');
        console.log('Files are available in the dist directory:');
        console.log('- dist/body-content.html (paste this into your Webflow page)');
        console.log('- dist/styles.css (upload to Webflow)');
        console.log('- dist/bundle.js (upload to Webflow)');
        console.log('- dist/images/ (upload to Webflow)');
        console.log('\nInstructions:');
        console.log('1. Upload styles.css, bundle.js, and the images folder to Webflow');
        console.log('2. Copy the contents of body-content.html and paste it into your Webflow page');
        console.log('3. Add the link and script tags from body-content.html to your page head section');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build(); 