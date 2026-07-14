const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const VERSION = '0.9.0';
const ENERGY = {
  cool_blue: { label: 'Cool Blue', css: 'blue' },
  fiery_red: { label: 'Fiery Red', css: 'red' },
  sunshine_yellow: { label: 'Sunshine Yellow', css: 'yellow' },
  earth_green: { label: 'Earth Green', css: 'green' }
};
const ENERGY_KEYS = Object.keys(ENERGY);

const I18N = {
  nl: {
    navRewrite:'Herschrijven',navCoach:'Ask Liz',navProfiles:'Testprofielen',localDemo:'Lokale demo',
    eyebrow:'Jouw boodschap. Professioneel afgestemd.',title:'Van ruwe tekst naar een bruikbaar antwoord.',subtitle:'Liz behoudt de inhoud, verzacht onnodige frictie en past structuur, detail en toon aan de ontvanger aan.',
    pocTitle:'Alpha proof of concept',pocText:'Browser-only, fictieve profielen en een lokale regelengine. Er wordt niets verzonden.',quickDemo:'Probeer:',demoProject:'Project loopt uit',demoDocuments:'Documenten ontbreken',demoCapacity:'Te weinig capaciteit',demoFeedback:'Moeilijke feedback',demoConflict:'Gevoelig conflict',
    inputTitle:'Jouw tekst',inputSub:'Schrijf zoals je het denkt. Liz maakt er een professionele versie van.',clear:'Wissen',roughReply:'Mijn ruwe antwoord',receivedMessage:'Bericht dat ik kreeg',sourcePlaceholder:'Bijvoorbeeld: waarom is het project nog niet af? Dat duurt nu al zo lang. Ik wil graag dat we dit tegen vrijdag afronden.',nothingSent:'Niets wordt automatisch verstuurd',addScreenshot:'Screenshot toevoegen',screenshotSub:'Alleen lokale preview in deze alpha',remove:'Verwijderen',rewriteButton:'Herschrijf met Liz',
    outputTitle:'Professionele versie',outputSub:'Bewerkbaar, controleerbaar en klaar om te kopiëren.',copy:'Kopiëren',emptyTitle:'Liz wacht op je tekst.',emptyText:'De herwerking verschijnt hier naast je originele boodschap.',alternate:'Andere versie',copyReply:'Kopieer antwoord',changedTitle:'Wat Liz verbeterde',adviceTitle:'Verbeter vóór verzending',meetingTitle:'Dit bespreek je mogelijk beter rechtstreeks.',copyMeeting:'Kopieer meetingvoorstel',openTeams:'Open Teams',
    bridgeTitle:'Van wie naar wie?',bridgeSub:'De profielen bepalen niet wat je zegt, maar wel hoe de boodschap het best landt.',sender:'Afzender — jij',recipient:'Ontvanger',adaptation:'Afstemming',commonGround:'Gemeenschappelijke stijl',commonGroundSub:'brug tussen beiden',closerThem:'Dichter bij ontvanger',closerThemSub:'meer aanpassen',closerMe:'Dichter bij mezelf',closerMeSub:'eigen stem behouden',neutral:'Neutraal professioneel',neutralSub:'zonder profielaccent',tone:'Toon',balanced:'In balans',softer:'Zachter',direct:'Directer',intent:'Doel',automatic:'Automatisch herkennen',ask:'Vraag stellen',request:'Actie vragen',feedback:'Feedback geven',deescalate:'De-escaleren',inform:'Informeren',replyLanguage:'Taal antwoord',length:'Lengte',brief:'Kort',balancedLength:'Gebalanceerd',detailed:'Met context',questionFlip:'Zet druk waar mogelijk om in een bruikbare vraag',updateRewrite:'Werk herwerking bij',
    coachEyebrow:'Interne wegwijzer',coachTitle:'Vraag Liz waar je best terechtkunt.',coachText:'Liz koppelt je vraag aan de juiste dienst, eigenaar en volgende actie. Deze demo bewaart geen gespreksgeschiedenis.',coachIt:'Laptop, VPN, account of infrastructuur werkt niet',coachHr:'HR of bedrijfswagen',coachCrm:'CRM of Salesforce',coachDms:'DMS of documentenbeheer',coachCapacity:'Project heeft extra tijd of mensen nodig',coachConflict:'Moeilijke samenwerking of gevoelige vraag',coachQuestion:'Wat wil je vragen?',coachQuestionSub:'Je hoeft het niet netjes te formuleren.',coachPlaceholder:'Bijvoorbeeld: mijn laptop krijgt geen VPN-verbinding en ik moet dringend thuis kunnen werken.',askLiz:'Vraag het aan Liz',
    profilesEyebrow:'Lokale CSV-bron',profilesTitle:'50 fictieve testprofielen',profilesText:'Elk profiel heeft één duidelijk dominante kleurenergie. CSV-import blijft uitsluitend in deze browser.',importCsv:'CSV importeren',downloadCsv:'CSV downloaden',resetCsv:'Demo herstellen',profilesLoaded:'profielen',departments:'diensten',averageDistance:'gemiddelde stijlafstand',searchProfiles:'Zoek naam, rol of dienst…',allDepartments:'Alle diensten',
    needText:'Voer eerst een tekst in.',copied:'Gekopieerd.',csvInvalid:'De CSV is ongeldig.',csvLoaded:'CSV geladen.',csvReset:'Demogegevens hersteld.',coachNeed:'Beschrijf eerst je vraag.',tooLarge:'De screenshot is groter dan 7 MB.',
    distanceClose:'De stijlen liggen dicht bij elkaar.',distanceMedium:'Er zijn enkele duidelijke stijlverschillen.',distanceFar:'De stijlen liggen ver uit elkaar; common ground is nuttig.',styleDistance:'stijlafstand',
    localEngine:'Lokale alpha-engine',characters:'tekens'
  },
  en: {
    navRewrite:'Rewrite',navCoach:'Ask Liz',navProfiles:'Test profiles',localDemo:'Local demo',
    eyebrow:'Your message. Professionally adapted.',title:'From rough wording to a usable reply.',subtitle:'Liz preserves the content, reduces unnecessary friction and adapts structure, detail and tone to the recipient.',
    pocTitle:'Alpha proof of concept',pocText:'Browser-only, fictional profiles and a local rules engine. Nothing is sent.',quickDemo:'Try:',demoProject:'Project delay',demoDocuments:'Missing documents',demoCapacity:'Not enough capacity',demoFeedback:'Difficult feedback',demoConflict:'Sensitive conflict',
    inputTitle:'Your text',inputSub:'Write it as you think it. Liz turns it into a professional version.',clear:'Clear',roughReply:'My rough reply',receivedMessage:'Message I received',sourcePlaceholder:'For example: why is the project still not finished? This is taking far too long. I want us to finish it by Friday.',nothingSent:'Nothing is sent automatically',addScreenshot:'Add screenshot',screenshotSub:'Local preview only in this alpha',remove:'Remove',rewriteButton:'Rewrite with Liz',
    outputTitle:'Professional version',outputSub:'Editable, reviewable and ready to copy.',copy:'Copy',emptyTitle:'Liz is waiting for your text.',emptyText:'The rewrite will appear here next to your original message.',alternate:'Another version',copyReply:'Copy reply',changedTitle:'What Liz improved',adviceTitle:'Improve before sending',meetingTitle:'This may be better discussed directly.',copyMeeting:'Copy meeting suggestion',openTeams:'Open Teams',
    bridgeTitle:'Who is writing to whom?',bridgeSub:'Profiles do not determine what you say, but how the message is most likely to land.',sender:'Sender — you',recipient:'Recipient',adaptation:'Adaptation',commonGround:'Common ground',commonGroundSub:'bridge both styles',closerThem:'Closer to recipient',closerThemSub:'adapt more',closerMe:'Closer to me',closerMeSub:'keep your voice',neutral:'Neutral professional',neutralSub:'without profile emphasis',tone:'Tone',balanced:'Balanced',softer:'Softer',direct:'More direct',intent:'Intent',automatic:'Detect automatically',ask:'Ask a question',request:'Request action',feedback:'Give feedback',deescalate:'De-escalate',inform:'Inform',replyLanguage:'Reply language',length:'Length',brief:'Brief',balancedLength:'Balanced',detailed:'With context',questionFlip:'Turn pressure into a useful question where possible',updateRewrite:'Update rewrite',
    coachEyebrow:'Internal guide',coachTitle:'Ask Liz where to go next.',coachText:'Liz connects your question to the right service, owner and next action. This demo stores no conversation history.',coachIt:'Laptop, VPN, account or infrastructure problem',coachHr:'HR or company car',coachCrm:'CRM or Salesforce',coachDms:'DMS or document management',coachCapacity:'Project needs more time or people',coachConflict:'Difficult collaboration or sensitive question',coachQuestion:'What would you like to ask?',coachQuestionSub:'The wording does not need to be polished.',coachPlaceholder:'For example: my laptop cannot connect to the VPN and I urgently need to work from home.',askLiz:'Ask Liz',
    profilesEyebrow:'Local CSV source',profilesTitle:'50 fictional test profiles',profilesText:'Each profile has one clearly dominant colour energy. CSV imports remain in this browser.',importCsv:'Import CSV',downloadCsv:'Download CSV',resetCsv:'Reset demo',profilesLoaded:'profiles',departments:'departments',averageDistance:'average style distance',searchProfiles:'Search name, role or department…',allDepartments:'All departments',
    needText:'Enter some text first.',copied:'Copied.',csvInvalid:'The CSV is invalid.',csvLoaded:'CSV loaded.',csvReset:'Demo data restored.',coachNeed:'Describe your question first.',tooLarge:'The screenshot is larger than 7 MB.',
    distanceClose:'The styles are relatively close.',distanceMedium:'There are several clear style differences.',distanceFar:'The styles are far apart; common ground is useful.',styleDistance:'style distance',localEngine:'Local alpha engine',characters:'characters'
  },
  fr: {}, de: {}
};

