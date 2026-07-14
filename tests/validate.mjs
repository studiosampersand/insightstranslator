import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const required = ['index.html','app.js','styles.css','manifest.webmanifest','service-worker.js','.nojekyll','data/personas.csv'];
for (const file of required) {
  if (!fs.existsSync(path.join(root,file))) throw new Error(`Missing ${file}`);
}
const csv = fs.readFileSync(path.join(root,'data/personas.csv'),'utf8').trim().split(/\r?\n/);
if (csv.length !== 51) throw new Error(`Expected 50 persona rows, found ${csv.length-1}`);
const headers=csv[0].split(',');
const idx=Object.fromEntries(headers.map((h,i)=>[h,i]));
for (const line of csv.slice(1)) {
  const cells=line.split(',');
  const values=['cool_blue','fiery_red','sunshine_yellow','earth_green'].map(k=>Number(cells[idx[k]]));
  if (values.reduce((a,b)=>a+b,0)!==100) throw new Error(`Profile does not total 100: ${line}`);
  if (Math.max(...values)<=50) throw new Error(`Profile has no dominant energy above 50: ${line}`);
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const ref of ['./styles.css?v=0.8.0','./app.js?v=0.8.0','./manifest.webmanifest'])if(!html.includes(ref))throw new Error(`Missing HTML reference ${ref}`);
console.log('Validation passed: files, 50 profiles, dominant percentages and HTML references.');
