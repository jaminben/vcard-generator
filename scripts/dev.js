import browserSync from 'browser-sync';
import { spawn } from 'child_process';
import chokidar from 'chokidar';

// Initialize Browser-sync
const bs = browserSync.create();

// Start browser-sync server
bs.init({
    server: 'public',
    files: 'public/**/*',
    open: false,
    notify: false
});

// Watch for changes in src directory
const watcher = chokidar.watch('src', {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

// Run initial build
runBuild();

// Watch for file changes
watcher
    .on('change', path => {
        console.log(`File ${path} has been changed`);
        runBuild();
    })
    .on('add', path => {
        console.log(`File ${path} has been added`);
        runBuild();
    })
    .on('unlink', path => {
        console.log(`File ${path} has been removed`);
        runBuild();
    });

function runBuild() {
    const build = spawn('node', ['scripts/build.js'], {
        stdio: 'inherit'
    });

    build.on('close', code => {
        if (code === 0) {
            bs.reload();
        }
    });
} 