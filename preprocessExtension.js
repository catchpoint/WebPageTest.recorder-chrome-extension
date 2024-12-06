import {promises as fs} from 'fs';
import path from 'path';
 
 
const dist = 'dist';
const src = 'src';
const assets = 'assets';
 
try {
    await fs.mkdir(dist, { recursive: true });
} catch(err) {
    console.log(`${dist} already exists... [${err}]`);
}
 
console.log(`Copy file from ${src} to ${dist}`);
await fs.cp(src, dist, { recursive: true });
 
console.log('Clean...');
await fs.rm(path.join(dist, 'WebPageTestExportPlugin.js'));
 
console.log('Copy assets...');
await fs.cp(path.join(src, assets), dist, { recursive: true });
 
console.log('Preprocess completed.');