import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const codePath = new URL('../app.js', import.meta.url);
let code = fs.readFileSync(codePath, 'utf8');
code = code.replace(/init\(\)\.catch[\s\S]*?\);\s*$/, 'globalThis.__test={parseAndValidateCsv,profileDistance,blendProfiles,detectTopic,detectLanguage,dominant,composeProfileAwareReply,rewriteDraft,conversationRecommendation,COACH_ROUTES};');
const questionFlip={checked:true};
const context = vm.createContext({console, Date, localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}, document:{querySelector:(q)=>q==='#questionFlip'?questionFlip:null}, globalThis:null});
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
  assert(Math.max(row.cool_blue,row.fiery_red,row.sunshine_yellow,row.earth_green)>50);
}
const a=parsed.rows[0],b=parsed.rows[14];
assert(api.profileDistance(a,b)>=0);
for(const mode of ['common_ground','recipient','sender','neutral'])assert.equal(Object.values(api.blendProfiles(a,b,mode)).reduce((s,n)=>s+n,0),100);
assert.equal(api.detectTopic('Wanneer kun je de documenten opleveren?'),'documents');
assert.equal(api.detectLanguage('Wanneer kunnen we dit vandaag bespreken?'),'nl');

const yellow={name:'Mila Goossens',cool_blue:8,fiery_red:16,sunshine_yellow:66,earth_green:10};
const target={cool_blue:20,fiery_red:20,sunshine_yellow:45,earth_green:15};
const source='Wanneer kun je die documenten nu eindelijk opleveren? We hebben het al verschillende keren gevraagd.';
const rewritten=api.composeProfileAwareReply(target,api.dominant(target),'nl','documents','balanced','balanced','draft','ask',source,yellow);
assert(rewritten.includes('documenten'));
assert(rewritten.includes('eerder'));
assert(!rewritten.toLowerCase().includes('eindelijk'));
assert(/Dag Mila|hoe gaat het/i.test(rewritten));

const factual='Pieter bevestigde dat versie 3 vrijdag klaar zou zijn, maar Legal heeft nog geen toegang tot de contractmap. Kun je dit vandaag oplossen?';
const blue={name:'Amina Vermeer',cool_blue:62,fiery_red:18,sunshine_yellow:8,earth_green:12};
const factualRewrite=api.composeProfileAwareReply({cool_blue:50,fiery_red:25,sunshine_yellow:10,earth_green:15},['cool_blue','fiery_red','earth_green','sunshine_yellow'],'nl','generic','balanced','balanced','draft','request',factual,blue);
assert(factualRewrite.includes('Pieter'));
assert(factualRewrite.includes('versie 3'));
assert(factualRewrite.includes('vrijdag'));
assert(factualRewrite.includes('Legal'));
assert(factualRewrite.includes('contractmap'));

assert.equal(api.conversationRecommendation('Ik ben het beu dat ik de schuld krijg.','conflict','nl').show,true);


const actualDraft='Ik heb nu al drie keer gevraagd wanneer die documenten klaar zijn en niemand antwoordt. Zo kunnen wij toch niet werken?';
const actualRewrite=api.composeProfileAwareReply(blue,api.dominant(blue),'nl','documents','balanced','balanced','draft','ask',actualDraft,blue);
assert(actualRewrite.includes('documenten'));
assert(actualRewrite.includes('nog geen antwoord ontvangen'));
assert(actualRewrite.includes('timing'));
assert(!actualRewrite.toLowerCase().includes('eindelijk'));
assert(!actualRewrite.toLowerCase().includes('zo kunnen wij toch niet werken'));

const alternateRewrite=api.composeProfileAwareReply(blue,api.dominant(blue),'nl','documents','balanced','balanced','draft','ask',actualDraft,blue,1);
assert.notEqual(alternateRewrite,actualRewrite);

const itRoute=api.COACH_ROUTES.find(r=>r.id==='it-hardware');
assert(itRoute.keywords.test('Mijn laptop kan niet verbinden met VPN en toont een foutmelding.'));
assert(itRoute.actions.includes('halopsa'));
const hrRoute=api.COACH_ROUTES.find(r=>r.id==='hr');
assert(hrRoute.keywords.test('Ik heb een vraag over verlof en mijn contract.'));
const fleetRoute=api.COACH_ROUTES.find(r=>r.id==='fleet');
assert(fleetRoute.keywords.test('Mijn bedrijfswagen heeft schade.'));

console.log('Validation passed: dominant profiles, context-preserving rewrites, alternate versions and service routing.');