const SCENARIOS = {
  project: {
    nl:'waarom is het project nog niet af? dat duurt nu al zo lang. ik zou graag hebben dat we dit tegen vrijdag af hebben.',
    en:'why is the project still not finished? this is taking far too long. I want us to have it finished by Friday.',
    fr:'pourquoi le projet n’est-il toujours pas terminé ? cela prend beaucoup trop de temps. je voudrais que nous le terminions pour vendredi.',
    de:'warum ist das Projekt noch nicht fertig? das dauert schon viel zu lange. ich möchte, dass wir es bis Freitag abschließen.'
  },
  documents: {
    nl:'ik heb nu al drie keer gevraagd waar de documenten blijven en niemand antwoordt. stuur ze vandaag door want zo kunnen we niet verder.',
    en:'I have asked three times where the documents are and nobody is replying. Send them today because we cannot continue like this.',
    fr:'j’ai déjà demandé trois fois où sont les documents et personne ne répond. envoyez-les aujourd’hui car nous ne pouvons pas continuer ainsi.',
    de:'ich habe bereits dreimal nach den Dokumenten gefragt und niemand antwortet. senden Sie sie heute, denn so können wir nicht weiterarbeiten.'
  },
  capacity: {
    nl:'dit project is compleet overbelast. er komt elke week iets bij en toch moet de deadline dezelfde blijven. dit kan zo niet verder.',
    en:'this project is completely overloaded. something is added every week but the deadline stays the same. this cannot continue.',
    fr:'ce projet est complètement surchargé. quelque chose s’ajoute chaque semaine mais la date limite ne change pas. cela ne peut pas continuer.',
    de:'dieses Projekt ist völlig überlastet. jede Woche kommt etwas hinzu, aber die Frist bleibt gleich. so kann es nicht weitergehen.'
  },
  feedback: {
    nl:'dit is echt niet goed genoeg. je hebt de afspraken niet gevolgd en ik wil dat je dit helemaal opnieuw doet.',
    en:'this really is not good enough. you did not follow the agreements and I want you to redo it completely.',
    fr:'ce n’est vraiment pas suffisant. vous n’avez pas respecté les accords et je veux que vous recommenciez entièrement.',
    de:'das ist wirklich nicht gut genug. Sie haben die Vereinbarungen nicht eingehalten und ich möchte, dass Sie alles neu machen.'
  },
  conflict: {
    nl:'ik ben het beu dat je nooit luistert en altijd alles zelf beslist. zo kan deze samenwerking niet verder.',
    en:'I am tired of you never listening and always deciding everything yourself. this collaboration cannot continue like this.',
    fr:'j’en ai assez que vous n’écoutiez jamais et décidiez toujours seul. cette collaboration ne peut pas continuer ainsi.',
    de:'ich habe es satt, dass Sie nie zuhören und immer alles allein entscheiden. so kann die Zusammenarbeit nicht weitergehen.'
  }
};

const state = {
  lang: localStorage.getItem('benice.uiLanguage') || ((navigator.language || 'nl').slice(0,2)),
  mode: 'rewrite', inputMode: 'draft', adaptation: 'common_ground', variant: 0,
  personas: [], defaultCsv: '', lastResult: null, installPrompt: null
};
if (!['nl','en','fr','de'].includes(state.lang)) state.lang = 'nl';

function t(key) { return I18N[state.lang]?.[key] || I18N.en[key] || I18N.nl[key] || key; }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

async function init() {
  $('#uiLanguage').value = state.lang;
  applyLanguage();
  bindEvents();
  await loadPersonas();
  renderProfileSelectors();
  updateProfiles();
  renderProfiles();
  updateStats();
  registerServiceWorker();
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
}

function bindEvents() {
  $$('.main-nav button').forEach(btn => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));
  $('#uiLanguage').addEventListener('change', e => {
    state.lang = e.target.value; localStorage.setItem('benice.uiLanguage', state.lang); applyLanguage(); updateInputPlaceholder(); updateProfiles(); renderProfiles();
  });
  $$('[data-choice="inputMode"] button').forEach(btn => btn.addEventListener('click', () => {
    state.inputMode = btn.dataset.value; setChoice('inputMode', state.inputMode); updateInputPlaceholder();
  }));
  $$('[data-choice="adaptation"] button').forEach(btn => btn.addEventListener('click', () => {
    state.adaptation = btn.dataset.value; setChoice('adaptation', state.adaptation); updateProfiles(); if (state.lastResult) rewrite(false);
  }));
  $$('.quick-demos button').forEach(btn => btn.addEventListener('click', () => loadScenario(btn.dataset.scenario)));
  $('#sourceText').addEventListener('input', e => { $('#charCount').textContent = `${e.target.value.length} / 8000`; });
  $('#clearBtn').addEventListener('click', clearRewrite);
  $('#rewriteBtn').addEventListener('click', () => rewrite(false));
  $('#updateRewriteBtn').addEventListener('click', () => rewrite(false));
  $('#alternateBtn').addEventListener('click', () => rewrite(true));
  $('#copyBtn').addEventListener('click', () => copyText($('#resultText').value));
  $('#copyTopBtn').addEventListener('click', () => copyText($('#resultText').value));
  $('#copyMeetingBtn').addEventListener('click', () => copyText(state.lastResult?.meetingSuggestion || ''));
  $('#senderSelect').addEventListener('change', updateProfiles);
  $('#recipientSelect').addEventListener('change', updateProfiles);
  ['toneSelect','intentSelect','replyLanguage','lengthSelect','questionFlip'].forEach(id => $('#'+id).addEventListener('change', () => { if (state.lastResult) rewrite(false); }));
  $('#imageInput').addEventListener('change', handleImage);
  $('#removeImageBtn').addEventListener('click', removeImage);
  $$('[data-coach]').forEach(btn => btn.addEventListener('click', () => loadCoachPrompt(btn.dataset.coach)));
  $('#coachBtn').addEventListener('click', runCoach);
  $('#csvInput').addEventListener('change', importCsv);
  $('#downloadCsvBtn').addEventListener('click', downloadCurrentCsv);
  $('#resetCsvBtn').addEventListener('click', resetCsv);
  $('#profileSearch').addEventListener('input', renderProfiles);
  $('#departmentFilter').addEventListener('change', renderProfiles);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); state.installPrompt = e; $('#installBtn').classList.remove('hidden'); });
  $('#installBtn').addEventListener('click', async () => { if (!state.installPrompt) return; state.installPrompt.prompt(); await state.installPrompt.userChoice; state.installPrompt = null; $('#installBtn').classList.add('hidden'); });
}

