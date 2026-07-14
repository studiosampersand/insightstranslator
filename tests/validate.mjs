import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const codePath = new URL('../app.js', import.meta.url);
let code = fs.readFileSync(codePath, 'utf8');
code = code.replace(/init\(\)\.catch[\s\S]*?\);\s*$/, 'globalThis.__test={parseAndValidateCsv,profileDistance,blendProfiles,detectTopic,detectLanguage,TEMPLATES,PROFILE_LINES,RESULT_COPY,dominant,composeProfileAwareReply};');
const context = vm.createContext({console, localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}, document:{querySelector:(q)=>q==='#questionFlip'?{checked:true}:null}, globalThis:null});
context.globalThis=context;
new vm.Script(code,{filename:'app.js'}).runInContext(context);
const api=context.__test;
assert(api,'test API was not exposed');

const csv=fs.readFileSync(new URL('../data/personas.csv', import.meta.url),'utf8');
const parsed=api.parseAndValidateCsv(csv);
assert.equal(parsed.ok,true);
assert.equal(parsed.rows.length,50);
for(const row of parsed.rows){
  assert.equal(row.cool_blue+row.fiery_red+row.sunshine_yellow+row.earth_green,100);
}
const a=parsed.rows[0],b=parsed.rows[1];
const d=api.profileDistance(a,b);
assert(d>=0&&d<=100);
for(const mode of ['common_ground','recipient','sender','neutral']){
  const mix=api.blendProfiles(a,b,mode);
  assert.equal(Object.values(mix).reduce((s,n)=>s+n,0),100);
}
assert.equal(api.detectTopic('When can you deliver the documents?'),'documents');
assert.equal(api.detectTopic('The project is overloaded and needs capacity.'),'capacity');
assert.equal(api.detectLanguage('Wanneer kunnen we dit vandaag bespreken?'),'nl');
assert(api.TEMPLATES.en.documents.length>=3);
assert(api.PROFILE_LINES.en.cool_blue.documents.includes('format'));
assert(api.PROFILE_LINES.en.fiery_red.deadline.includes('deadline'));
assert(api.PROFILE_LINES.en.sunshine_yellow.capacity.includes('ideas'));
assert(api.PROFILE_LINES.en.earth_green.capacity.includes('team'));
assert(api.RESULT_COPY.en.blueUrl.includes('URL'));
assert.equal(api.dominant({cool_blue:50,fiery_red:20,sunshine_yellow:10,earth_green:20})[0],'cool_blue');

const blueRed={cool_blue:45,fiery_red:35,sunshine_yellow:10,earth_green:10};
const blueRedReply=api.composeProfileAwareReply(blueRed,api.dominant(blueRed),'en','documents','balanced','balanced','draft','ask','When can you deliver the documents?');
assert(blueRedReply.includes('format'));
assert(blueRedReply.includes('scope today'));
const yellowGreen={cool_blue:10,fiery_red:10,sunshine_yellow:45,earth_green:35};
const yellowGreenReply=api.composeProfileAwareReply(yellowGreen,api.dominant(yellowGreen),'en','capacity','balanced','balanced','draft','request','The project is overloaded.');
assert(yellowGreenReply.includes('ideas'));
assert(yellowGreenReply.includes('team'));

console.log('Validation passed: 50 profiles, percentage totals, blending, topic detection and multilingual templates.');