function switchMode(mode) {
  state.mode = mode;
  $$('.main-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  ['rewrite','coach','profiles'].forEach(name => $('#'+name+'Mode').classList.toggle('hidden', name !== mode));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function setChoice(group, value) { $$(`[data-choice="${group}"] button`).forEach(btn => btn.classList.toggle('active', btn.dataset.value === value)); }
function updateInputPlaceholder() { $('#sourceText').placeholder = state.inputMode === 'draft' ? t('sourcePlaceholder') : (state.lang === 'nl' ? 'Plak hier het bericht waarop je wilt antwoorden…' : 'Paste the message you need to reply to…'); }

async function loadPersonas() {
  const response = await fetch('./data/personas.csv', { cache: 'no-store' });
  state.defaultCsv = await response.text();
  const stored = localStorage.getItem('benice.personasCsv');
  const parsed = parseAndValidateCsv(stored || state.defaultCsv);
  state.personas = parsed.ok ? parsed.rows : parseAndValidateCsv(state.defaultCsv).rows;
}
function parseCsv(text) {
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i=0; i<text.length; i++) {
    const c=text[i], next=text[i+1];
    if (c==='"' && quoted && next==='"') { cell+='"'; i++; }
    else if (c==='"') quoted=!quoted;
    else if (c===',' && !quoted) { row.push(cell); cell=''; }
    else if ((c==='\n' || c==='\r') && !quoted) { if (c==='\r' && next==='\n') i++; row.push(cell); if (row.some(v=>v.trim())) rows.push(row); row=[]; cell=''; }
    else cell+=c;
  }
  row.push(cell); if (row.some(v=>v.trim())) rows.push(row);
  return rows;
}
function parseAndValidateCsv(text) {
  try {
    const raw=parseCsv(text.trim()), headers=raw.shift().map(v=>v.trim());
    const required=['id','name','email','department','role','language',...ENERGY_KEYS];
    if (!required.every(h=>headers.includes(h))) return {ok:false,rows:[]};
    const rows=raw.map(values=>Object.fromEntries(headers.map((h,i)=>[h,(values[i]||'').trim()]))).filter(r=>r.id&&r.name).map(r=>{
      ENERGY_KEYS.forEach(k=>r[k]=Number(r[k])); return r;
    });
    const valid=rows.length>0&&rows.every(r=>ENERGY_KEYS.every(k=>Number.isFinite(r[k])&&r[k]>=0&&r[k]<=100)&&Math.abs(ENERGY_KEYS.reduce((s,k)=>s+r[k],0)-100)<.01);
    return {ok:valid,rows:valid?rows:[]};
  } catch { return {ok:false,rows:[]}; }
}
function rowsToCsv(rows) {
  const headers=['id','name','email','department','role','language',...ENERGY_KEYS];
  const esc=v=>/[",\n]/.test(String(v??''))?`"${String(v).replaceAll('"','""')}"`:String(v??'');
  return [headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n');
}

function renderProfileSelectors() {
  const options=state.personas.map(p=>`<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)} · ${escapeHtml(p.role)}</option>`).join('');
  const senderOld=$('#senderSelect').value, recipientOld=$('#recipientSelect').value;
  $('#senderSelect').innerHTML=options; $('#recipientSelect').innerHTML=options;
  $('#senderSelect').value=state.personas.some(p=>p.id===senderOld)?senderOld:state.personas[0]?.id;
  $('#recipientSelect').value=state.personas.some(p=>p.id===recipientOld)?recipientOld:state.personas[1]?.id;
}
function getPersona(id) { return state.personas.find(p=>p.id===id); }
function dominant(profile) { return ENERGY_KEYS.slice().sort((a,b)=>profile[b]-profile[a]); }
function profileDistance(a,b) { return ENERGY_KEYS.reduce((sum,key)=>sum+Math.abs(a[key]-b[key]),0)/2; }
function blendProfiles(sender,recipient,mode) {
  const weights={common_ground:[.4,.6],recipient:[.2,.8],sender:[.78,.22],neutral:[0,0]};
  const [sw,rw]=weights[mode]||weights.common_ground;
  const neutral={cool_blue:30,fiery_red:25,sunshine_yellow:20,earth_green:25};
  const out={}; ENERGY_KEYS.forEach(k=>out[k]=mode==='neutral'?neutral[k]:(sender[k]*sw+recipient[k]*rw)); return out;
}
function updateProfiles() {
  if (!state.personas.length) return;
  const sender=getPersona($('#senderSelect').value)||state.personas[0], recipient=getPersona($('#recipientSelect').value)||state.personas[1];
  renderProfileCard($('#senderProfile'),sender); renderProfileCard($('#recipientProfile'),recipient);
  const distance=Math.round(profileDistance(sender,recipient));
  const text=distance<18?t('distanceClose'):distance<40?t('distanceMedium'):t('distanceFar');
  $('#distanceSummary').innerHTML=`<strong>${distance}%</strong><small>${escapeHtml(t('styleDistance'))}<br>${escapeHtml(text)}</small>`;
}
function profileBarsHtml(profile) {
  return `<div class="profile-bars">${ENERGY_KEYS.map(key=>`<div class="profile-bar ${ENERGY[key].css}"><span class="profile-bar-label"><i></i>${ENERGY[key].label}</span><span class="profile-bar-track"><span class="profile-bar-fill" style="--value:${Math.max(0,Math.min(100,profile[key]))}"></span></span><b>${Math.round(profile[key])}%</b></div>`).join('')}</div>`;
}
function renderProfileCard(element,persona) {
  const dom=dominant(persona)[0];
  element.innerHTML=`<div class="profile-card-head"><div><strong>${escapeHtml(persona.name)}</strong><small>${escapeHtml(persona.role)}</small></div><span class="dominant-pill ${ENERGY[dom].css}">${ENERGY[dom].label}</span></div>${profileBarsHtml(persona)}`;
}

function loadScenario(key) {
  const scenario=SCENARIOS[key]; if (!scenario) return;
  state.inputMode='draft'; setChoice('inputMode','draft'); updateInputPlaceholder();
  $('#sourceText').value=scenario[state.lang]||scenario.en; $('#sourceText').dispatchEvent(new Event('input')); rewrite(false);
}

function rewrite(alternate=false) {
  const source=$('#sourceText').value.trim(); if (!source) { toast(t('needText')); return; }
  if (alternate) state.variant++; else if (!state.lastResult) state.variant=0;
  const sender=getPersona($('#senderSelect').value),recipient=getPersona($('#recipientSelect').value);
  const target=blendProfiles(sender,recipient,state.adaptation);
  const lang=$('#replyLanguage').value==='auto'?detectLanguage(source):$('#replyLanguage').value;
  const analysis=analyseSource(source,lang);
  const options={tone:$('#toneSelect').value,intent:$('#intentSelect').value,length:$('#lengthSelect').value,questionFlip:$('#questionFlip').checked,inputMode:state.inputMode,variant:state.variant};
  const result=state.inputMode==='incoming'?createReplyToIncoming(source,lang,target,recipient,analysis,options):rewriteDraft(source,lang,target,recipient,analysis,options);
  const meeting=conversationRecommendation(source,lang,analysis);
  const advice=createAdvice(source,result.text,lang,recipient,analysis);
  state.lastResult={...result,lang,analysis,meeting,meetingSuggestion:meeting.suggestion};
  $('#resultText').value=result.text;
  $('#outputEmpty').classList.add('hidden'); $('#outputContent').classList.remove('hidden'); $('#copyTopBtn').classList.remove('hidden');
  renderAppliedStyle(target,recipient,lang);
  renderList($('#changesList'),result.changes.length?result.changes:[lang==='nl'?'De boodschap is duidelijker en professioneler gestructureerd.':'The message is structured more clearly and professionally.']);
  renderAdviceList(advice);
  $('#meetingCard').classList.toggle('hidden',!meeting.show); $('#meetingReason').textContent=meeting.reason;
  $('#resultMeta').textContent=`${t('localEngine')} v${VERSION} · ${result.text.length} ${t('characters')} · ${ENERGY[dominant(target)[0]].label}`;
}
function renderList(element,items){element.innerHTML=items.map(item=>`<li>${escapeHtml(item)}</li>`).join('');}
function renderAdviceList(items){$('#adviceList').innerHTML=(items.length?items:[state.lang==='nl'?'Geen extra toevoegingen nodig voor deze alpha-test.':'No extra additions are needed for this alpha test.']).map(item=>`<li class="${item.css||''}">${escapeHtml(item.text||item)}</li>`).join('');}
function renderAppliedStyle(target,recipient,lang){
  const rank=dominant(target),primary=rank[0],secondary=rank[1];
  const label=lang==='nl'?`Afgestemd op ${recipient.name}`:`Adapted to ${recipient.name}`;
  const line=styleRationale(primary,secondary,lang);
  $('#appliedStyle').innerHTML=`<span>◎</span><div><strong>${escapeHtml(label)}</strong><small>${escapeHtml(line)}</small><div class="mix-chips">${rank.map(k=>`<span class="mix-chip"><i style="background:var(--${ENERGY[k].css})"></i>${ENERGY[k].label} ${Math.round(target[k])}%</span>`).join('')}</div></div>`;
}
function styleRationale(primary,secondary,lang){
  const nl={cool_blue:'feitelijk, precies en onderbouwd',fiery_red:'direct, actiegericht en kort',sunshine_yellow:'persoonlijk, positief en uitnodigend',earth_green:'rustig, betrokken en gericht op draagvlak'};
  const en={cool_blue:'factual, precise and supported',fiery_red:'direct, action-focused and brief',sunshine_yellow:'personal, positive and inclusive',earth_green:'calm, considerate and focused on support'};
  const copy=lang==='nl'?nl:en; return `${ENERGY[primary].label}: ${copy[primary]}. ${ENERGY[secondary].label}: ${copy[secondary]}.`;
}

function detectLanguage(text){
  const lower=` ${text.toLowerCase()} `;
  const scores={nl:countWords(lower,[' het ',' een ',' niet ',' graag ',' kunnen ',' tegen ',' waarom ',' project ',' documenten ',' ik ',' je ']),en:countWords(lower,[' the ',' a ',' not ',' please ',' could ',' why ',' project ',' documents ',' i ',' you ']),fr:countWords(lower,[' le ',' la ',' les ',' pas ',' pourquoi ',' projet ',' documents ',' je ',' vous ',' pour ']),de:countWords(lower,[' der ',' die ',' das ',' nicht ',' warum ',' projekt ',' dokumente ',' ich ',' sie ',' bis '])};
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]||'nl';
}
function countWords(text,words){return words.reduce((sum,w)=>sum+(text.includes(w)?1:0),0);}
function normaliseSource(source){return String(source||'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/([!?]){2,}/g,'$1').replace(/\s*\n+\s*/g,' ').replace(/\s{2,}/g,' ').trim();}
function splitSentences(text){return (String(text||'').match(/[^.!?]+[.!?]?/g)||[]).map(s=>s.trim()).filter(Boolean);}
function capitalise(text){const s=text.trim();return s?s.charAt(0).toUpperCase()+s.slice(1):s;}
function punctuate(text,question=false){const s=text.trim().replace(/[.!?]+$/,'');return s+(question?'?':'.');}
function dedupe(items){const seen=new Set();return items.filter(item=>{const key=item.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g,' ').trim();if(!key||seen.has(key))return false;seen.add(key);return true;});}

function analyseSource(source,lang){
  const text=normaliseSource(source),lower=text.toLowerCase(),sentences=splitSentences(text);
  const topic=/project|scope|capaciteit|capacity|planning|deadline|oplever|delivery|livraison|projekt|frist/.test(lower)?'project':/document|bestand|file|contract|bijlage|attachment/.test(lower)?'documents':/feedback|kwaliteit|quality|fout|error|mistake|correctie/.test(lower)?'feedback':/samenwerking|conflict|luister|respect|collaboration|harass|pest|agress|aggress/.test(lower)?'conflict':'general';
  const sensitive=topic==='conflict'||/ontslag|dismiss|fired|salaris|salary|vertrouwelijk|confidential|burnout|pesten|harass|juridisch|legal/.test(lower);
  const rude=/belachelijk|slaat nergens op|beu|zat|nooit|altijd alles|jouw fout|gefaald|ridiculous|sick of|tired of|never listen|your fault|failed|lächerlich|j’en ai assez/.test(lower);
  const pressure=/vandaag|today|immediately|onmiddellijk|moet|must|eindelijk|finally|nu al|far too long|veel te lang/.test(lower);
  const deadline=extractDeadline(text,lang);
  const hasUrl=/(https?:\/\/|www\.)/i.test(text);
  const complex=sentences.length>=4||text.length>520||/meerdere|verschillende punten|afhankelijk|dependency|complex|scope.*capaciteit|capacity.*timing|plusieurs|mehrere/.test(lower);
  return {text,lower,sentences,topic,sensitive,rude,pressure,deadline,hasUrl,complex};
}
function extractDeadline(text,lang){
  const patterns=[/(?:tegen|voor|uiterlijk)\s+((?:maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag|vandaag|morgen)(?:\s+\d{1,2}\s+\w+)*)/i,/(?:by|before|no later than)\s+((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow)(?:\s+\w+\s+\d{1,2})*)/i,/(?:pour|avant)\s+((?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|aujourd’hui|demain)(?:\s+\d{1,2}\s+\w+)*)/i,/(?:bis|spätestens)\s+((?:montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|heute|morgen)(?:\s+\d{1,2}\.?)*)/i,/(\d{1,2}[\/-]\d{1,2}(?:[\/-]\d{2,4})?)/];
  for(const p of patterns){const m=text.match(p);if(m)return m[1];} return '';
}

function rewriteDraft(source,lang,target,recipient,analysis,options){
  let sentences=analysis.sentences.map(sentence=>rewriteSentence(sentence,lang,analysis)).filter(Boolean);
  const changes=[];
  if(analysis.rude){changes.push(lang==='nl'?'Verwijtende of absolute formuleringen geneutraliseerd.':'Accusatory or absolute wording was neutralised.');}
  if(analysis.pressure&&options.questionFlip){changes.push(lang==='nl'?'Druk waar mogelijk omgezet in een concrete vraag.':'Pressure was turned into a concrete question where possible.');}
  if(sentences.join(' ').toLowerCase()!==analysis.text.toLowerCase())changes.push(lang==='nl'?'Je feiten en gewenste timing behouden, maar professioneler geformuleerd.':'Your facts and requested timing were preserved but phrased more professionally.');

  sentences=ensurePurpose(sentences,lang,analysis,options);
  const styled=applyProfileStyle(sentences,lang,target,recipient,analysis,options);
  sentences=styled.sentences; changes.push(...styled.changes);
  sentences=applyTone(sentences,lang,options.tone);
  sentences=applyLength(sentences,options.length,dominant(target)[0]);
  if(options.variant%3===1)sentences=alternateWording(sentences,lang);
  if(options.variant%3===2)sentences=alternateStructure(sentences,lang);
  return {text:formatOutput(dedupe(sentences),dominant(target)[0],options.length),changes:dedupe(changes)};
}

function rewriteSentence(sentence,lang,analysis){
  const s=sentence.trim();
  if(lang==='nl')return rewriteSentenceNl(s);
  if(lang==='en')return rewriteSentenceEn(s);
  if(lang==='fr')return rewriteSentenceFr(s);
  if(lang==='de')return rewriteSentenceDe(s);
  return punctuate(capitalise(s),/[?]$/.test(s));
}
function rewriteSentenceNl(sentence){
  let s=sentence.trim().replace(/[.!?]+$/,'').replace(/\s{2,}/g,' ');
  const exact=[
    [/^waarom is (.+?) nog niet (?:af|klaar|opgeleverd|gedaan)$/i,'Kun je toelichten wat $1 momenteel nog blokkeert?'],
    [/^waarom zijn (.+?) nog niet (?:af|klaar|opgeleverd|gedaan)$/i,'Kun je toelichten wat de afronding van $1 momenteel blokkeert?'],
    [/^(?:dat|dit) duurt (?:nu al )?(?:zo|veel te) lang$/i,'Dit loopt inmiddels langer dan verwacht.'],
    [/^ik zou graag hebben dat we (.+?) tegen (.+?) (?:af hebben|klaar hebben|afronden)$/i,'Ik wil graag afspreken dat we $1 tegen $2 afronden.'],
    [/^ik zou graag hebben dat (.+)$/i,'Ik wil graag afspreken dat $1.'],
    [/^ik wil dat we (.+)$/i,'Ik wil graag afspreken dat we $1.'],
    [/^ik wil dat (.+)$/i,'Ik wil graag afspreken dat $1.'],
    [/^waarom duurt (.+?) zo lang$/i,'Kun je toelichten wat de vertraging bij $1 veroorzaakt?'],
    [/^wat is hier zo moeilijk aan$/i,'Kun je aangeven wat de huidige blokkering is?'],
    [/^zo kunnen we (?:toch )?niet verder$/i,'Zo kunnen we het werk moeilijk verder plannen.'],
    [/^zo kunnen wij (?:toch )?niet werken$/i,'Zo kunnen we het werk moeilijk verder plannen.'],
    [/^zo kan deze samenwerking niet verder$/i,'De huidige samenwerking is voor mij niet werkbaar.'],
    [/^dit kan zo niet verder$/i,'De huidige aanpak is op deze manier niet houdbaar.'],
    [/^ik ben het (?:beu|zat) dat je nooit luistert en altijd alles zelf beslist$/i,'Ik heb de indruk dat mijn input onvoldoende wordt meegenomen en beslissingen te weinig worden afgestemd.'],
    [/^ik ben het (?:beu|zat) dat (.+)$/i,'Ik merk dat deze situatie tot frustratie leidt en wil $1 constructief bespreken.'],
    [/^dit is (?:echt )?niet goed genoeg$/i,'Dit voldoet nog niet aan de afgesproken verwachtingen.'],
    [/^dit project is (?:compleet|volledig) overbelast$/i,'De huidige projectbelasting ligt hoger dan voorzien.'],
    [/^laat mij (.+?) weten$/i,'Kun je mij $1 laten weten?'],
    [/^stuur (.+?) vandaag door$/i,'Kun je $1 vandaag doorsturen?'],
    [/^stuur (.+)$/i,'Kun je $1 doorsturen?'],
    [/^los (.+?) vandaag op$/i,'Kun je $1 vandaag in orde brengen?'],
    [/^je hebt de afspraken niet gevolgd$/i,'De gemaakte afspraken zijn nog niet volledig verwerkt.'],
    [/^je luistert nooit$/i,'Ik heb de indruk dat mijn eerdere input nog niet voldoende is meegenomen.']
  ];
  for(const [pattern,replacement] of exact){if(pattern.test(s))return s.replace(pattern,replacement);}
  s=s
    .replace(/\bik heb nu al (?:\w+|\d+) keer gevraagd\b/gi,'ik heb dit eerder gevraagd')
    .replace(/\bik heb al (?:\w+|\d+) keer gevraagd\b/gi,'ik heb dit eerder gevraagd')
    .replace(/\bniemand antwoordt\b/gi,'ik heb hierop nog geen antwoord ontvangen')
    .replace(/\bniemand reageert\b/gi,'ik heb hierop nog geen reactie ontvangen')
    .replace(/\bdit is belachelijk\b/gi,'dit is voor mij niet werkbaar')
    .replace(/\bdit slaat nergens op\b/gi,'dit is voor mij nog niet voldoende duidelijk')
    .replace(/\beindelijk\b/gi,'')
    .replace(/\bje moet\b/gi,'kun je')
    .replace(/\bjullie moeten\b/gi,'kunnen jullie')
    .replace(/\baltijd\b/gi,'regelmatig')
    .replace(/\bnooit\b/gi,'nog onvoldoende')
    .replace(/\s{2,}/g,' ').trim();
  if(/^waarom\s+/i.test(s))return punctuate(capitalise(s.replace(/^waarom\s+/i,'Kun je toelichten waarom ')),true);
  if(/^kun je\s+/i.test(s)||/^zou je\s+/i.test(s))return punctuate(capitalise(s),true);
  return punctuate(capitalise(s),false);
}
function rewriteSentenceEn(sentence){
  let s=sentence.trim().replace(/[.!?]+$/,'').replace(/\s{2,}/g,' ');
  const exact=[
    [/^why is (.+?) still not (?:finished|ready|delivered|done)$/i,'Could you explain what is currently blocking $1?'],
    [/^(?:this|that) is taking (?:far too|so) long$/i,'This is taking longer than expected.'],
    [/^i want us to (.+?) by (.+)$/i,'I would like us to agree to $1 by $2.'],
    [/^why is (.+?) taking so long$/i,'Could you explain what is causing the delay with $1?'],
    [/^send (.+?) today$/i,'Could you send $1 today?'],
    [/^this really is not good enough$/i,'This does not yet meet the agreed expectations.'],
    [/^this project is completely overloaded$/i,'The current project workload is higher than planned.'],
    [/^this collaboration cannot continue like this$/i,'The current collaboration is not workable for me.']
  ];
  for(const [p,r] of exact){if(p.test(s))return s.replace(p,r);}
  s=s.replace(/\bi have asked (?:three|four|several|multiple|\d+) times\b/gi,'I have asked about this before').replace(/\bnobody is replying\b/gi,'I have not yet received a response').replace(/\bnobody responds\b/gi,'I have not yet received a response').replace(/\bthis is ridiculous\b/gi,'this is not workable for me').replace(/\bfinally\b/gi,'').replace(/\byou need to\b/gi,'could you').replace(/\bnever\b/gi,'not yet sufficiently').replace(/\s{2,}/g,' ').trim();
  if(/^why\s+/i.test(s))return punctuate(capitalise(s.replace(/^why\s+/i,'Could you explain why ')),true);
  if(/^could you\s+/i.test(s)||/^would you\s+/i.test(s))return punctuate(capitalise(s),true);
  return punctuate(capitalise(s),false);
}
function rewriteSentenceFr(sentence){
  let s=sentence.trim().replace(/[.!?]+$/,'');
  s=s.replace(/pourquoi le projet n[’']est-il toujours pas terminé/i,'Pouvez-vous préciser ce qui bloque encore la finalisation du projet').replace(/cela prend beaucoup trop de temps/i,'Le projet prend plus de temps que prévu').replace(/je voudrais que nous le terminions pour (.+)/i,'Je souhaite que nous convenions de le finaliser pour $1').replace(/personne ne répond/i,'je n’ai pas encore reçu de réponse').replace(/c[’']est ridicule/i,'ce n’est pas réalisable pour moi').replace(/j[’']en ai assez/i,'je constate que cette situation crée de la frustration');
  if(/^pourquoi\s+/i.test(s))return punctuate(capitalise(s.replace(/^pourquoi\s+/i,'Pouvez-vous préciser pourquoi ')),true);
  return punctuate(capitalise(s),/^pouvez-vous/i.test(s));
}
function rewriteSentenceDe(sentence){
  let s=sentence.trim().replace(/[.!?]+$/,'');
  s=s.replace(/warum ist das Projekt noch nicht fertig/i,'Könnten Sie erläutern, was den Projektabschluss derzeit blockiert').replace(/das dauert schon viel zu lange/i,'Das dauert länger als erwartet').replace(/ich möchte, dass wir es bis (.+) abschließen/i,'Ich möchte vereinbaren, dass wir es bis $1 abschließen').replace(/niemand antwortet/i,'ich habe noch keine Antwort erhalten').replace(/das ist lächerlich/i,'das ist für mich nicht praktikabel').replace(/ich habe es satt/i,'ich sehe, dass diese Situation Frustration verursacht');
  if(/^warum\s+/i.test(s))return punctuate(capitalise(s.replace(/^warum\s+/i,'Könnten Sie erläutern, warum ')),true);
  return punctuate(capitalise(s),/^könnten sie/i.test(s));
}

function ensurePurpose(sentences,lang,analysis,options){
  const joined=sentences.join(' '),out=[...sentences];
  const copy={
    nl:{blocker:'Kun je aangeven welke acties nog openstaan en wat de afronding momenteel blokkeert?',deadline:d=>`Kun je bevestigen of ${d} haalbaar is en wat daarvoor nog nodig is?`,next:'Kun je de volgende stap en timing bevestigen?',capacity:'Kunnen we samen bepalen wat we toevoegen, uitstellen of deprioriteren?',feedback:'Kunnen we de concrete aandachtspunten en gewenste aanpassingen samen overlopen?'},
    en:{blocker:'Could you clarify which actions remain open and what is currently blocking completion?',deadline:d=>`Could you confirm whether ${d} is achievable and what is still needed?`,next:'Could you confirm the next step and timing?',capacity:'Could we agree what to add, postpone or deprioritise?',feedback:'Could we review the specific points and required changes together?'},
    fr:{blocker:'Pouvez-vous préciser les actions encore ouvertes et ce qui bloque la finalisation ?',deadline:d=>`Pouvez-vous confirmer si ${d} est réalisable et ce qui reste nécessaire ?`,next:'Pouvez-vous confirmer la prochaine étape et le calendrier ?',capacity:'Pouvons-nous convenir de ce qu’il faut ajouter, reporter ou déprioriser ?',feedback:'Pouvons-nous revoir ensemble les points précis et les adaptations nécessaires ?'},
    de:{blocker:'Könnten Sie erläutern, welche Aufgaben noch offen sind und was den Abschluss blockiert?',deadline:d=>`Könnten Sie bestätigen, ob ${d} realistisch ist und was dafür noch benötigt wird?`,next:'Könnten Sie den nächsten Schritt und den Zeitplan bestätigen?',capacity:'Können wir festlegen, was ergänzt, verschoben oder depriorisiert wird?',feedback:'Können wir die konkreten Punkte und erforderlichen Änderungen gemeinsam prüfen?'}
  }[lang]||{};
  if(analysis.topic==='project'&&/nog niet|still not|pas terminé|noch nicht/.test(analysis.lower)&&!/(blokkeer|blocking|bloque|blockiert)/i.test(joined))out.push(copy.blocker);
  if(analysis.deadline&&!new RegExp(`haalbaar|achievable|réalisable|realistisch`,'i').test(joined))out.push(copy.deadline(analysis.deadline));
  if(options.intent==='request'&&!/[?]$/.test(out[out.length-1]||''))out.push(copy.next);
  if(analysis.topic==='project'&&/overbelast|overloaded|surcharg|überlast/.test(analysis.lower)&&!/(uitstellen|postpone|reporter|verschoben)/i.test(joined))out.push(copy.capacity);
  if(analysis.topic==='feedback'&&!/(aandachtspunten|specific points|points précis|konkreten Punkte)/i.test(joined))out.push(copy.feedback);
  return dedupe(out);
}

function applyProfileStyle(sentences,lang,target,recipient,analysis,options){
  const rank=dominant(target),primary=rank[0],secondary=rank[1],out=[...sentences],changes=[];
  const firstName=String(recipient?.name||'').split(/\s+/)[0]||'';
  const copy={
    nl:{blueProject:'Kun je daarbij de openstaande acties, eigenaars en actuele planning delen?',blueDocs:'Kun je aangeven welke documenten nog ontbreken, wie ze aanlevert en waar de actuele documentatie staat?',blueGeneral:'Kun je de relevante feiten, eigenaar en timing bevestigen?',yellowInput:'Ik hoor graag hoe jij hiernaar kijkt en welke aandachtspunten je nog ziet.',greenProject:'Kunnen we dit afstemmen met de betrokkenen en bepalen welke ondersteuning nodig is om de timing haalbaar te maken?',greenDecision:'Kunnen we bevestigen dat de betrokkenen achter deze aanpak staan en duidelijk maken wat de impact voor het team is?'},
    en:{blueProject:'Could you also share the open actions, owners and current plan?',blueDocs:'Could you specify which documents are missing, who will provide them and where the current documentation is stored?',blueGeneral:'Could you confirm the relevant facts, owner and timing?',yellowInput:'I would value your view and any points of attention you still see.',greenProject:'Could we align this with the people involved and determine what support is needed to make the timing achievable?',greenDecision:'Could we confirm that the people involved support this approach and clarify the impact on the team?'},
    fr:{blueProject:'Pouvez-vous également partager les actions ouvertes, leurs responsables et le planning actuel ?',blueDocs:'Pouvez-vous préciser les documents manquants, leur responsable et l’emplacement de la documentation actuelle ?',blueGeneral:'Pouvez-vous confirmer les faits pertinents, le responsable et le calendrier ?',yellowInput:'J’aimerais connaître votre point de vue et les éventuels points d’attention.',greenProject:'Pouvons-nous aligner ce point avec les personnes concernées et déterminer le soutien nécessaire ?',greenDecision:'Pouvons-nous confirmer le soutien des personnes concernées et clarifier l’impact sur l’équipe ?'},
    de:{blueProject:'Könnten Sie außerdem die offenen Aufgaben, Verantwortlichkeiten und den aktuellen Plan mitteilen?',blueDocs:'Könnten Sie angeben, welche Dokumente fehlen, wer sie liefert und wo die aktuelle Dokumentation liegt?',blueGeneral:'Könnten Sie die relevanten Fakten, Verantwortlichkeit und den Zeitplan bestätigen?',yellowInput:'Ich würde gern Ihre Sicht und mögliche Hinweise dazu hören.',greenProject:'Können wir das mit den Beteiligten abstimmen und klären, welche Unterstützung für den Zeitplan nötig ist?',greenDecision:'Können wir bestätigen, dass die Beteiligten den Ansatz unterstützen, und die Auswirkungen auf das Team klären?'}
  }[lang];

  if(primary==='sunshine_yellow'&&firstName&&!analysis.sensitive){out.unshift(personalOpener(lang,firstName));changes.push(lang==='nl'?'Een korte persoonlijke opener toegevoegd voor Sunshine Yellow.':'A short personal opener was added for Sunshine Yellow.');}
  if(primary==='cool_blue'){
    const detail=analysis.topic==='project'?copy.blueProject:analysis.topic==='documents'?copy.blueDocs:copy.blueGeneral;
    if(!containsSimilar(out,detail))out.push(detail);
    changes.push(lang==='nl'?'De vraag aangescherpt met feiten, eigenaarschap en timing voor Cool Blue.':'The request was sharpened with facts, ownership and timing for Cool Blue.');
  }
  if(primary==='fiery_red'){
    reorderActionFirst(out,analysis);changes.push(lang==='nl'?'Beslissing of gewenste actie vooraan gezet voor Fiery Red.':'The decision or required action was placed first for Fiery Red.');
  }
  if(primary==='sunshine_yellow'&&analysis.topic!=='conflict'&&!containsSimilar(out,copy.yellowInput)){out.push(copy.yellowInput);changes.push(lang==='nl'?'Ruimte voor betrokkenheid en ideeën toegevoegd.':'Space for involvement and ideas was added.');}
  if(primary==='earth_green'){
    const line=analysis.topic==='project'?copy.greenProject:copy.greenDecision;if(!containsSimilar(out,line))out.push(line);changes.push(lang==='nl'?'Draagvlak, betrokkenen en ondersteuning explicieter gemaakt voor Earth Green.':'Support, stakeholders and alignment were made more explicit for Earth Green.');
  }
  if(secondary==='cool_blue'&&target[secondary]>=25&&primary!=='cool_blue'&&options.length!=='brief'){const detail=analysis.topic==='project'?copy.blueProject:copy.blueGeneral;if(!containsSimilar(out,detail))out.push(detail);}
  if(secondary==='fiery_red'&&target[secondary]>=25&&primary!=='fiery_red')reorderActionFirst(out,analysis);
  if(secondary==='sunshine_yellow'&&target[secondary]>=28&&primary!=='sunshine_yellow'&&analysis.topic!=='conflict'&&options.length==='detailed'&&!containsSimilar(out,copy.yellowInput))out.push(copy.yellowInput);
  if(secondary==='earth_green'&&target[secondary]>=28&&primary!=='earth_green'&&analysis.topic==='project'&&options.length==='detailed'&&!containsSimilar(out,copy.greenProject))out.push(copy.greenProject);
  return {sentences:dedupe(out),changes};
}
function containsSimilar(sentences,line){const tokens=line.toLowerCase().split(/\W+/).filter(w=>w.length>4);return sentences.some(s=>tokens.filter(w=>s.toLowerCase().includes(w)).length>=Math.min(3,tokens.length));}
function personalOpener(lang,name){const day=new Date().getDay();if(lang==='nl')return(day===1||day===2)?`Dag ${name}, hoe gaat het? Heb je een fijn weekend gehad?`:`Dag ${name}, hoe gaat het met je?`;if(lang==='en')return(day===1||day===2)?`Hi ${name}, how are you? Did you have a good weekend?`:`Hi ${name}, how are you?`;if(lang==='fr')return`Bonjour ${name}, comment allez-vous ?`;return`Hallo ${name}, wie geht es Ihnen?`;}
function reorderActionFirst(sentences,analysis){const index=sentences.findIndex(s=>/[?]$/.test(s)&&(/bevestig|confirm|confirmer|bestätigen|kun je|could you|pouvez-vous|könnten/i.test(s)));if(index>0){const [item]=sentences.splice(index,1);sentences.unshift(item);}else if(analysis.deadline){const idx=sentences.findIndex(s=>s.toLowerCase().includes(analysis.deadline.toLowerCase()));if(idx>0){const [item]=sentences.splice(idx,1);sentences.unshift(item);}}}
function applyTone(sentences,lang,tone){
  if(tone==='balanced')return sentences;
  if(tone==='softer')return sentences.map(s=>lang==='nl'?s.replace(/^Kun je/i,'Zou je').replace(/^Ik wil graag afspreken/i,'Ik stel voor dat we afspreken'):lang==='en'?s.replace(/^Could you/i,'Would you mind').replace(/^I would like us to agree/i,'I suggest that we agree'):s);
  return sentences.map(s=>s.replace(/^Ik wil graag afspreken dat/i,'Ik stel voor dat').replace(/^I would like us to agree to/i,'Let us agree to').replace(/^Zou je/i,'Kun je').replace(/^Would you mind/i,'Could you'));
}
function applyLength(sentences,length,primary){const limits={brief:primary==='sunshine_yellow'?4:3,balanced:6,detailed:9};return sentences.slice(0,limits[length]||6);}
function alternateWording(sentences,lang){return sentences.map(s=>{if(lang==='nl')return s.replace(/^Kun je toelichten/i,'Kun je verduidelijken').replace(/^Ik wil graag afspreken/i,'Ik stel voor dat we afspreken').replace(/^Kunnen we/i,'Zullen we');if(lang==='en')return s.replace(/^Could you explain/i,'Could you clarify').replace(/^I would like us to agree/i,'I suggest that we agree').replace(/^Could we/i,'Can we');return s;});}
function alternateStructure(sentences){if(sentences.length<3)return sentences;const copy=[...sentences],last=copy.pop();copy.splice(1,0,last);return copy;}
function formatOutput(sentences,primary,length){if(primary==='cool_blue'&&sentences.length>=4&&length!=='brief'){const first=sentences.shift();return `${first}\n\n${sentences.map(s=>`• ${s}`).join('\n')}`;}return sentences.join(' ');}

function createReplyToIncoming(source,lang,target,recipient,analysis,options){
  let text=''; const changes=[];
  if(lang==='nl'){
    const delivery=source.match(/wanneer (?:kan|kun) je (.+?) (?:leveren|bezorgen|doorsturen|opleveren)/i);
    if(delivery){text=`Tegen wanneer heb je ${delivery[1]} nodig? Zodra ik de gewenste timing ken, bevestig ik wat haalbaar is.`;changes.push('De vraag omgekeerd naar de onderliggende behoefte en deadline.');}
    else{text=`Dank voor je bericht. ${rewriteSentenceNl(splitSentences(source)[0]||source)} Kun je aangeven tegen wanneer je dit nodig hebt?`;changes.push('Het ontvangen bericht vertaald naar een korte, professionele reactie.');}
  } else if(lang==='en'){
    const delivery=source.match(/when (?:can|could) you (.+?) (?:deliver|send|provide)/i);
    if(delivery){text=`By when do you need ${delivery[1]}? Once I know the required timing, I can confirm what is achievable.`;changes.push('The request was reframed around the underlying need and deadline.');}
    else{text=`Thanks for your message. Could you clarify the required outcome and by when you need it?`;changes.push('The incoming message was turned into a short professional reply.');}
  } else {text=(lang==='fr'?'Merci pour votre message. Pouvez-vous préciser le résultat attendu et la date souhaitée ?':'Danke für Ihre Nachricht. Könnten Sie das gewünschte Ergebnis und den benötigten Termin erläutern?');changes.push(lang==='fr'?'Le message reçu a été transformé en réponse professionnelle.':'Die eingegangene Nachricht wurde in eine professionelle Antwort umgewandelt.');}
  const styled=applyProfileStyle(splitSentences(text),lang,target,recipient,analysis,options);return{text:formatOutput(applyLength(applyTone(styled.sentences,lang,options.tone),options.length,dominant(target)[0]),dominant(target)[0],options.length),changes:dedupe([...changes,...styled.changes])};
}

function createAdvice(source,output,lang,recipient,analysis){
  const rank=dominant(recipient),items=[];
  const nl=lang==='nl';
  for(const key of rank.slice(0,2)){
    if(recipient[key]<25)continue;
    if(key==='cool_blue'&&!analysis.hasUrl)items.push({css:'advice-blue',text:nl?'Voeg indien beschikbaar de relevante documentatie, cijfers of project-URL toe. Liz verzint nooit zelf een link.':'Add relevant documentation, figures or the project URL if available. Liz never invents a link.'});
    if(key==='fiery_red'&&!analysis.deadline)items.push({css:'advice-red',text:nl?'Maak de gewenste deadline expliciet en benoem wie de volgende actie bezit.':'Make the required deadline explicit and name the owner of the next action.'});
    if(key==='sunshine_yellow'&&!/hoe gaat|how are|comment allez|wie geht/i.test(output))items.push({css:'advice-yellow',text:nl?'Overweeg een korte persoonlijke opener en nodig de ontvanger uit om mee te denken.':'Consider a short personal opener and invite the recipient to contribute.'});
    if(key==='earth_green'&&!/betrokken|draagvlak|support|alignment|équipe|team/i.test(output))items.push({css:'advice-green',text:nl?'Vermeld wie betrokken is, welk draagvlak er is en wat de impact voor het team wordt.':'Mention who is involved, the level of support and the impact on the team.'});
  }
  if(analysis.topic==='documents'&&!analysis.hasUrl)items.unshift({css:'advice-blue',text:nl?'Voeg de documentmap, SharePoint-locatie of concrete bijlage toe vóór verzending.':'Add the document folder, SharePoint location or actual attachment before sending.'});
  return dedupeByText(items);
}
function dedupeByText(items){const seen=new Set();return items.filter(item=>{if(seen.has(item.text))return false;seen.add(item.text);return true;});}
function conversationRecommendation(source,lang,analysis){
  const copy={nl:{conflict:'Dit onderwerp bevat spanning of een persoonlijke interpretatie. Een korte Teams- of fysieke meeting voorkomt waarschijnlijk extra misverstanden.',complex:'Dit onderwerp combineert meerdere afhankelijkheden, verantwoordelijkheden of timings. Even bellen is waarschijnlijk sneller dan een lange berichtenwisseling.',suggestion:'Ik denk dat we dit sneller en duidelijker in een kort gesprek kunnen afstemmen. Heb je tijd voor een korte Teams-call of meeting om de feiten te overlopen en de volgende stap vast te leggen?'},en:{conflict:'This topic contains tension or personal interpretation. A short Teams or in-person meeting is likely to prevent further misunderstanding.',complex:'This topic combines multiple dependencies, responsibilities or timelines. A short call is likely to be faster than a long written exchange.',suggestion:'I think we can align this faster and more clearly in a short conversation. Are you available for a brief Teams call or meeting to review the facts and agree the next step?'},fr:{conflict:'Ce sujet contient de la tension ou une interprétation personnelle. Une courte réunion Teams ou en personne évitera probablement de nouveaux malentendus.',complex:'Ce sujet combine plusieurs dépendances, responsabilités ou délais. Un bref appel sera probablement plus rapide qu’un long échange écrit.',suggestion:'Je pense que nous pouvons clarifier ce point plus rapidement lors d’un bref échange. Êtes-vous disponible pour un appel Teams ou une courte réunion ?'},de:{conflict:'Dieses Thema enthält Spannung oder persönliche Interpretation. Ein kurzes Teams- oder persönliches Gespräch verhindert wahrscheinlich weitere Missverständnisse.',complex:'Dieses Thema verbindet mehrere Abhängigkeiten, Verantwortlichkeiten oder Termine. Ein kurzer Anruf ist wahrscheinlich schneller als ein langer schriftlicher Austausch.',suggestion:'Ich denke, wir können das in einem kurzen Gespräch schneller und klarer abstimmen. Haben Sie Zeit für einen kurzen Teams-Termin?'}}[lang]||{};
  if(analysis.sensitive||analysis.topic==='conflict')return{show:true,reason:copy.conflict,suggestion:copy.suggestion};
  if(analysis.complex||(/overbelast|overloaded|surcharg|überlast/.test(analysis.lower)&&analysis.topic==='project'))return{show:true,reason:copy.complex,suggestion:copy.suggestion};
  return{show:false,reason:'',suggestion:copy.suggestion};
}

function clearRewrite(){state.lastResult=null;state.variant=0;$('#sourceText').value='';$('#sourceText').dispatchEvent(new Event('input'));$('#resultText').value='';$('#outputEmpty').classList.remove('hidden');$('#outputContent').classList.add('hidden');$('#copyTopBtn').classList.add('hidden');removeImage();}
function handleImage(e){const file=e.target.files?.[0];if(!file)return;if(file.size>7*1024*1024){toast(t('tooLarge'));e.target.value='';return;}const reader=new FileReader();reader.onload=()=>{$('#preview').src=reader.result;$('#preview').classList.remove('hidden');$('#removeImageBtn').classList.remove('hidden');};reader.readAsDataURL(file);}
function removeImage(){$('#imageInput').value='';$('#preview').src='';$('#preview').classList.add('hidden');$('#removeImageBtn').classList.add('hidden');}

const COACH_PROMPTS={
  it:{nl:'Mijn laptop kan niet verbinden met de VPN en ik krijg een foutmelding. Waar meld ik dit?',en:'My laptop cannot connect to the VPN and shows an error. Where should I report this?'},
  hr:{nl:'Ik heb een vraag over HR of mijn bedrijfswagen. Met wie neem ik contact op?',en:'I have a question about HR or my company car. Who should I contact?'},
  crm:{nl:'Ik heb een probleem met Salesforce of een CRM-proces. Bij wie moet ik zijn?',en:'I have a problem with Salesforce or a CRM process. Who should I contact?'},
  dms:{nl:'Ik vind een document niet terug in het DMS of de rechten kloppen niet.',en:'I cannot find a document in the DMS or the permissions are wrong.'},
  capacity:{nl:'Mijn project heeft meer tijd of extra werkkracht nodig. Met wie bespreek ik dit?',en:'My project needs more time or additional capacity. Who should I discuss this with?'},
  conflict:{nl:'Een samenwerking loopt moeilijk en ik wil dit constructief bespreken. Wie kan helpen?',en:'A collaboration is becoming difficult and I want to discuss it constructively. Who can help?'}
};
const ROUTES=[
  {id:'it',keywords:/laptop|computer|vpn|printer|netwerk|network|wifi|account|hardware|infrastruct|server|scherm|monitor|telefonie|phone/i,service:'IT · Hardware & infrastructuur',owner:'IT Service Desk via HaloPSA',description:'Maak een ticket met toestel, foutmelding, impact en urgentie.',actions:['halopsa','copy-ticket']},
  {id:'hr',keywords:/\bhr\b|human resources|verlof|leave|contract|loon|salary|welzijn|wellbeing|bedrijfswagen|company car|wagenpark|fleet|tankkaart|lease/i,service:'HR & wagenpark',owner:'Maarten',description:'Maarten is het aanspreekpunt voor HR en het wagenpark. Gevoelige vragen bespreek je best rechtstreeks en privé.',actions:['teams-maarten','mail-maarten']},
  {id:'crm',keywords:/crm|salesforce|contact|lead|opportunity|campaign|marketing cloud|sfmc/i,service:'CRM / Salesforce',owner:'CRM-dienstverantwoordelijke',description:'Voeg de record-ID, omgeving, foutmelding en het tijdstip toe.',actions:['teams','mail','copy-request']},
  {id:'dms',keywords:/dms|document management|documentbeheer|archief|archive|documentrechten|sharepoint document/i,service:'DMS / Documentbeheer',owner:'DMS-dienstverantwoordelijke',description:'Vermeld documentnaam, map, gewenste rechten en eventuele foutmelding.',actions:['teams','mail','copy-request']},
  {id:'capacity',keywords:/capaciteit|capacity|werkkracht|extra mensen|resources|resource|planning|deadline|scope|project.*tijd|overbelast/i,service:'Projectcapaciteit & prioriteiten',owner:'Je manager en projecteigenaar',description:'Bespreek scope, prioriteiten, beschikbare capaciteit en welke deadline werkelijk haalbaar is.',actions:['teams','copy-request']},
  {id:'conflict',keywords:/conflict|samenwerking|collaboration|moeilijk|pesten|harass|vertrouwelijk|confidential|ruzie|respect/i,service:'Vertrouwelijk gesprek / samenwerking',owner:'Je manager, Maarten of de vertrouwenspersoon',description:'Gebruik voor een gevoelige situatie liever een privégesprek dan een lange geschreven discussie.',actions:['teams-maarten','mail-maarten','copy-request']}
];
function loadCoachPrompt(key){const prompt=COACH_PROMPTS[key];$('#coachText').value=prompt?.[state.lang]||prompt?.en||'';runCoach();}
function runCoach(){const text=$('#coachText').value.trim();if(!text){toast(t('coachNeed'));return;}const route=ROUTES.find(r=>r.keywords.test(text))||{id:'general',service:'Interne dienstverantwoordelijke',owner:'Je manager of de relevante diensteigenaar',description:'Verduidelijk het gewenste resultaat, de urgentie en welke dienst het proces beheert.',actions:['teams','mail','copy-request']};const intro=state.lang==='nl'?'Liz stelt deze route voor':'Liz suggests this route';$('#coachResult').innerHTML=`<h3>${escapeHtml(intro)}</h3><div class="route-card"><strong>${escapeHtml(route.service)}</strong><small>${escapeHtml(route.owner)}</small></div><p>${escapeHtml(route.description)}</p>${coachActionsHtml(route,text)}`;$('#coachResult').classList.remove('hidden');$$('[data-copy-route]').forEach(btn=>btn.addEventListener('click',()=>copyText(routeDraft(route,text))));}
function routeDraft(route,text){return `Dienst: ${route.service}\nAanspreekpunt: ${route.owner}\n\nVraag:\n${text}`;}
function coachActionsHtml(route,text){return `<div class="coach-actions">${route.actions.map(action=>{if(action==='halopsa')return`<a class="primary-button" href="https://horizon.carya.tools/auth" target="_blank" rel="noopener">Open HaloPSA</a>`;if(action==='teams'||action==='teams-maarten')return`<a class="secondary-button" href="https://teams.microsoft.com/" target="_blank" rel="noopener">${action==='teams-maarten'?'Open Teams · zoek Maarten':'Open Teams'}</a>`;if(action==='mail'||action==='mail-maarten'){const subject=encodeURIComponent(action==='mail-maarten'?'Vraag voor Maarten':route.service);const body=encodeURIComponent(routeDraft(route,text));return`<a class="secondary-button" href="mailto:?subject=${subject}&body=${body}">${action==='mail-maarten'?'Mail Maarten':'Stel e-mail op'}</a>`;}return`<button class="secondary-button" type="button" data-copy-route>${action==='copy-ticket'?'Kopieer ticketomschrijving':'Kopieer vraagsamenvatting'}</button>`;}).join('')}</div>`;}

function renderProfiles(){if(!state.personas.length)return;populateDepartmentFilter();const q=$('#profileSearch').value.toLowerCase(),dept=$('#departmentFilter').value;const filtered=state.personas.filter(p=>(!dept||p.department===dept)&&(!q||`${p.name} ${p.role} ${p.department} ${p.email}`.toLowerCase().includes(q)));$('#personaGrid').innerHTML=filtered.map(personaCardHtml).join('')||`<div class="card" style="padding:20px">Geen resultaten</div>`;}
function personaCardHtml(p){const dom=dominant(p)[0];return`<article class="persona-card"><div class="persona-head"><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.role)}</small></div><span class="dominant-pill ${ENERGY[dom].css}">${ENERGY[dom].label}</span></div>${profileBarsHtml(p)}<div class="persona-meta"><span>${escapeHtml(p.department)}</span><span>${escapeHtml(String(p.language||'nl').toUpperCase())}</span></div></article>`;}
function populateDepartmentFilter(){const old=$('#departmentFilter').value;$('#departmentFilter').innerHTML=`<option value="">${escapeHtml(t('allDepartments'))}</option>`+[...new Set(state.personas.map(p=>p.department))].sort().map(d=>`<option>${escapeHtml(d)}</option>`).join('');$('#departmentFilter').value=old;}
function updateStats(){$('#profileCount').textContent=state.personas.length;$('#departmentCount').textContent=new Set(state.personas.map(p=>p.department)).size;let total=0,count=0;for(let i=0;i<state.personas.length;i+=4){for(let j=i+1;j<state.personas.length;j+=9){total+=profileDistance(state.personas[i],state.personas[j]);count++;}}$('#averageDistance').textContent=`${Math.round(total/Math.max(count,1))}%`;}
async function importCsv(e){const file=e.target.files?.[0];if(!file)return;const text=await file.text(),parsed=parseAndValidateCsv(text);if(!parsed.ok){toast(t('csvInvalid'));e.target.value='';return;}state.personas=parsed.rows;localStorage.setItem('benice.personasCsv',rowsToCsv(parsed.rows));renderProfileSelectors();updateProfiles();renderProfiles();updateStats();toast(t('csvLoaded'));e.target.value='';}
function downloadCurrentCsv(){const blob=new Blob([rowsToCsv(state.personas)],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='insightstranslator-personas.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);}
function resetCsv(){localStorage.removeItem('benice.personasCsv');const parsed=parseAndValidateCsv(state.defaultCsv);state.personas=parsed.rows;renderProfileSelectors();updateProfiles();renderProfiles();updateStats();toast(t('csvReset'));}

async function copyText(text){if(!text)return;try{await navigator.clipboard.writeText(text);toast(t('copied'));}catch{const el=document.createElement('textarea');el.value=text;document.body.appendChild(el);el.select();document.execCommand('copy');el.remove();toast(t('copied'));}}
let toastTimer;function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2500);}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js?v=0.8.0').catch(()=>{});}

init().catch(error=>{console.error(error);toast('BeNice kon niet starten. Open via GitHub Pages of een lokale webserver.');});

export { rewriteSentenceNl, analyseSource, blendProfiles, profileDistance, parseAndValidateCsv };
