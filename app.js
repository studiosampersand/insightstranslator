const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

const ENERGY = {
  cool_blue: {label:'Cool Blue', css:'blue', short:{en:'precise',nl:'precies',fr:'précis',de:'präzise'}},
  fiery_red: {label:'Fiery Red', css:'red', short:{en:'decisive',nl:'daadkrachtig',fr:'décisif',de:'entschlossen'}},
  sunshine_yellow: {label:'Sunshine Yellow', css:'yellow', short:{en:'sociable',nl:'sociaal',fr:'sociable',de:'kontaktfreudig'}},
  earth_green: {label:'Earth Green', css:'green', short:{en:'considerate',nl:'consideraat',fr:'attentionné',de:'rücksichtsvoll'}}
};
const KEYS = Object.keys(ENERGY);


const RESULT_COPY = {
  en:{title:'Improve before sending',intro:'Practical additions based on the strongest colour energies in this message mix.',dominant:'Dominant',secondary:'Secondary',blueNeed:'information, evidence and clear structure',redNeed:'a decision, owner and deadline',yellowNeed:'involvement, energy and room for input',greenNeed:'alignment, support and impact on people',blueUrl:'Add the relevant documentation, source or project URL. Liv will never invent one.',blueUrlPresent:'Keep the documentation or URL visible and explain what it supports.',blueFacts:'Include exact facts, scope, format, owner and timing.',red:'Lead with the decision or requested action. Name the owner and deadline.',yellow:'Invite their input and show where they can influence the outcome.',green:'Mention who supports the decision and how the team impact will be handled.'},
  nl:{title:'Verbeter vóór verzending',intro:'Praktische aanvullingen op basis van de sterkste kleurenergieën in deze berichtmix.',dominant:'Dominant',secondary:'Secundair',blueNeed:'informatie, bewijs en duidelijke structuur',redNeed:'een beslissing, eigenaar en deadline',yellowNeed:'betrokkenheid, energie en ruimte voor inbreng',greenNeed:'afstemming, steun en impact op mensen',blueUrl:'Voeg de relevante documentatie, bron of project-URL toe. Liv verzint nooit zelf een link.',blueUrlPresent:'Hou de documentatie of URL zichtbaar en leg uit wat die onderbouwt.',blueFacts:'Vermeld exacte feiten, scope, formaat, eigenaar en timing.',red:'Start met de beslissing of gevraagde actie. Benoem eigenaar en deadline.',yellow:'Vraag om hun inbreng en toon waar ze het resultaat kunnen beïnvloeden.',green:'Vermeld wie achter de beslissing staat en hoe de impact op het team wordt opgevangen.'},
  fr:{title:'Améliorer avant l’envoi',intro:'Ajouts pratiques basés sur les énergies de couleur les plus fortes dans ce mélange.',dominant:'Dominant',secondary:'Secondaire',blueNeed:'des informations, des preuves et une structure claire',redNeed:'une décision, un responsable et une échéance',yellowNeed:'de l’implication, de l’énergie et une place pour les idées',greenNeed:'de l’alignement, du soutien et l’impact humain',blueUrl:'Ajoutez la documentation, la source ou l’URL du projet. Liv n’inventera jamais de lien.',blueUrlPresent:'Gardez la documentation ou l’URL visible et précisez ce qu’elle étaye.',blueFacts:'Incluez les faits exacts, le périmètre, le format, le responsable et le calendrier.',red:'Commencez par la décision ou l’action attendue. Nommez le responsable et l’échéance.',yellow:'Invitez la personne à contribuer et montrez où elle peut influencer le résultat.',green:'Précisez qui soutient la décision et comment l’impact sur l’équipe sera géré.'},
  de:{title:'Vor dem Senden verbessern',intro:'Praktische Ergänzungen auf Basis der stärksten Farbenergien in dieser Nachrichtenmischung.',dominant:'Dominant',secondary:'Sekundär',blueNeed:'Informationen, Belege und klare Struktur',redNeed:'eine Entscheidung, Verantwortlichkeit und Frist',yellowNeed:'Einbindung, Energie und Raum für Ideen',greenNeed:'Abstimmung, Unterstützung und Auswirkungen auf Menschen',blueUrl:'Fügen Sie die relevante Dokumentation, Quelle oder Projekt-URL hinzu. Liv erfindet niemals einen Link.',blueUrlPresent:'Lassen Sie Dokumentation oder URL sichtbar und erklären Sie, was sie belegt.',blueFacts:'Nennen Sie genaue Fakten, Umfang, Format, Verantwortlichkeit und Zeitplan.',red:'Beginnen Sie mit der Entscheidung oder erwarteten Aktion. Nennen Sie Verantwortlichkeit und Frist.',yellow:'Bitten Sie um Input und zeigen Sie, wo die Person das Ergebnis beeinflussen kann.',green:'Nennen Sie, wer die Entscheidung unterstützt und wie die Auswirkungen auf das Team berücksichtigt werden.'}
};

const PROFILE_LINES = {
  en:{
    cool_blue:{documents:'Could you confirm exactly which documents are required, the format and the deadline?',deadline:'Could you share the revised date, the current blocker and the updated plan?',capacity:'Could we review the agreed scope, available capacity and delivery dates using the current project data?',feedback:'I’ll set out the specific examples and the agreed quality criteria.',conflict:'Let’s separate the facts, responsibilities and decisions that still need clarification.',generic:'Could you confirm the facts, expected outcome and timing?'},
    fiery_red:{documents:'Please send the scope today so I can confirm the delivery date.',deadline:'Please confirm the owner and revised deadline today.',capacity:'We need to decide what to add, postpone or deprioritise.',feedback:'Please agree the required corrections and deadline.',conflict:'Let’s agree the owner and next step in a short conversation.',generic:'Please confirm the decision, owner and deadline.'},
    sunshine_yellow:{documents:'I’d like to make sure we get this right together—what would be most useful for you?',deadline:'Let’s look at the options together and agree a workable next step.',capacity:'I’d value your ideas on how we can organise the work more effectively.',feedback:'I’d like to review the examples together and hear your perspective.',conflict:'I’d like us to reset the collaboration and agree a better way forward together.',generic:'I’d value your input before we finalise the next step.'},
    earth_green:{documents:'Once everyone agrees on the scope, we can plan the delivery without surprises.',deadline:'The team and project leads should be aligned on the revised plan before we proceed.',capacity:'The team needs a sustainable plan that has the support of the project leads.',feedback:'I want to make sure the expectations are clear and that the right support is available.',conflict:'I want to make sure everyone feels heard and that we agree a safe, workable way forward.',generic:'Let’s make sure the people affected understand and support the next step.'}
  },
  nl:{
    cool_blue:{documents:'Kun je exact bevestigen welke documenten nodig zijn, in welk formaat en tegen welke deadline?',deadline:'Kun je de nieuwe datum, de huidige blokkering en de aangepaste planning delen?',capacity:'Kunnen we de afgesproken scope, beschikbare capaciteit en leverdata bekijken op basis van de actuele projectgegevens?',feedback:'Ik zet de concrete voorbeelden en de afgesproken kwaliteitscriteria op een rij.',conflict:'Laten we de feiten, verantwoordelijkheden en openstaande beslissingen van elkaar scheiden.',generic:'Kun je de feiten, het verwachte resultaat en de timing bevestigen?'},
    fiery_red:{documents:'Bezorg vandaag de scope, dan bevestig ik de leverdatum.',deadline:'Bevestig vandaag de eigenaar en de nieuwe deadline.',capacity:'We moeten beslissen wat we toevoegen, uitstellen of deprioriteren.',feedback:'Spreek de nodige correcties en deadline af.',conflict:'Laten we in een kort gesprek de eigenaar en volgende stap vastleggen.',generic:'Bevestig de beslissing, eigenaar en deadline.'},
    sunshine_yellow:{documents:'Ik wil dit graag samen goed krijgen—wat zou voor jou het nuttigst zijn?',deadline:'Laten we samen de opties bekijken en een haalbare volgende stap kiezen.',capacity:'Ik hoor graag jouw ideeën over hoe we het werk slimmer kunnen organiseren.',feedback:'Ik wil de voorbeelden graag samen bekijken en jouw perspectief horen.',conflict:'Ik wil de samenwerking graag herstarten en samen een betere aanpak afspreken.',generic:'Ik hoor graag jouw inbreng voor we de volgende stap definitief maken.'},
    earth_green:{documents:'Zodra iedereen akkoord is over de scope, kunnen we de levering zonder verrassingen plannen.',deadline:'Het team en de projectverantwoordelijken moeten achter de aangepaste planning staan voor we verdergaan.',capacity:'Het team heeft een haalbaar plan nodig dat door de projectverantwoordelijken wordt gedragen.',feedback:'Ik wil zeker zijn dat de verwachtingen duidelijk zijn en dat de nodige ondersteuning beschikbaar is.',conflict:'Ik wil dat iedereen gehoord wordt en dat we samen een veilige, werkbare aanpak vinden.',generic:'Laten we zorgen dat de betrokken mensen de volgende stap begrijpen en ondersteunen.'}
  },
  fr:{
    cool_blue:{documents:'Pouvez-vous confirmer précisément les documents requis, le format et l’échéance ?',deadline:'Pouvez-vous partager la nouvelle date, le blocage actuel et le planning mis à jour ?',capacity:'Pouvons-nous examiner le périmètre convenu, la capacité disponible et les dates de livraison à partir des données actuelles du projet ?',feedback:'Je vais lister les exemples précis et les critères de qualité convenus.',conflict:'Séparons les faits, les responsabilités et les décisions qui restent à clarifier.',generic:'Pouvez-vous confirmer les faits, le résultat attendu et le calendrier ?'},
    fiery_red:{documents:'Envoyez le périmètre aujourd’hui afin que je confirme la date de livraison.',deadline:'Confirmez aujourd’hui le responsable et la nouvelle échéance.',capacity:'Nous devons décider ce qu’il faut ajouter, reporter ou déprioriser.',feedback:'Convenons des corrections nécessaires et de l’échéance.',conflict:'Convenons du responsable et de la prochaine étape lors d’un bref échange.',generic:'Confirmez la décision, le responsable et l’échéance.'},
    sunshine_yellow:{documents:'J’aimerais que nous réussissions cela ensemble—qu’est-ce qui vous serait le plus utile ?',deadline:'Examinons les options ensemble et choisissons une prochaine étape réalisable.',capacity:'J’aimerais connaître vos idées pour organiser le travail plus efficacement.',feedback:'J’aimerais revoir les exemples ensemble et connaître votre point de vue.',conflict:'J’aimerais relancer la collaboration et convenir ensemble d’une meilleure approche.',generic:'J’aimerais avoir votre avis avant de finaliser la prochaine étape.'},
    earth_green:{documents:'Dès que tout le monde est aligné sur le périmètre, nous pourrons planifier la livraison sans surprise.',deadline:'L’équipe et les responsables du projet doivent être alignés sur le planning révisé avant d’avancer.',capacity:'L’équipe a besoin d’un plan durable soutenu par les responsables du projet.',feedback:'Je veux m’assurer que les attentes sont claires et que le soutien nécessaire est disponible.',conflict:'Je veux m’assurer que chacun est entendu et que nous trouvons une approche sûre et praticable.',generic:'Assurons-nous que les personnes concernées comprennent et soutiennent la prochaine étape.'}
  },
  de:{
    cool_blue:{documents:'Können Sie genau bestätigen, welche Dokumente in welchem Format und bis wann benötigt werden?',deadline:'Können Sie das neue Datum, die aktuelle Blockade und den aktualisierten Plan mitteilen?',capacity:'Können wir den vereinbarten Umfang, die verfügbare Kapazität und die Liefertermine anhand der aktuellen Projektdaten prüfen?',feedback:'Ich liste die konkreten Beispiele und die vereinbarten Qualitätskriterien auf.',conflict:'Trennen wir die Fakten, Verantwortlichkeiten und noch offenen Entscheidungen.',generic:'Können Sie die Fakten, das erwartete Ergebnis und den Zeitplan bestätigen?'},
    fiery_red:{documents:'Senden Sie den Umfang heute, dann bestätige ich den Liefertermin.',deadline:'Bestätigen Sie heute die Verantwortlichkeit und die neue Frist.',capacity:'Wir müssen entscheiden, was ergänzt, verschoben oder depriorisiert wird.',feedback:'Vereinbaren wir die erforderlichen Korrekturen und die Frist.',conflict:'Vereinbaren wir in einem kurzen Gespräch die Verantwortlichkeit und den nächsten Schritt.',generic:'Bestätigen Sie die Entscheidung, Verantwortlichkeit und Frist.'},
    sunshine_yellow:{documents:'Ich möchte, dass wir das gemeinsam gut lösen—was wäre für Sie am hilfreichsten?',deadline:'Lassen Sie uns die Optionen gemeinsam prüfen und einen machbaren nächsten Schritt vereinbaren.',capacity:'Ich würde gerne Ihre Ideen hören, wie wir die Arbeit besser organisieren können.',feedback:'Ich möchte die Beispiele gemeinsam prüfen und Ihre Sichtweise hören.',conflict:'Ich möchte die Zusammenarbeit neu ausrichten und gemeinsam einen besseren Weg vereinbaren.',generic:'Ich würde gerne Ihren Input hören, bevor wir den nächsten Schritt festlegen.'},
    earth_green:{documents:'Sobald alle dem Umfang zustimmen, können wir die Lieferung ohne Überraschungen planen.',deadline:'Das Team und die Projektverantwortlichen sollten den überarbeiteten Plan unterstützen, bevor wir fortfahren.',capacity:'Das Team braucht einen tragfähigen Plan, der von den Projektverantwortlichen unterstützt wird.',feedback:'Ich möchte sicherstellen, dass die Erwartungen klar sind und die nötige Unterstützung vorhanden ist.',conflict:'Ich möchte sicherstellen, dass alle gehört werden und wir einen sicheren, praktikablen Weg finden.',generic:'Stellen wir sicher, dass die betroffenen Personen den nächsten Schritt verstehen und unterstützen.'}
  }
};

const DETAIL_CLOSE = {
  en:'We can then confirm the owner, timing and next checkpoint.',
  nl:'Daarna kunnen we eigenaar, timing en het volgende controlemoment bevestigen.',
  fr:'Nous pourrons ensuite confirmer le responsable, le calendrier et le prochain point de suivi.',
  de:'Danach können wir Verantwortlichkeit, Zeitplan und den nächsten Kontrollpunkt bestätigen.'
};

const I18N = {
  en:{eyebrow:'Personal communication. Professional common ground.',heroTitle:'Write in your voice.<br><span>Reach the other person better.</span>',heroText:'Liv adapts structure, tone and detail using two local colour-energy profiles. No message or profile is sent to a backend.',pill1:'50 fictional test personas',pill2:'CSV import',pill3:'Works offline',blueShort:'precise',redShort:'decisive',greenShort:'considerate',yellowShort:'sociable',pocTitle:'Management demo build',pocText:'This GitHub Pages proof of concept rewrites the text you enter, preserves concrete details and adapts the result to fictional colour-energy profiles. It is a local demonstration engine—not AI—and sends nothing to a backend.',tabRewrite:'Write a reply',tabRewriteSub:'Profile-aware rewrite',tabCoach:'Ask Liv',tabCoachSub:'Internal routing demo',tabProfiles:'Test personas',tabProfilesSub:'CSV profiles and import',demoLabel:'Quick demo:',demoDocuments:'Documents',demoDeadline:'Missed deadline',demoCapacity:'Project capacity',demoFeedback:'Difficult feedback',demoConflict:'Sensitive conflict',sourceTitle:'What do you want to rewrite?',sourceSub:'Use a rough draft or an incoming message.',clear:'Clear',roughDraft:'My rough reply',incomingMessage:'Message I received',sourcePlaceholder:'Type the reply you would like BeNice to make clearer and more professional…',notSent:'Nothing is sent automatically',upload:'Add screenshot',uploadSub:'Preview only in this local proof of concept',remove:'Remove',screenshotNote:'The screenshot stays on this device. Text recognition will be connected to the internal agent later.',settingsTitle:'Choose both people',settingsSub:'The app finds a professional bridge between their styles.',sender:'Sender—you',recipient:'Recipient',adaptation:'Adaptation',commonGround:'Common ground',commonGroundSub:'bridge both styles',closerThem:'Closer to them',closerThemSub:'recipient weighs more',closerMe:'Closer to me',closerMeSub:'your voice stays dominant',neutral:'Neutral',neutralSub:'professional baseline',tone:'Tone',balanced:'Balanced',softer:'Softer',direct:'More direct',intent:'Intent',automatic:'Detect automatically',ask:'Ask a question',request:'Request action',feedback:'Give feedback',deescalate:'De-escalate',inform:'Inform',replyLanguage:'Reply language',length:'Length',brief:'Brief',balancedLength:'Balanced',withContext:'With context',questionFlip:'Turn pressure into a useful question where possible',rewriteButton:'Let Liv rewrite',resultTitle:'Professional rewrite',resultSub:'Your original meaning and concrete details, rewritten for the selected communication style.',copy:'Copy',emptyTitle:'Liv is ready.',emptySub:'Choose a quick demo or enter your own text.',meetingTitle:'This may be better discussed directly.',copyMeeting:'Copy meeting suggestion',otherwise:'If not, this is the written reply:',anotherVersion:'Another version',copyReply:'Copy reply',coachEyebrow:'Confidential and practical',coachTitle:'Ask Liv where to go next.',coachText:'This local demo routes a question to a likely internal contact. It does not diagnose, monitor or report people.',coachPromptIt:'My laptop, account or infrastructure is not working.',coachPromptHr:'I have an HR or company-car question.',coachPrompt1:'My project needs more time or capacity.',coachPrompt2:'A collaboration is becoming difficult.',coachPrompt3:'I have a privacy or security question.',coachPrompt4:'I would like to talk to someone confidentially.',boundaryTitle:'Prototype boundary',boundaryText:'No chat history, no HR notification and no sentiment score. A production directory would be managed internally.',coachQuestion:'What would you like to ask?',coachQuestionSub:'The wording does not need to be perfect.',coachPlaceholder:'Describe the question or situation…',askLiv:'Ask Liv',profilesEyebrow:'Local profile source',profilesTitle:'50 fictional personas for testing',profilesText:'Import your own CSV later; it is stored only in this browser. Use fictional or approved data for demonstrations.',importCsv:'Import CSV',downloadCsv:'Download current CSV',resetDemo:'Reset demo data',profilesLoaded:'profiles loaded',departments:'departments',averageDistance:'average style distance',searchProfiles:'Search name, role or department…',allDepartments:'All departments',methodTitle:'Method note',methodText:'The four colour energies are used here as communication guidance, not as labels or a new assessment. Confirm internal licensing before using proprietary terminology or materials in production.',distanceClose:'The two styles are relatively close.',distanceModerate:'The styles differ in a few important areas.',distanceFar:'The styles are far apart; common ground is recommended.',styleApplied:'Common-ground style applied',profileMix:'Target mix',needText:'Enter a message first.',copied:'Copied.',csvLoaded:'CSV imported locally.',csvInvalid:'The CSV is invalid. Check the required columns and percentage totals.',demoReset:'The 50 fictional demo profiles were restored.',screenshotLarge:'The image is larger than 7 MB.',coachNeed:'Enter a question first.',localEngine:'Context-preserving browser rewrite engine',meetingReason:'The topic appears sensitive or likely to create misunderstanding in writing.',meetingSuggestion:'I think this would be clearer in a short conversation. Would you be available for a brief call so we can understand the situation and agree the next step?',noResults:'No profiles match the filter.'},
  nl:{eyebrow:'Persoonlijke communicatie. Professionele common ground.',heroTitle:'Schrijf in jouw stem.<br><span>Bereik de ander beter.</span>',heroText:'Liv past structuur, toon en detail aan met twee lokale kleurenergieprofielen. Geen bericht of profiel wordt naar een backend verstuurd.',pill1:'50 fictieve testpersona’s',pill2:'CSV importeren',pill3:'Werkt offline',blueShort:'precies',redShort:'daadkrachtig',greenShort:'consideraat',yellowShort:'sociaal',pocTitle:'Managementdemoversie',pocText:'Deze GitHub Pages-proof-of-concept herwerkt jouw ingevoerde tekst, bewaart concrete details en stemt het resultaat af op fictieve kleurenergieprofielen. Het is een lokale demo-engine—geen AI—en verstuurt niets naar een backend.',tabRewrite:'Antwoord schrijven',tabRewriteSub:'Herschrijven met profielen',tabCoach:'Vraag het aan Liv',tabCoachSub:'Interne route-demo',tabProfiles:'Testpersona’s',tabProfilesSub:'CSV-profielen en import',demoLabel:'Snelle demo:',demoDocuments:'Documenten',demoDeadline:'Gemiste deadline',demoCapacity:'Projectcapaciteit',demoFeedback:'Moeilijke feedback',demoConflict:'Gevoelig conflict',sourceTitle:'Wat wil je herschrijven?',sourceSub:'Gebruik een ruwe reactie of een ontvangen bericht.',clear:'Wissen',roughDraft:'Mijn ruwe reactie',incomingMessage:'Ontvangen bericht',sourcePlaceholder:'Typ de reactie die BeNice duidelijker en professioneler moet maken…',notSent:'Er wordt niets automatisch verstuurd',upload:'Screenshot toevoegen',uploadSub:'Alleen voorbeeldweergave in deze lokale proof of concept',remove:'Verwijder',screenshotNote:'De screenshot blijft op dit toestel. Tekstherkenning wordt later aan de interne agent gekoppeld.',settingsTitle:'Kies beide personen',settingsSub:'De app zoekt een professionele brug tussen hun stijlen.',sender:'Afzender—jij',recipient:'Ontvanger',adaptation:'Afstemming',commonGround:'Common ground',commonGroundSub:'brug tussen beide stijlen',closerThem:'Meer naar de ander',closerThemSub:'ontvanger weegt zwaarder',closerMe:'Dichter bij mij',closerMeSub:'jouw stem blijft dominant',neutral:'Neutraal',neutralSub:'professionele basis',tone:'Toon',balanced:'In balans',softer:'Zachter',direct:'Directer',intent:'Doel',automatic:'Automatisch herkennen',ask:'Vraag stellen',request:'Actie vragen',feedback:'Feedback geven',deescalate:'De-escaleren',inform:'Informeren',replyLanguage:'Taal antwoord',length:'Lengte',brief:'Kort',balancedLength:'Gebalanceerd',withContext:'Met context',questionFlip:'Zet druk waar mogelijk om in een bruikbare vraag',rewriteButton:'Laat Liv herschrijven',resultTitle:'Voorgesteld antwoord',resultSub:'Controleer en bewerk vóór gebruik.',copy:'Kopiëren',emptyTitle:'Liv staat klaar.',emptySub:'Kies een snelle demo of voer je eigen tekst in.',meetingTitle:'Dit bespreek je mogelijk beter rechtstreeks.',copyMeeting:'Kopieer meetingvoorstel',otherwise:'Zo niet, dit is het schriftelijke antwoord:',anotherVersion:'Andere versie',copyReply:'Kopieer antwoord',coachEyebrow:'Vertrouwelijk en praktisch',coachTitle:'Vraag Liv waar je best terechtkunt.',coachText:'Deze lokale demo verwijst een vraag naar een waarschijnlijk intern contact. Ze stelt geen diagnose, monitort niemand en rapporteert niets.',coachPromptIt:'Mijn laptop, account of infrastructuur werkt niet.',coachPromptHr:'Ik heb een HR- of bedrijfswagenvraag.',coachPrompt1:'Mijn project heeft meer tijd of capaciteit nodig.',coachPrompt2:'Een samenwerking wordt moeilijk.',coachPrompt3:'Ik heb een privacy- of beveiligingsvraag.',coachPrompt4:'Ik wil graag vertrouwelijk met iemand praten.',boundaryTitle:'Grens van het prototype',boundaryText:'Geen chatgeschiedenis, geen HR-melding en geen sentimentscore. Een productiedirectory wordt intern beheerd.',coachQuestion:'Wat wil je vragen?',coachQuestionSub:'Je hoeft het niet perfect te formuleren.',coachPlaceholder:'Beschrijf je vraag of situatie…',askLiv:'Vraag het aan Liv',profilesEyebrow:'Lokale profielbron',profilesTitle:'50 fictieve persona’s voor tests',profilesText:'Importeer later je eigen CSV; die wordt alleen in deze browser opgeslagen. Gebruik fictieve of goedgekeurde data voor demo’s.',importCsv:'CSV importeren',downloadCsv:'Huidige CSV downloaden',resetDemo:'Demodata herstellen',profilesLoaded:'profielen geladen',departments:'afdelingen',averageDistance:'gemiddelde stijlafstand',searchProfiles:'Zoek naam, functie of afdeling…',allDepartments:'Alle afdelingen',methodTitle:'Methodenoot',methodText:'De vier kleurenergieën dienen hier als communicatierichting, niet als etiketten of een nieuwe assessment. Bevestig de interne licentie vóór gebruik van beschermde termen of materialen in productie.',distanceClose:'De twee stijlen liggen relatief dicht bij elkaar.',distanceModerate:'De stijlen verschillen op enkele belangrijke punten.',distanceFar:'De stijlen liggen ver uit elkaar; common ground wordt aanbevolen.',styleApplied:'Common-groundstijl toegepast',profileMix:'Doelmix',needText:'Voer eerst een bericht in.',copied:'Gekopieerd.',csvLoaded:'CSV lokaal geïmporteerd.',csvInvalid:'De CSV is ongeldig. Controleer de verplichte kolommen en percentagetotalen.',demoReset:'De 50 fictieve demoprofielen zijn hersteld.',screenshotLarge:'De afbeelding is groter dan 7 MB.',coachNeed:'Voer eerst een vraag in.',localEngine:'Contextbewarende browser-herschrijfengine',meetingReason:'Het onderwerp lijkt gevoelig of kan schriftelijk gemakkelijk tot misverstanden leiden.',meetingSuggestion:'Ik denk dat dit duidelijker is in een kort gesprek. Heb je tijd voor een korte call, zodat we de situatie kunnen begrijpen en samen de volgende stap bepalen?',noResults:'Geen profielen gevonden voor deze filter.'},
  fr:{eyebrow:'Communication personnelle. Terrain d’entente professionnel.',heroTitle:'Écrivez avec votre voix.<br><span>Rejoignez mieux l’autre.</span>',heroText:'Liv adapte la structure, le ton et le niveau de détail à deux profils locaux. Aucun message ni profil n’est envoyé à un backend.',pill1:'50 personas fictifs',pill2:'Import CSV',pill3:'Fonctionne hors ligne',blueShort:'précis',redShort:'décisif',greenShort:'attentionné',yellowShort:'sociable',pocTitle:'Version de démonstration management',pocText:'Cette preuve de concept GitHub Pages utilise un moteur déterministe dans le navigateur—pas une IA—et 50 profils fictifs. Aucun message n’est envoyé à un backend.',tabRewrite:'Rédiger une réponse',tabRewriteSub:'Réécriture selon les profils',tabCoach:'Demander à Liv',tabCoachSub:'Démo d’orientation interne',tabProfiles:'Personas de test',tabProfilesSub:'Profils CSV et import',demoLabel:'Démo rapide :',demoDocuments:'Documents',demoDeadline:'Délai manqué',demoCapacity:'Capacité projet',demoFeedback:'Feedback difficile',demoConflict:'Conflit sensible',sourceTitle:'Que voulez-vous reformuler ?',sourceSub:'Utilisez un brouillon ou un message reçu.',clear:'Effacer',roughDraft:'Mon brouillon',incomingMessage:'Message reçu',sourcePlaceholder:'Saisissez la réponse que BeNice doit rendre plus claire et professionnelle…',notSent:'Rien n’est envoyé automatiquement',upload:'Ajouter une capture',uploadSub:'Aperçu uniquement dans cette preuve de concept locale',remove:'Supprimer',screenshotNote:'La capture reste sur cet appareil. La reconnaissance de texte sera reliée plus tard à l’agent interne.',settingsTitle:'Choisissez les deux personnes',settingsSub:'L’application cherche un pont professionnel entre leurs styles.',sender:'Expéditeur—vous',recipient:'Destinataire',adaptation:'Adaptation',commonGround:'Terrain d’entente',commonGroundSub:'pont entre les deux styles',closerThem:'Plus proche de l’autre',closerThemSub:'le destinataire pèse plus',closerMe:'Plus proche de moi',closerMeSub:'votre voix domine',neutral:'Neutre',neutralSub:'base professionnelle',tone:'Ton',balanced:'Équilibré',softer:'Plus doux',direct:'Plus direct',intent:'Objectif',automatic:'Détection automatique',ask:'Poser une question',request:'Demander une action',feedback:'Donner un feedback',deescalate:'Désamorcer',inform:'Informer',replyLanguage:'Langue de réponse',length:'Longueur',brief:'Court',balancedLength:'Équilibré',withContext:'Avec contexte',questionFlip:'Transformer la pression en question utile lorsque possible',rewriteButton:'Laisser Liv reformuler',resultTitle:'Reformulation professionnelle',resultSub:'Votre sens et vos détails concrets, reformulés selon le style de communication choisi.',copy:'Copier',emptyTitle:'Liv est prête.',emptySub:'Choisissez une démo rapide ou saisissez votre texte.',meetingTitle:'Il serait peut-être préférable d’en parler directement.',copyMeeting:'Copier la proposition de réunion',otherwise:'Sinon, voici la réponse écrite :',anotherVersion:'Autre version',copyReply:'Copier la réponse',coachEyebrow:'Confidentiel et pratique',coachTitle:'Demandez à Liv vers qui vous tourner.',coachText:'Cette démo locale oriente une question vers un contact interne probable. Elle ne diagnostique, ne surveille et ne signale personne.',coachPromptIt:'Mon ordinateur, mon compte ou l’infrastructure ne fonctionne pas.',coachPromptHr:'J’ai une question RH ou concernant une voiture de société.',coachPrompt1:'Mon projet a besoin de plus de temps ou de capacité.',coachPrompt2:'Une collaboration devient difficile.',coachPrompt3:'J’ai une question de confidentialité ou de sécurité.',coachPrompt4:'Je souhaite parler confidentiellement à quelqu’un.',boundaryTitle:'Limite du prototype',boundaryText:'Pas d’historique, pas de notification RH et pas de score de sentiment. Un annuaire de production serait géré en interne.',coachQuestion:'Que souhaitez-vous demander ?',coachQuestionSub:'La formulation ne doit pas être parfaite.',coachPlaceholder:'Décrivez la question ou la situation…',askLiv:'Demander à Liv',profilesEyebrow:'Source locale de profils',profilesTitle:'50 personas fictifs pour les tests',profilesText:'Importez plus tard votre propre CSV ; il reste uniquement dans ce navigateur. Utilisez des données fictives ou approuvées pour les démonstrations.',importCsv:'Importer CSV',downloadCsv:'Télécharger le CSV actuel',resetDemo:'Réinitialiser les données',profilesLoaded:'profils chargés',departments:'départements',averageDistance:'distance moyenne des styles',searchProfiles:'Rechercher nom, rôle ou département…',allDepartments:'Tous les départements',methodTitle:'Note méthodologique',methodText:'Les quatre énergies servent ici de guide de communication, pas d’étiquettes ni de nouvelle évaluation. Confirmez la licence interne avant un usage en production.',distanceClose:'Les deux styles sont relativement proches.',distanceModerate:'Les styles diffèrent sur plusieurs points importants.',distanceFar:'Les styles sont éloignés ; un terrain d’entente est recommandé.',styleApplied:'Style de terrain d’entente appliqué',profileMix:'Mélange cible',needText:'Saisissez d’abord un message.',copied:'Copié.',csvLoaded:'CSV importé localement.',csvInvalid:'CSV invalide. Vérifiez les colonnes obligatoires et les totaux.',demoReset:'Les 50 profils fictifs ont été restaurés.',screenshotLarge:'L’image dépasse 7 Mo.',coachNeed:'Saisissez d’abord une question.',localEngine:'Moteur local de reformulation qui conserve le contexte',meetingReason:'Le sujet semble sensible ou susceptible de créer un malentendu par écrit.',meetingSuggestion:'Je pense que ce serait plus clair lors d’un bref échange. Seriez-vous disponible pour un court appel afin de comprendre la situation et de convenir de la prochaine étape ?',noResults:'Aucun profil ne correspond au filtre.'},
  de:{eyebrow:'Persönliche Kommunikation. Professioneller gemeinsamer Nenner.',heroTitle:'Schreiben Sie in Ihrer Stimme.<br><span>Erreichen Sie Ihr Gegenüber besser.</span>',heroText:'Liv passt Struktur, Ton und Detailgrad mit zwei lokalen Profilen an. Keine Nachricht und kein Profil wird an ein Backend gesendet.',pill1:'50 fiktive Testpersonen',pill2:'CSV-Import',pill3:'Offline nutzbar',blueShort:'präzise',redShort:'entschlossen',greenShort:'rücksichtsvoll',yellowShort:'kontaktfreudig',pocTitle:'Management-Demoversion',pocText:'Diese GitHub-Pages-Demo überarbeitet den eingegebenen Text, bewahrt konkrete Details und passt das Ergebnis an fiktive Farbenergieprofile an. Die lokale Demo-Engine ist keine KI und sendet nichts an ein Backend.',tabRewrite:'Antwort schreiben',tabRewriteSub:'Profilbewusst umformulieren',tabCoach:'Liv fragen',tabCoachSub:'Interne Routing-Demo',tabProfiles:'Testpersonen',tabProfilesSub:'CSV-Profile und Import',demoLabel:'Schnelle Demo:',demoDocuments:'Dokumente',demoDeadline:'Verpasste Frist',demoCapacity:'Projektkapazität',demoFeedback:'Schwieriges Feedback',demoConflict:'Sensibler Konflikt',sourceTitle:'Was möchten Sie umformulieren?',sourceSub:'Nutzen Sie einen Rohentwurf oder eine erhaltene Nachricht.',clear:'Löschen',roughDraft:'Mein Rohentwurf',incomingMessage:'Erhaltene Nachricht',sourcePlaceholder:'Geben Sie die Antwort ein, die BeNice klarer und professioneller machen soll…',notSent:'Nichts wird automatisch gesendet',upload:'Screenshot hinzufügen',uploadSub:'Nur Vorschau in diesem lokalen Proof of Concept',remove:'Entfernen',screenshotNote:'Der Screenshot bleibt auf diesem Gerät. Texterkennung wird später mit dem internen Agenten verbunden.',settingsTitle:'Wählen Sie beide Personen',settingsSub:'Die App findet eine professionelle Brücke zwischen den Stilen.',sender:'Absender—Sie',recipient:'Empfänger',adaptation:'Anpassung',commonGround:'Gemeinsamer Nenner',commonGroundSub:'Brücke zwischen beiden Stilen',closerThem:'Näher an der anderen Person',closerThemSub:'Empfänger zählt stärker',closerMe:'Näher bei mir',closerMeSub:'Ihre Stimme dominiert',neutral:'Neutral',neutralSub:'professionelle Basis',tone:'Ton',balanced:'Ausgewogen',softer:'Sanfter',direct:'Direkter',intent:'Ziel',automatic:'Automatisch erkennen',ask:'Frage stellen',request:'Aktion anfordern',feedback:'Feedback geben',deescalate:'Deeskalieren',inform:'Informieren',replyLanguage:'Antwortsprache',length:'Länge',brief:'Kurz',balancedLength:'Ausgewogen',withContext:'Mit Kontext',questionFlip:'Druck nach Möglichkeit in eine hilfreiche Frage umwandeln',rewriteButton:'Von Liv umformulieren lassen',resultTitle:'Professionelle Überarbeitung',resultSub:'Ihre Bedeutung und konkrete Details, angepasst an den gewählten Kommunikationsstil.',copy:'Kopieren',emptyTitle:'Liv ist bereit.',emptySub:'Wählen Sie eine Demo oder geben Sie eigenen Text ein.',meetingTitle:'Das sollte möglicherweise direkt besprochen werden.',copyMeeting:'Besprechungsvorschlag kopieren',otherwise:'Andernfalls lautet die schriftliche Antwort:',anotherVersion:'Andere Version',copyReply:'Antwort kopieren',coachEyebrow:'Vertraulich und praktisch',coachTitle:'Fragen Sie Liv, wohin Sie sich wenden können.',coachText:'Diese lokale Demo leitet eine Frage an einen wahrscheinlichen internen Kontakt weiter. Sie diagnostiziert, überwacht oder meldet niemanden.',coachPromptIt:'Mein Laptop, Konto oder die Infrastruktur funktioniert nicht.',coachPromptHr:'Ich habe eine HR- oder Firmenwagenfrage.',coachPrompt1:'Mein Projekt braucht mehr Zeit oder Kapazität.',coachPrompt2:'Eine Zusammenarbeit wird schwierig.',coachPrompt3:'Ich habe eine Datenschutz- oder Sicherheitsfrage.',coachPrompt4:'Ich möchte vertraulich mit jemandem sprechen.',boundaryTitle:'Grenze des Prototyps',boundaryText:'Kein Verlauf, keine HR-Meldung und kein Stimmungswert. Ein Produktivverzeichnis würde intern verwaltet.',coachQuestion:'Was möchten Sie fragen?',coachQuestionSub:'Die Formulierung muss nicht perfekt sein.',coachPlaceholder:'Beschreiben Sie die Frage oder Situation…',askLiv:'Liv fragen',profilesEyebrow:'Lokale Profilquelle',profilesTitle:'50 fiktive Personen zum Testen',profilesText:'Importieren Sie später Ihre eigene CSV; sie bleibt nur in diesem Browser. Nutzen Sie fiktive oder genehmigte Daten für Demos.',importCsv:'CSV importieren',downloadCsv:'Aktuelle CSV herunterladen',resetDemo:'Demodaten zurücksetzen',profilesLoaded:'Profile geladen',departments:'Abteilungen',averageDistance:'durchschnittliche Stildistanz',searchProfiles:'Name, Rolle oder Abteilung suchen…',allDepartments:'Alle Abteilungen',methodTitle:'Methodenhinweis',methodText:'Die vier Farbenergien dienen hier als Kommunikationsrichtung, nicht als Etikett oder neue Bewertung. Prüfen Sie die interne Lizenz vor dem Produktionseinsatz.',distanceClose:'Die beiden Stile liegen relativ nah beieinander.',distanceModerate:'Die Stile unterscheiden sich in einigen wichtigen Bereichen.',distanceFar:'Die Stile liegen weit auseinander; ein gemeinsamer Nenner wird empfohlen.',styleApplied:'Gemeinsamer Stil angewendet',profileMix:'Zielmischung',needText:'Geben Sie zuerst eine Nachricht ein.',copied:'Kopiert.',csvLoaded:'CSV lokal importiert.',csvInvalid:'Ungültige CSV. Prüfen Sie Pflichtspalten und Prozentwerte.',demoReset:'Die 50 fiktiven Demoprofile wurden wiederhergestellt.',screenshotLarge:'Das Bild ist größer als 7 MB.',coachNeed:'Geben Sie zuerst eine Frage ein.',localEngine:'Kontextbewahrende Browser-Umschreibengine',meetingReason:'Das Thema wirkt sensibel oder kann schriftlich leicht missverstanden werden.',meetingSuggestion:'Ich denke, das wäre in einem kurzen Gespräch klarer. Hätten Sie Zeit für einen kurzen Termin, damit wir die Situation verstehen und den nächsten Schritt vereinbaren können?',noResults:'Keine Profile entsprechen dem Filter.'}
};

const browserLang=typeof navigator!=='undefined'&&['en','nl','fr','de'].includes((navigator.language||'').slice(0,2))?(navigator.language||'').slice(0,2):'en';
const state={lang:localStorage.getItem('benice.uiLang')||browserLang,personas:[],defaultCsv:'',inputMode:'draft',adaptation:'common_ground',variant:0,lastResult:null,deferredPrompt:null};
const t=(k)=>I18N[state.lang]?.[k]??I18N.en[k]??k;

function applyLanguage(){
  document.documentElement.lang=state.lang;
  $('#uiLanguage').value=state.lang;
  $$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(I18N[state.lang]?.[key])el.textContent=t(key)});
  $$('[data-i18n-html]').forEach(el=>{const key=el.dataset.i18nHtml;if(I18N[state.lang]?.[key])el.innerHTML=t(key)});
  $$('[data-i18n-placeholder]').forEach(el=>{const key=el.dataset.i18nPlaceholder;if(I18N[state.lang]?.[key])el.placeholder=t(key)});
  updateInputPlaceholder();renderProfileSelectors();renderProfiles();updateSelectedProfiles();
}

async function init(){
  bindEvents();
  await loadPersonas();
  applyLanguage();
  updateSelectedProfiles();
  renderProfiles();
  updateStats();
  registerServiceWorker();
  const hash=location.hash.replace('#',''); if(['rewrite','coach','profiles'].includes(hash)) switchMode(hash);
}

function bindEvents(){
  $('#uiLanguage').addEventListener('change',e=>{state.lang=e.target.value;localStorage.setItem('benice.uiLang',state.lang);applyLanguage()});
  $$('.mode-tabs button').forEach(b=>b.addEventListener('click',()=>switchMode(b.dataset.mode)));
  $$('[data-choice="inputMode"] button').forEach(b=>b.addEventListener('click',()=>{state.inputMode=b.dataset.value;setActiveChoice('inputMode',state.inputMode);updateInputPlaceholder()}));
  $$('[data-choice="adaptation"] button').forEach(b=>b.addEventListener('click',()=>{state.adaptation=b.dataset.value;setActiveChoice('adaptation',state.adaptation);updateSelectedProfiles()}));
  $('#sourceText').addEventListener('input',()=>$('#charCount').textContent=`${$('#sourceText').value.length} / 8000`);
  $('#clearBtn').addEventListener('click',clearRewrite);
  $('#senderSelect').addEventListener('change',updateSelectedProfiles);$('#recipientSelect').addEventListener('change',updateSelectedProfiles);
  $('#rewriteBtn').addEventListener('click',()=>rewrite(false));$('#tryAgainBtn').addEventListener('click',()=>rewrite(true));
  $('#copyBtn').addEventListener('click',()=>copyText($('#resultText').value));$('#copyMainBtn').addEventListener('click',()=>copyText($('#resultText').value));
  $('#copyMeetingBtn').addEventListener('click',()=>copyText(state.lastResult?.meetingSuggestion||t('meetingSuggestion')));
  $$('.demo-scenarios button[data-scenario]').forEach(b=>b.addEventListener('click',()=>loadScenario(b.dataset.scenario)));
  $('#imageInput').addEventListener('change',handleImage);$('#removeImageBtn').addEventListener('click',removeImage);
  $$('.coach-prompts button').forEach(b=>b.addEventListener('click',()=>loadCoachPrompt(b.dataset.coach)));
  $('#coachBtn').addEventListener('click',runCoach);
  $('#csvInput').addEventListener('change',importCsv);$('#downloadCsvBtn').addEventListener('click',downloadCurrentCsv);$('#resetCsvBtn').addEventListener('click',resetDemoCsv);
  $('#profileSearch').addEventListener('input',renderProfiles);$('#departmentFilter').addEventListener('change',renderProfiles);
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.deferredPrompt=e;$('#installBtn').classList.remove('hidden')});
  $('#installBtn').addEventListener('click',async()=>{if(state.deferredPrompt){state.deferredPrompt.prompt();await state.deferredPrompt.userChoice;state.deferredPrompt=null;$('#installBtn').classList.add('hidden')}});
}

function setActiveChoice(group,value){$$(`[data-choice="${group}"] button`).forEach(b=>b.classList.toggle('active',b.dataset.value===value))}
function switchMode(mode){
  $$('.mode-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  ['rewrite','coach','profiles'].forEach(m=>$(`#${m}Mode`).classList.toggle('hidden',m!==mode));
  history.replaceState(null,'',`#${mode}`);
}
function updateInputPlaceholder(){
  $('#sourceText').placeholder=state.inputMode==='draft'?t('sourcePlaceholder'):(state.lang==='nl'?'Plak het ontvangen bericht. Liv stelt een professionele reactie voor…':state.lang==='fr'?'Collez le message reçu. Liv proposera une réponse professionnelle…':state.lang==='de'?'Fügen Sie die erhaltene Nachricht ein. Liv schlägt eine professionelle Antwort vor…':'Paste the message you received. Liv will suggest a professional response…');
}

async function loadPersonas(){
  const saved=localStorage.getItem('benice.personasCsv');
  const response=await fetch('./data/personas.csv');state.defaultCsv=await response.text();
  const parsed=parseAndValidateCsv(saved||state.defaultCsv);
  state.personas=parsed.ok?parsed.rows:parseAndValidateCsv(state.defaultCsv).rows;
  populateDepartmentFilter();renderProfileSelectors();
}

function parseCsv(text){
  const rows=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(c==='"'&&quoted&&n==='"'){cell+='"';i++;continue}
    if(c==='"'){quoted=!quoted;continue}
    if(c===','&&!quoted){row.push(cell.trim());cell='';continue}
    if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());cell='';if(row.some(v=>v!==''))rows.push(row);row=[];continue}
    cell+=c;
  }
  if(cell||row.length){row.push(cell.trim());if(row.some(v=>v!==''))rows.push(row)}
  return rows;
}
function parseAndValidateCsv(text){
  try{
    const matrix=parseCsv(text.trim());if(matrix.length<2)return{ok:false,rows:[]};
    const headers=matrix[0].map(h=>h.toLowerCase());
    const required=['id','name','email','department','role','language','cool_blue','fiery_red','sunshine_yellow','earth_green'];
    if(required.some(h=>!headers.includes(h)))return{ok:false,rows:[]};
    const rows=matrix.slice(1).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??'']))).map(o=>{
      KEYS.forEach(k=>o[k]=Number(o[k]));return o;
    });
    if(!rows.length||rows.some(r=>!r.name||!r.email||KEYS.some(k=>!Number.isFinite(r[k])||r[k]<0||r[k]>100)||Math.abs(KEYS.reduce((s,k)=>s+r[k],0)-100)>.1))return{ok:false,rows:[]};
    return{ok:true,rows};
  }catch{return{ok:false,rows:[]}}
}
function csvEscape(v){const s=String(v??'');return /[",\n]/.test(s)?`"${s.replaceAll('"','""')}"`:s}
function rowsToCsv(rows){const headers=['id','name','email','department','role','language',...KEYS];return [headers.join(','),...rows.map(r=>headers.map(h=>csvEscape(r[h])).join(','))].join('\n')}

function renderProfileSelectors(){
  const sender=$('#senderSelect'),recipient=$('#recipientSelect');
  const oldSender=sender.value||state.personas[0]?.id,oldRecipient=recipient.value||state.personas[1]?.id;
  const groups=groupBy(state.personas,p=>p.department);
  const markup=Object.keys(groups).sort().map(dept=>`<optgroup label="${escapeHtml(dept)}">${groups[dept].map(p=>`<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)} · ${escapeHtml(p.role)}</option>`).join('')}</optgroup>`).join('');
  sender.innerHTML=markup;recipient.innerHTML=markup;
  sender.value=state.personas.some(p=>p.id===oldSender)?oldSender:state.personas[0]?.id;
  recipient.value=state.personas.some(p=>p.id===oldRecipient)?oldRecipient:state.personas[1]?.id;
}
function updateSelectedProfiles(){
  if(!state.personas.length)return;
  const s=getPersona($('#senderSelect').value)||state.personas[0],r=getPersona($('#recipientSelect').value)||state.personas[1];
  renderProfileCard($('#senderProfile'),s);renderProfileCard($('#recipientProfile'),r);
  const distance=profileDistance(s,r),copy=distance<25?t('distanceClose'):distance<48?t('distanceModerate'):t('distanceFar');
  $('#distanceSummary').innerHTML=`<strong>${Math.round(distance)}% style distance.</strong> ${copy}`;
}
function renderProfileCard(el,p){
  el.innerHTML=`<strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.role)}</small>${barsHtml(p)}`;
}
function barsHtml(p){return `<div class="mini-bars">${KEYS.map(k=>`<div class="bar ${ENERGY[k].css}"><i></i><span class="bar-track"><span class="bar-fill" style="width:${p[k]}%"></span></span><b>${Math.round(p[k])}%</b></div>`).join('')}</div>`}
function getPersona(id){return state.personas.find(p=>p.id===id)}
function profileDistance(a,b){return KEYS.reduce((s,k)=>s+Math.abs(a[k]-b[k]),0)/2}
function blendProfiles(sender,recipient,mode){
  const weights=mode==='recipient'?[.2,.8]:mode==='sender'?[.8,.2]:mode==='neutral'?[0,0]:[.5,.5];
  const target={};KEYS.forEach(k=>target[k]=mode==='neutral'?25:sender[k]*weights[0]+recipient[k]*weights[1]);
  if(mode==='common_ground'&&profileDistance(sender,recipient)>48)KEYS.forEach(k=>target[k]=target[k]*.78+25*.22);
  const total=KEYS.reduce((s,k)=>s+target[k],0);KEYS.forEach(k=>target[k]=Math.round(target[k]/total*100));
  const diff=100-KEYS.reduce((s,k)=>s+target[k],0);target[KEYS[0]]+=diff;return target;
}
function dominant(profile){return KEYS.slice().sort((a,b)=>profile[b]-profile[a])}

const SCENARIOS={
  documents:{mode:'draft',en:'When are you finally able to deliver the documents? We have asked several times already.',nl:'Wanneer kun je die documenten nu eindelijk opleveren? We hebben het al verschillende keren gevraagd.',fr:'Quand pourrez-vous enfin livrer les documents ? Nous l’avons déjà demandé plusieurs fois.',de:'Wann können Sie die Dokumente endlich liefern? Wir haben bereits mehrfach danach gefragt.'},
  deadline:{mode:'draft',en:'This deadline was missed again and nobody warned us. Fix the planning today.',nl:'Deze deadline is opnieuw gemist en niemand heeft ons verwittigd. Los de planning vandaag op.',fr:'Ce délai a encore été dépassé et personne ne nous a prévenus. Corrigez le planning aujourd’hui.',de:'Diese Frist wurde erneut verpasst und niemand hat uns informiert. Korrigieren Sie die Planung heute.'},
  capacity:{mode:'draft',en:'The project is completely overloaded. We cannot keep doing this with the same people and deadline.',nl:'Het project is volledig overbelast. We kunnen dit niet blijven doen met dezelfde mensen en deadline.',fr:'Le projet est complètement surchargé. Nous ne pouvons pas continuer avec la même équipe et le même délai.',de:'Das Projekt ist völlig überlastet. Mit demselben Team und Termin können wir so nicht weitermachen.'},
  feedback:{mode:'draft',en:'The quality of this work is not good enough. You need to pay more attention.',nl:'De kwaliteit van dit werk is niet goed genoeg. Je moet beter opletten.',fr:'La qualité de ce travail n’est pas suffisante. Vous devez être plus attentif.',de:'Die Qualität dieser Arbeit reicht nicht aus. Sie müssen sorgfältiger arbeiten.'},
  conflict:{mode:'draft',en:'I am tired of being blamed for problems that are not mine. This collaboration cannot continue like this.',nl:'Ik ben het beu dat ik de schuld krijg voor problemen die niet van mij zijn. Zo kan deze samenwerking niet verder.',fr:'J’en ai assez d’être tenu responsable de problèmes qui ne sont pas les miens. Cette collaboration ne peut pas continuer ainsi.',de:'Ich habe es satt, für Probleme verantwortlich gemacht zu werden, die nicht meine sind. So kann die Zusammenarbeit nicht weitergehen.'}
};
function loadScenario(key){const s=SCENARIOS[key];state.inputMode=s.mode;setActiveChoice('inputMode',s.mode);$('#sourceText').value=s[state.lang]||s.en;$('#sourceText').dispatchEvent(new Event('input'));updateInputPlaceholder();rewrite(false);$('#rewriteMode').scrollIntoView({behavior:'smooth',block:'start'})}

function detectLanguage(text){
  const l=text.toLowerCase();
  const scores={nl:countMatches(l,[' het ',' de ',' een ',' niet ',' wanneer ',' kunnen ',' vandaag ',' graag ',' opnieuw ']),fr:countMatches(l,[' le ',' la ',' les ',' pas ',' quand ',' pouvez ',' nous ',' merci ',' avec ']),de:countMatches(l,[' der ',' die ',' das ',' nicht ',' wann ',' können ',' heute ',' bitte ',' wir ']),en:countMatches(l,[' the ',' not ',' when ',' can ',' today ',' please ',' we ',' this ',' you '])};
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][1]>0?Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]:'en';
}
function countMatches(text,words){return words.reduce((s,w)=>s+(text.includes(w)?1:0),0)}
function detectTopic(text){
  const l=text.toLowerCase();
  if(/document|documents|documenten|dossier|fichier|unterlagen/.test(l))return'documents';
  if(/deadline|délai|frist|planning|late|te laat|retard|verpasst/.test(l))return'deadline';
  if(/capacity|capaciteit|capacité|kapazität|overload|overbelast|surcharg|überlast|resources|werkkracht/.test(l))return'capacity';
  if(/quality|kwaliteit|qualité|qualität|attention|opletten|sorgfält/.test(l))return'feedback';
  if(/blame|schuld|conflict|collaboration|samenwerking|collaboration|zusammenarbeit|angry|boos|fâché/.test(l))return'conflict';
  return'generic';
}
function detectIntent(text,topic){const chosen=$('#intentSelect').value;if(chosen!=='auto')return chosen;if(topic==='conflict')return'deescalate';if(topic==='feedback')return'feedback';if(/[?]/.test(text))return'ask';if(/please|graag|moet|need|besoin|bitte|müssen/.test(text.toLowerCase()))return'request';return'inform'}
function isSensitive(text,topic){return topic==='conflict'||/harass|pest|ontslag|dismiss|fired|salary|salaris|burnout|vertrouwelijk|confidential|legal action|juridisch/.test(text.toLowerCase())}

const TEMPLATES={
  en:{
    documents:["By when would you need the documents? I’ll confirm what is feasible once I have the required scope.","Could you confirm which documents are still needed and the target date? I’ll align the delivery accordingly.","To plan this properly, which documents do you need and by when?"],
    deadline:["Could you confirm the updated delivery date and whether anything is blocking completion? We can then adjust the plan today.","The deadline has passed without an update. Please share the revised timing and any blocker, so we can agree a realistic next step.","Can we review the missed deadline, the current blocker and the new delivery date today?"],
    capacity:["The current workload is higher than planned. Could we review priorities, available capacity and the deadline together?", "I don’t think the current scope, capacity and timing are aligned. Can we decide what to add, postpone or deprioritise?", "Could we schedule a short review of the project workload and agree where extra time or capacity is needed?"],
    feedback:["I noticed that the result does not yet meet the agreed quality level. Could we review the specific points and agree what needs to change?", "There are a few quality issues that need attention. I’ll list the concrete examples so we can agree the correction and timing.", "Could we review the work together? I want to clarify the expected standard and the changes needed."],
    conflict:["I want to understand what happened and avoid further misunderstanding. Could we discuss the responsibilities and agree a constructive next step?", "I don’t think the current way of working is sustainable. Let’s clarify ownership and agree how we handle issues going forward.", "There seems to be a difference in how we understand the responsibilities. Could we discuss it directly and agree a workable approach?"],
    generic:["Thanks for the context. Could you confirm the expected outcome and timing so we can agree the next step?", "I’d like to make sure we are aligned. Could you clarify what you need, by when, and who should take the next action?", "Could we clarify the objective and agree a practical next step?"]
  },
  nl:{
    documents:["Tegen wanneer heb je de documenten nodig? Zodra de gewenste scope duidelijk is, bevestig ik wat haalbaar is.","Kun je bevestigen welke documenten nog nodig zijn en tegen welke datum? Dan stem ik de levering daarop af.","Welke documenten heb je precies nodig en tegen wanneer? Dan kunnen we dit correct inplannen."],
    deadline:["Kun je de aangepaste leverdatum en eventuele blokkering bevestigen? Dan passen we de planning vandaag nog aan.","De deadline is verstreken zonder update. Bezorg de nieuwe timing en eventuele blokkering, zodat we een realistische volgende stap kunnen afspreken.","Kunnen we vandaag de gemiste deadline, de huidige blokkering en de nieuwe opleverdatum overlopen?"],
    capacity:["De huidige werklast ligt hoger dan gepland. Kunnen we samen prioriteiten, beschikbare capaciteit en timing herbekijken?","Volgens mij zijn scope, capaciteit en timing momenteel niet in balans. Kunnen we bepalen wat we toevoegen, uitstellen of deprioriteren?","Kunnen we kort de projectbelasting bekijken en afspreken waar extra tijd of capaciteit nodig is?"],
    feedback:["Ik merk dat het resultaat nog niet aan het afgesproken kwaliteitsniveau voldoet. Kunnen we de concrete punten overlopen en afspreken wat moet veranderen?","Er zijn enkele kwaliteitsproblemen die aandacht vragen. Ik zet de concrete voorbeelden op een rij, zodat we correctie en timing kunnen afspreken.","Kunnen we het werk samen overlopen? Ik wil het verwachte niveau en de nodige aanpassingen verduidelijken."],
    conflict:["Ik wil begrijpen wat er is gebeurd en verdere misverstanden vermijden. Kunnen we verantwoordelijkheden bespreken en een constructieve volgende stap afspreken?","Ik denk niet dat de huidige manier van samenwerken houdbaar is. Laten we eigenaarschap verduidelijken en afspreken hoe we problemen voortaan aanpakken.","We lijken de verantwoordelijkheden anders te begrijpen. Kunnen we dit rechtstreeks bespreken en een werkbare aanpak afspreken?"],
    generic:["Dank voor de context. Kun je het verwachte resultaat en de timing bevestigen, zodat we de volgende stap kunnen afspreken?","Ik wil zeker zijn dat we op één lijn zitten. Kun je verduidelijken wat nodig is, tegen wanneer en wie de volgende actie neemt?","Kunnen we het doel verduidelijken en een praktische volgende stap afspreken?"]
  },
  fr:{
    documents:["Pour quand avez-vous besoin des documents ? Je confirmerai ce qui est réalisable dès que le périmètre sera clair.","Pouvez-vous confirmer les documents encore nécessaires et la date cible ? J’adapterai la livraison en conséquence.","Quels documents vous faut-il exactement et pour quand ? Nous pourrons alors planifier correctement."],
    deadline:["Pouvez-vous confirmer la nouvelle date de livraison et les éventuels blocages ? Nous pourrons adapter le planning aujourd’hui.","Le délai est dépassé sans mise à jour. Merci de partager le nouveau calendrier et tout blocage afin de convenir d’une prochaine étape réaliste.","Pouvons-nous revoir aujourd’hui le délai manqué, le blocage actuel et la nouvelle date de livraison ?"],
    capacity:["La charge actuelle est supérieure à ce qui était prévu. Pouvons-nous revoir ensemble les priorités, la capacité disponible et le délai ?","Le périmètre, la capacité et le calendrier ne me semblent pas alignés. Pouvons-nous décider de ce qu’il faut ajouter, reporter ou déprioriser ?","Pouvons-nous organiser une courte revue de la charge du projet et convenir du temps ou de la capacité supplémentaire nécessaire ?"],
    feedback:["Je constate que le résultat n’atteint pas encore le niveau de qualité convenu. Pouvons-nous revoir les points précis et convenir des changements nécessaires ?","Quelques problèmes de qualité demandent une attention. Je vais lister les exemples concrets afin que nous puissions convenir des corrections et du délai.","Pouvons-nous revoir le travail ensemble ? Je souhaite clarifier le niveau attendu et les changements nécessaires."],
    conflict:["Je souhaite comprendre ce qui s’est passé et éviter de nouveaux malentendus. Pouvons-nous discuter des responsabilités et convenir d’une prochaine étape constructive ?","La manière actuelle de travailler ne me semble pas durable. Clarifions les responsabilités et convenons de la façon de traiter les problèmes à l’avenir.","Nous semblons comprendre les responsabilités différemment. Pouvons-nous en discuter directement et convenir d’une approche praticable ?"],
    generic:["Merci pour le contexte. Pouvez-vous confirmer le résultat attendu et le calendrier afin que nous convenions de la prochaine étape ?","Je souhaite m’assurer que nous sommes alignés. Pouvez-vous préciser ce qui est nécessaire, pour quand et qui doit agir ensuite ?","Pouvons-nous clarifier l’objectif et convenir d’une prochaine étape pratique ?"]
  },
  de:{
    documents:["Bis wann benötigen Sie die Dokumente? Sobald der Umfang klar ist, bestätige ich, was realistisch ist.","Können Sie bestätigen, welche Dokumente noch benötigt werden und zu welchem Termin? Ich richte die Lieferung entsprechend aus.","Welche Dokumente benötigen Sie genau und bis wann? Dann können wir die Lieferung korrekt planen."],
    deadline:["Können Sie den aktualisierten Liefertermin und mögliche Blockaden bestätigen? Dann passen wir die Planung heute an.","Die Frist ist ohne Aktualisierung verstrichen. Bitte teilen Sie den neuen Zeitplan und mögliche Hindernisse mit, damit wir einen realistischen nächsten Schritt vereinbaren können.","Können wir heute die verpasste Frist, die aktuelle Blockade und den neuen Liefertermin prüfen?"],
    capacity:["Die aktuelle Arbeitslast ist höher als geplant. Können wir Prioritäten, verfügbare Kapazität und Termin gemeinsam prüfen?","Umfang, Kapazität und Zeitplan sind meiner Einschätzung nach nicht im Gleichgewicht. Können wir festlegen, was ergänzt, verschoben oder depriorisiert wird?","Können wir die Projektlast kurz prüfen und vereinbaren, wo zusätzliche Zeit oder Kapazität erforderlich ist?"],
    feedback:["Das Ergebnis entspricht noch nicht dem vereinbarten Qualitätsniveau. Können wir die konkreten Punkte prüfen und die nötigen Änderungen vereinbaren?","Einige Qualitätsprobleme benötigen Aufmerksamkeit. Ich liste die konkreten Beispiele auf, damit wir Korrektur und Termin vereinbaren können.","Können wir die Arbeit gemeinsam prüfen? Ich möchte den erwarteten Standard und die erforderlichen Änderungen klären."],
    conflict:["Ich möchte verstehen, was passiert ist, und weitere Missverständnisse vermeiden. Können wir die Verantwortlichkeiten besprechen und einen konstruktiven nächsten Schritt vereinbaren?","Die aktuelle Zusammenarbeit ist aus meiner Sicht nicht nachhaltig. Lassen Sie uns die Zuständigkeiten klären und vereinbaren, wie wir Probleme künftig behandeln.","Wir scheinen die Verantwortlichkeiten unterschiedlich zu verstehen. Können wir das direkt besprechen und einen praktikablen Ansatz vereinbaren?"],
    generic:["Danke für den Kontext. Können Sie das erwartete Ergebnis und den Zeitplan bestätigen, damit wir den nächsten Schritt vereinbaren können?","Ich möchte sicherstellen, dass wir abgestimmt sind. Können Sie erläutern, was bis wann benötigt wird und wer den nächsten Schritt übernimmt?","Können wir das Ziel klären und einen praktischen nächsten Schritt vereinbaren?"]
  }
};

function rewrite(another){
  const text=$('#sourceText').value.trim();if(!text){toast(t('needText'));return}
  if(another)state.variant++;
  const sender=getPersona($('#senderSelect').value),recipient=getPersona($('#recipientSelect').value);
  const target=blendProfiles(sender,recipient,state.adaptation),rank=dominant(target);
  const lang=$('#replyLanguage').value==='auto'?(detectLanguage(text)||recipient.language||'en'):$('#replyLanguage').value;
  const topic=detectTopic(text),intent=detectIntent(text,topic),sensitive=isSensitive(text,topic);
  const recipientRank=dominant(recipient);
  const output=composeProfileAwareReply(target,rank,lang,topic,$('#toneSelect').value,$('#lengthSelect').value,state.inputMode,intent,text,recipient,state.variant);
  const conversation=conversationRecommendation(text,topic,lang);
  const meetingSuggestion=conversation.suggestion;
  state.lastResult={output,target,lang,topic,intent,sensitive:conversation.show,meetingSuggestion};
  $('#resultText').value=output;$('#emptyResult').classList.add('hidden');$('#resultContent').classList.remove('hidden');
  $('#styleSummary').innerHTML=`<span>◎</span><div><strong>${escapeHtml(t('styleApplied'))}</strong><p>${escapeHtml(profileRationale(target,rank,lang))}</p>${recipeHtml(target,rank)}</div>`;
  renderAdvice(target,rank,text,lang,recipient,recipientRank);
  $('#meetingCard').classList.toggle('hidden',!conversation.show);$('#otherwiseLabel').classList.toggle('hidden',!conversation.show);$('#meetingReason').textContent=conversation.reason;
  $('#resultMeta').textContent=`${t('localEngine')} · ${t('profileMix')}: ${rank.slice(0,2).map(k=>ENERGY[k].label).join(' + ')} · ${output.length} characters`;
  $('#resultContent').scrollIntoView({behavior:'smooth',block:'nearest'});
}

const REWRITE_RULES={
  nl:[
    [/\bik heb nu al (?:\w+|\d+) keer gevraagd wanneer ([^.!?]+?) en niemand antwoordt\b/gi,'ik heb eerder gevraagd wanneer $1, maar ik heb hierop nog geen antwoord ontvangen'],
    [/\bnu eindelijk\b/gi,''],[/\beindelijk\b/gi,''],[/\bal verschillende keren\b/gi,'eerder'],[/\bmeermaals\b/gi,'eerder'],
    [/\bdit slaat nergens op\b/gi,'dit is voor mij nog niet voldoende duidelijk'],[/\bdit is belachelijk\b/gi,'dit is voor mij niet werkbaar'],
    [/\bik ben het beu\b/gi,'ik merk dat dit frustratie veroorzaakt'],[/\bik ben het zat\b/gi,'ik merk dat dit frustratie veroorzaakt'],
    [/\bniemand heeft ons verwittigd\b/gi,'we hebben hierover geen update ontvangen'],[/\bniemand heeft ons geïnformeerd\b/gi,'we hebben hierover geen update ontvangen'],
    [/\bje moet beter opletten\b/gi,'ik vraag je om de aandachtspunten zorgvuldig te verwerken'],[/\bje moet\b/gi,'kun je'],
    [/\bniet goed genoeg\b/gi,'voldoet nog niet aan de afgesproken verwachtingen'],[/\bvolledig overbelast\b/gi,'zwaarder belast dan voorzien'],
    [/\bcompleet overbelast\b/gi,'zwaarder belast dan voorzien'],[/\bzo kan deze samenwerking niet verder\b/gi,'de huidige samenwerking is voor mij niet werkbaar'],
    [/\blos dit vandaag op\b/gi,'kun je dit vandaag in orde brengen'],[/\blos dit op\b/gi,'kun je dit in orde brengen'],
    [/\bfix dit\b/gi,'kun je dit in orde brengen'],[/\bdoe dit\b/gi,'kun je dit uitvoeren'],[/\bstuur mij\b/gi,'kun je mij'],
    [/\bje hebt gefaald\b/gi,'het afgesproken resultaat is niet bereikt'],[/\bjouw fout\b/gi,'een punt dat we samen moeten verduidelijken'],
    [/\bik heb nu al (?:\w+|\d+) keer gevraagd\b/gi,'ik heb dit eerder gevraagd'],[/\bik heb al (?:\w+|\d+) keer gevraagd\b/gi,'ik heb dit eerder gevraagd'],
    [/\bniemand antwoordt\b/gi,'ik heb hierop nog geen antwoord ontvangen'],[/\bniemand reageert\b/gi,'ik heb hierop nog geen reactie ontvangen'],
    [/\bzo kunnen wij toch niet werken\b/gi,'zo kunnen we het werk moeilijk verder plannen'],[/\bzo kunnen we toch niet werken\b/gi,'zo kunnen we het werk moeilijk verder plannen'],
    [/\bwat is hier zo moeilijk aan\b/gi,'kun je aangeven wat de huidige blokkering is'],[/\bwaarom duurt dit zo lang\b/gi,'kun je toelichten wat de vertraging veroorzaakt'],
    [/\bje luistert nooit\b/gi,'ik heb de indruk dat mijn eerdere input nog niet is meegenomen'],[/\bdit is jouw probleem\b/gi,'dit punt vraagt nog jouw opvolging'],
    [/\bik wil dit vandaag\b/gi,'kun je dit vandaag opleveren'],[/\bregel dit vandaag\b/gi,'kun je dit vandaag in orde brengen']
  ],
  en:[
    [/\bi have asked (?:three|four|several|multiple|\d+) times when ([^.!?]+?) and nobody (?:answers|responds|is answering)\b/gi,'I asked earlier when $1, but I have not yet received a response'],
    [/\bfinally\b/gi,''],[/\bwe have asked several times already\b/gi,'we have asked about this before'],
    [/\bthis is ridiculous\b/gi,'this is not workable for me'],[/\bthis makes no sense\b/gi,'this is not yet clear enough'],
    [/\bi am sick of\b/gi,'I am concerned about'],[/\bi am tired of\b/gi,'I am concerned about'],
    [/\bnobody warned us\b/gi,'we did not receive an update'],[/\bnobody informed us\b/gi,'we did not receive an update'],
    [/\byou need to pay more attention\b/gi,'please address the points carefully'],[/\byou need to\b/gi,'could you'],
    [/\bnot good enough\b/gi,'does not yet meet the agreed expectations'],[/\bcompletely overloaded\b/gi,'more heavily loaded than planned'],
    [/\bfix this today\b/gi,'could you resolve this today'],[/\bfix this\b/gi,'could you resolve this'],
    [/\bdo this\b/gi,'could you do this'],[/\byou failed\b/gi,'the agreed result was not achieved'],[/\byour fault\b/gi,'a point we need to clarify together'],
    [/\bi have asked (?:three|four|several|multiple|\d+) times\b/gi,'I have asked about this before'],[/\bnobody is answering\b/gi,'I have not yet received a response'],[/\bnobody responds\b/gi,'I have not yet received a response'],
    [/\bwe cannot work like this\b/gi,'this makes it difficult to plan the work'],[/\bwhat is so difficult about this\b/gi,'could you clarify the current blocker'],[/\bwhy is this taking so long\b/gi,'could you explain what is causing the delay'],
    [/\byou never listen\b/gi,'I do not think my earlier input has been reflected yet'],[/\bthis is your problem\b/gi,'this point still needs your follow-up'],
    [/\bi want this today\b/gi,'could you deliver this today'],[/\bsort this today\b/gi,'could you resolve this today']
  ],
  fr:[
    [/\benfin\b/gi,''],[/\bnous l’avons déjà demandé plusieurs fois\b/gi,'nous l’avons déjà demandé'],
    [/\bc’est ridicule\b/gi,'ce n’est pas réalisable pour moi'],[/\bça n’a aucun sens\b/gi,'ce n’est pas encore suffisamment clair'],
    [/\bj’en ai assez\b/gi,'je constate que cette situation crée de la frustration'],[/\bpersonne ne nous a prévenus\b/gi,'nous n’avons reçu aucune mise à jour'],
    [/\bvous devez être plus attentif\b/gi,'je vous demande de traiter attentivement les points'],[/\bvous devez\b/gi,'pourriez-vous'],
    [/\bn’est pas suffisante\b/gi,'ne répond pas encore aux attentes convenues'],[/\bcomplètement surchargé\b/gi,'plus chargé que prévu'],
    [/\bcorrigez cela aujourd’hui\b/gi,'pourriez-vous corriger cela aujourd’hui'],[/\bcorrigez cela\b/gi,'pourriez-vous corriger cela'],
    [/\bc’est votre faute\b/gi,'c’est un point que nous devons clarifier ensemble'],
    [/\bj’ai déjà demandé (?:plusieurs|trois|quatre|\d+) fois\b/gi,'j’ai déjà posé cette question'],[/\bpersonne ne répond\b/gi,'je n’ai pas encore reçu de réponse'],
    [/\bnous ne pouvons pas travailler comme cela\b/gi,'cela rend la planification du travail difficile'],[/\bpourquoi cela prend-il autant de temps\b/gi,'pouvez-vous préciser la cause du retard'],
    [/\bvous n’écoutez jamais\b/gi,'je ne pense pas que mes remarques précédentes aient encore été prises en compte'],[/\bc’est votre problème\b/gi,'ce point nécessite encore votre suivi']
  ],
  de:[
    [/\bendlich\b/gi,''],[/\bwir haben bereits mehrfach danach gefragt\b/gi,'wir haben bereits danach gefragt'],
    [/\bdas ist lächerlich\b/gi,'das ist für mich nicht praktikabel'],[/\bdas ergibt keinen sinn\b/gi,'das ist noch nicht ausreichend klar'],
    [/\bich habe es satt\b/gi,'ich sehe, dass diese Situation Frustration verursacht'],[/\bniemand hat uns informiert\b/gi,'wir haben keine Aktualisierung erhalten'],
    [/\bsie müssen sorgfältiger arbeiten\b/gi,'bitte bearbeiten Sie die Punkte sorgfältig'],[/\bsie müssen\b/gi,'könnten Sie'],
    [/\breicht nicht aus\b/gi,'entspricht noch nicht den vereinbarten Erwartungen'],[/\bvöllig überlastet\b/gi,'stärker belastet als geplant'],
    [/\bkorrigieren sie das heute\b/gi,'könnten Sie das heute korrigieren'],[/\bkorrigieren sie das\b/gi,'könnten Sie das korrigieren'],
    [/\bdas ist ihre schuld\b/gi,'das ist ein Punkt, den wir gemeinsam klären sollten'],
    [/\bich habe (?:mehrmals|dreimal|viermal|\d+ mal) gefragt\b/gi,'ich habe bereits danach gefragt'],[/\bniemand antwortet\b/gi,'ich habe noch keine Antwort erhalten'],
    [/\bso können wir nicht arbeiten\b/gi,'dadurch wird die weitere Planung erschwert'],[/\bwarum dauert das so lange\b/gi,'könnten Sie die Ursache der Verzögerung erläutern'],
    [/\bsie hören nie zu\b/gi,'meine bisherigen Hinweise wurden offenbar noch nicht berücksichtigt'],[/\bdas ist ihr problem\b/gi,'dieser Punkt benötigt noch Ihre Nachverfolgung']
  ]
};

const ENGINE_COPY={
  en:{thanks:'Thanks for your message.',yellowAsk:'I would also value your perspective before we finalise the next step.',greenAlign:'Could we align this with the people involved so the impact and support are clear?',detailClose:'For clarity, please confirm the owner, timing and agreed next step.',meetingConflict:'This appears sensitive and may be easier to resolve in a short Teams or face-to-face meeting.',meetingComplex:'This topic contains several connected points. A short call may be faster and clearer than a long written exchange.',meetingCapacity:'This concerns scope, capacity and timing. A short project review is likely to be more productive than handling every point by message.',meetingSuggestion:'I think this would be clearer in a short conversation. Would you be available for a brief Teams call or meeting so we can review the facts and agree the next step?',callSuggestion:'This is fairly complex. Could we discuss it in a short call and agree the next step together?',yellowMon:name=>`Hi ${name}, how are you? Did you have a good weekend?`,yellowFri:name=>`Hi ${name}, how are you? Have you had a good week?`,yellowOther:name=>`Hi ${name}, how are you?`,yellowSensitive:name=>`Hi ${name}, I hope you are well.`},
  nl:{thanks:'Dank voor je bericht.',yellowAsk:'Ik hoor ook graag hoe jij hiernaar kijkt voor we de volgende stap vastleggen.',greenAlign:'Kunnen we dit afstemmen met de betrokkenen, zodat de impact en het draagvlak duidelijk zijn?',detailClose:'Kun je voor de duidelijkheid de eigenaar, timing en afgesproken volgende stap bevestigen?',meetingConflict:'Dit onderwerp is gevoelig en bespreek je waarschijnlijk vlotter in een korte Teams- of fysieke meeting.',meetingComplex:'Dit onderwerp bevat meerdere samenhangende punten. Even bellen is waarschijnlijk sneller en duidelijker dan een lange berichtenwisseling.',meetingCapacity:'Dit gaat tegelijk over scope, capaciteit en timing. Een korte projectreview is waarschijnlijk productiever dan elk punt via berichten uit te werken.',meetingSuggestion:'Ik denk dat dit duidelijker wordt in een kort gesprek. Heb je tijd voor een korte Teams-call of meeting om de feiten te overlopen en de volgende stap af te spreken?',callSuggestion:'Dit is vrij complex. Kunnen we het kort telefonisch of via Teams bespreken en samen de volgende stap vastleggen?',yellowMon:name=>`Dag ${name}, hoe gaat het? Heb je een fijn weekend gehad?`,yellowFri:name=>`Dag ${name}, hoe gaat het? Heb je een goede week gehad?`,yellowOther:name=>`Dag ${name}, hoe gaat het met je?`,yellowSensitive:name=>`Dag ${name}, ik hoop dat alles goed gaat.`},
  fr:{thanks:'Merci pour votre message.',yellowAsk:'J’aimerais aussi connaître votre point de vue avant de finaliser la prochaine étape.',greenAlign:'Pouvons-nous aligner ce point avec les personnes concernées afin que l’impact et le soutien soient clairs ?',detailClose:'Pour plus de clarté, pouvez-vous confirmer le responsable, le calendrier et la prochaine étape convenue ?',meetingConflict:'Ce sujet semble sensible et sera probablement plus facile à résoudre lors d’une courte réunion Teams ou en personne.',meetingComplex:'Ce sujet contient plusieurs points liés. Un bref appel sera probablement plus rapide et plus clair qu’un long échange écrit.',meetingCapacity:'Ce sujet concerne à la fois le périmètre, la capacité et le calendrier. Une courte revue du projet sera probablement plus productive qu’un échange de messages.',meetingSuggestion:'Je pense que ce serait plus clair lors d’un bref échange. Seriez-vous disponible pour un appel Teams ou une courte réunion afin de revoir les faits et convenir de la prochaine étape ?',callSuggestion:'Le sujet est assez complexe. Pouvons-nous en parler brièvement par téléphone ou via Teams et convenir ensemble de la prochaine étape ?',yellowMon:name=>`Bonjour ${name}, comment allez-vous ? Avez-vous passé un bon week-end ?`,yellowFri:name=>`Bonjour ${name}, comment allez-vous ? Avez-vous passé une bonne semaine ?`,yellowOther:name=>`Bonjour ${name}, comment allez-vous ?`,yellowSensitive:name=>`Bonjour ${name}, j’espère que vous allez bien.`},
  de:{thanks:'Danke für Ihre Nachricht.',yellowAsk:'Ich würde auch gern Ihre Sicht hören, bevor wir den nächsten Schritt festlegen.',greenAlign:'Können wir das mit den Beteiligten abstimmen, damit Auswirkungen und Unterstützung klar sind?',detailClose:'Könnten Sie zur Klarheit Verantwortlichkeit, Zeitplan und den vereinbarten nächsten Schritt bestätigen?',meetingConflict:'Dieses Thema wirkt sensibel und lässt sich wahrscheinlich in einem kurzen Teams- oder persönlichen Gespräch besser klären.',meetingComplex:'Dieses Thema enthält mehrere zusammenhängende Punkte. Ein kurzer Anruf ist wahrscheinlich schneller und klarer als ein langer schriftlicher Austausch.',meetingCapacity:'Hier geht es gleichzeitig um Umfang, Kapazität und Zeitplan. Eine kurze Projektbesprechung ist wahrscheinlich produktiver als eine Klärung per Nachricht.',meetingSuggestion:'Ich denke, das wäre in einem kurzen Gespräch klarer. Hätten Sie Zeit für einen kurzen Teams-Termin oder ein Gespräch, damit wir die Fakten prüfen und den nächsten Schritt vereinbaren können?',callSuggestion:'Das Thema ist recht komplex. Können wir es kurz telefonisch oder über Teams besprechen und gemeinsam den nächsten Schritt festlegen?',yellowMon:name=>`Hallo ${name}, wie geht es Ihnen? Hatten Sie ein schönes Wochenende?`,yellowFri:name=>`Hallo ${name}, wie geht es Ihnen? Hatten Sie eine gute Woche?`,yellowOther:name=>`Hallo ${name}, wie geht es Ihnen?`,yellowSensitive:name=>`Hallo ${name}, ich hoffe, es geht Ihnen gut.`}
};

function composeProfileAwareReply(target,rank,lang,topic,tone,length,inputMode,intent,source,recipient,variant=0){
  const copy=ENGINE_COPY[lang]||ENGINE_COPY.en;
  const recipientRank=dominant(recipient||target);
  const dominantRecipient=recipientRank[0];
  let base=inputMode==='incoming'?replyToIncoming(source,lang,topic,intent):rewriteDraft(source,lang,intent,tone);
  let sentences=splitSentences(base);

  if(dominantRecipient==='fiery_red')sentences=reorderActionFirst(sentences,lang);
  if(dominantRecipient==='cool_blue')sentences=reorderContextFirst(sentences);

  const sensitive=isSensitive(source,topic);
  const firstName=String(recipient?.name||'').trim().split(/\s+/)[0]||'';
  if(dominantRecipient==='sunshine_yellow' && !hasGreeting(base,lang) && firstName){
    sentences.unshift(personalOpener(lang,firstName,sensitive));
  }

  if((dominantRecipient==='sunshine_yellow'||(recipient?.sunshine_yellow||0)>=35) && !hasInputInvitation(sentences.join(' '),lang) && topic!=='conflict'){
    const current=sentences.join(' ');
    const alternative={en:'I would also value any ideas or points of attention you see.',nl:'Ik hoor ook graag welke ideeën of aandachtspunten jij nog ziet.',fr:'J’aimerais également connaître vos idées ou points d’attention.',de:'Ich würde auch gern Ihre Ideen oder Hinweise dazu hören.'};
    sentences.push(/next step|volgende stap|prochaine étape|nächsten schritt/i.test(current)?alternative[lang]||alternative.en:copy.yellowAsk);
  }
  if((dominantRecipient==='earth_green'||(recipient?.earth_green||0)>=35) && needsAlignment(source) && !hasAlignment(sentences.join(' '))){
    sentences.push(copy.greenAlign);
  }
  if(length==='detailed' && !containsOwnershipTiming(sentences.join(' '),lang))sentences.push(copy.detailClose);

  sentences=dedupeSentences(sentences);
  if(variant%3===1)sentences=sentences.map(s=>alternateSentence(s,lang));
  if(variant%3===2&&sentences.length>2){const last=sentences.pop();sentences.splice(1,0,last)}
  if(length==='brief')sentences=sentences.slice(0,dominantRecipient==='sunshine_yellow'?3:2);
  if(length==='balanced')sentences=sentences.slice(0,5);
  if(tone==='direct')sentences=sentences.map(s=>softTrim(s,lang)).filter(Boolean).slice(0,4);
  if(tone==='softer')sentences=sentences.map(s=>softenSentence(s,lang));
  return formatReply(sentences,dominantRecipient,lang);
}

function rewriteDraft(source,lang,intent,tone){
  let text=normaliseSource(source);
  for(const [pattern,replacement] of (REWRITE_RULES[lang]||REWRITE_RULES.en))text=text.replace(pattern,replacement);
  text=text.replace(/\s+([,.!?;:])/g,'$1').replace(/\s{2,}/g,' ').trim();
  let sentences=splitSentences(text).map(s=>professionaliseSentence(s,lang,intent,tone)).filter(Boolean);
  if($('#questionFlip')?.checked)sentences=sentences.map(s=>turnPressureIntoQuestion(s,lang));
  return dedupeSentences(sentences).join(' ');
}

function replyToIncoming(source,lang,topic,intent){
  const copy=ENGINE_COPY[lang]||ENGINE_COPY.en;
  const cleaned=rewriteDraft(source,lang,intent,'balanced');
  const request=extractRequest(cleaned,lang,topic);
  return `${copy.thanks} ${request}`.trim();
}

function normaliseSource(source){
  return String(source||'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/([!?]){2,}/g,'$1').replace(/\s*\n+\s*/g,' ').replace(/\s{2,}/g,' ').trim();
}
function splitSentences(text){return (String(text||'').match(/[^.!?]+[.!?]?/g)||[]).map(s=>s.trim()).filter(Boolean)}
function ensurePunctuation(s){const t=s.trim();return /[.!?]$/.test(t)?t:`${t}.`}
function capitalise(s){const t=s.trim();return t?t.charAt(0).toUpperCase()+t.slice(1):t}
function professionaliseSentence(sentence,lang,intent,tone){
  let s=sentence.trim().replace(/\s{2,}/g,' ');
  if(!s)return'';
  const maps={
    nl:[[/^bevestig\s+/i,'Kun je bevestigen '],[/^bezorg\s+/i,'Kun je bezorgen '],[/^stuur\s+/i,'Kun je sturen '],[/^laat\s+(.+?)\s+weten/i,'Kun je $1 laten weten'],[/^zorg dat\s+/i,'Kun je ervoor zorgen dat '],[/^kun je\s+(.+?)\.$/i,'Kun je $1?']],
    en:[[/^confirm\s+/i,'Could you confirm '],[/^send\s+/i,'Could you send '],[/^tell me\s+/i,'Could you let me know '],[/^make sure\s+/i,'Could you make sure '],[/^could you\s+(.+?)\.$/i,'Could you $1?']],
    fr:[[/^confirmez\s+/i,'Pouvez-vous confirmer '],[/^envoyez\s+/i,'Pouvez-vous envoyer '],[/^dites-moi\s+/i,'Pouvez-vous me dire '],[/^assurez-vous\s+/i,'Pouvez-vous vous assurer ']],
    de:[[/^bestätigen sie\s+/i,'Könnten Sie bestätigen '],[/^senden sie\s+/i,'Könnten Sie senden '],[/^teilen sie mir\s+/i,'Könnten Sie mir mitteilen '],[/^stellen sie sicher\s+/i,'Könnten Sie sicherstellen ']]
  };
  for(const [p,r] of (maps[lang]||maps.en))s=s.replace(p,r);
  s=capitalise(s);
  if(/^(Kun je|Zou je|Could you|Would you|Pouvez-vous|Pourriez-vous|Könnten Sie|Würden Sie)/i.test(s))s=s.replace(/[.!?]?$/,'?');
  return ensurePunctuation(s).replace('?.','?');
}
function turnPressureIntoQuestion(sentence,lang){
  let s=sentence.trim();
  const rhetorical={
    nl:[[/^Zo kunnen we het werk moeilijk verder plannen[.?]$/i,'Kun je de volgende stap en timing bevestigen, zodat we verder kunnen plannen?'],[/^Hoe moeten we zo verder[.?]$/i,'Kunnen we afspreken wat er nodig is om verder te kunnen?']],
    en:[[/^This makes it difficult to plan the work[.?]$/i,'Could you confirm the next step and timing so we can continue planning?'],[/^How are we supposed to continue like this[.?]$/i,'Could we agree what is needed so we can move forward?']],
    fr:[[/^Cela rend la planification du travail difficile[.?]$/i,'Pouvez-vous confirmer la prochaine étape et le calendrier afin que nous puissions poursuivre la planification ?']],
    de:[[/^Dadurch wird die weitere Planung erschwert[.?]$/i,'Könnten Sie den nächsten Schritt und den Zeitplan bestätigen, damit wir weiterplanen können?']]
  };
  for(const [p,r] of (rhetorical[lang]||rhetorical.en)){if(p.test(s))return s.replace(p,r)}
  if(/[?]$/.test(s))return s;
  const rules={
    nl:[[/^Kun je\b/i,null],[/^Ik vraag je om\s+(.+)[.]$/i,'Kun je $1?'],[/^We hebben geen update ontvangen[.]$/i,'Kun je een update geven over de huidige status?'],[/^Zo kunnen we het werk moeilijk verder plannen[.?]$/i,'Kun je de volgende stap en timing bevestigen, zodat we verder kunnen plannen?']],
    en:[[/^Could you\b/i,null],[/^Please\s+(.+)[.]$/i,'Could you $1?'],[/^We did not receive an update[.]$/i,'Could you share an update on the current status?'],[/^This makes it difficult to plan the work[.?]$/i,'Could you confirm the next step and timing so we can continue planning?']],
    fr:[[/^Pouvez-vous\b/i,null],[/^Merci de\s+(.+)[.]$/i,'Pouvez-vous $1 ?'],[/^Nous n’avons reçu aucune mise à jour[.]$/i,'Pouvez-vous partager une mise à jour sur la situation actuelle ?']],
    de:[[/^Könnten Sie\b/i,null],[/^Bitte\s+(.+)[.]$/i,'Könnten Sie $1?'],[/^Wir haben keine Aktualisierung erhalten[.]$/i,'Könnten Sie den aktuellen Stand mitteilen?']]
  };
  for(const [p,r] of (rules[lang]||rules.en)){if(p.test(s)){return r?s.replace(p,r):s}}
  return s;
}
function extractRequest(cleaned,lang,topic){
  const sentences=splitSentences(cleaned),question=sentences.find(s=>/[?]$/.test(s));
  if(question)return question;
  const fallback={
    nl:{documents:'Kun je bevestigen welke documenten je nodig hebt en tegen wanneer?',deadline:'Kun je de aangepaste timing en eventuele blokkeringen bevestigen?',capacity:'Kunnen we de scope, capaciteit en timing samen herbekijken?',feedback:'Kunnen we de concrete verwachtingen en nodige aanpassingen overlopen?',conflict:'Kunnen we dit rechtstreeks bespreken en een werkbare volgende stap afspreken?',generic:'Kun je verduidelijken wat je precies nodig hebt en tegen wanneer?'},
    en:{documents:'Could you confirm which documents you need and by when?',deadline:'Could you confirm the revised timing and any blockers?',capacity:'Could we review scope, capacity and timing together?',feedback:'Could we review the specific expectations and required changes?',conflict:'Could we discuss this directly and agree a workable next step?',generic:'Could you clarify what you need and by when?'},
    fr:{documents:'Pouvez-vous confirmer les documents nécessaires et la date souhaitée ?',deadline:'Pouvez-vous confirmer le nouveau calendrier et les éventuels blocages ?',capacity:'Pouvons-nous revoir ensemble le périmètre, la capacité et le calendrier ?',feedback:'Pouvons-nous revoir les attentes précises et les changements nécessaires ?',conflict:'Pouvons-nous en parler directement et convenir d’une prochaine étape praticable ?',generic:'Pouvez-vous préciser ce dont vous avez besoin et pour quand ?'},
    de:{documents:'Könnten Sie bestätigen, welche Dokumente Sie bis wann benötigen?',deadline:'Könnten Sie den neuen Zeitplan und mögliche Hindernisse bestätigen?',capacity:'Können wir Umfang, Kapazität und Zeitplan gemeinsam prüfen?',feedback:'Können wir die konkreten Erwartungen und erforderlichen Änderungen besprechen?',conflict:'Können wir das direkt besprechen und einen praktikablen nächsten Schritt vereinbaren?',generic:'Könnten Sie erläutern, was Sie bis wann benötigen?'}
  };
  return (fallback[lang]||fallback.en)[topic]||(fallback[lang]||fallback.en).generic;
}
function reorderActionFirst(sentences,lang){
  const idx=sentences.findIndex(s=>/[?]$/.test(s)||/\b(today|vandaag|aujourd’hui|heute|deadline|tegen|by Friday|avant|bis)\b/i.test(s));
  if(idx>0){const [action]=sentences.splice(idx,1);sentences.unshift(action)}return sentences;
}
function reorderContextFirst(sentences){
  if(sentences.length<2)return sentences;
  const idx=sentences.findIndex(s=>/[?]$/.test(s));
  if(idx===0){const [q]=sentences.splice(0,1);sentences.push(q)}return sentences;
}
function personalOpener(lang,name,sensitive){
  const c=ENGINE_COPY[lang]||ENGINE_COPY.en;if(sensitive)return c.yellowSensitive(name);
  const day=new Date().getDay();return day===1||day===2?c.yellowMon(name):day===5?c.yellowFri(name):c.yellowOther(name);
}
function hasGreeting(text,lang){return /^(hi|hello|hey|dear|dag|hallo|beste|bonjour|salut|cher|chère|guten tag|hallo)\b/i.test(String(text).trim())}
function hasInputInvitation(text,lang){return /your (input|view|ideas)|jouw (inbreng|idee|mening)|votre (avis|point de vue|idées)|ihre (sicht|ideen|meinung)/i.test(text)}
function needsAlignment(text){return /decision|beslissing|change|wijzig|project|plan|approach|aanpak|implementation|implementatie|équipe|décision|projet|änderung|entscheidung|team/i.test(text)}
function hasAlignment(text){return /support|alignment|aligned|draagvlak|afstem|achter de beslissing|soutien|align|unterstütz|abstimm/i.test(text)}
function containsOwnershipTiming(text,lang){return /owner|eigenaar|responsable|verantwort|deadline|timing|date|datum|échéance|frist/i.test(text)}
function dedupeSentences(sentences){const seen=new Set();return sentences.filter(s=>{const k=s.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g,' ').trim();if(!k||seen.has(k))return false;seen.add(k);return true})}
function softTrim(s,lang){return s.replace(/\b(I would like to|Ik wil graag|J’aimerais|Ich würde gerne)\b/gi,lang==='nl'?'Ik wil':lang==='fr'?'Je souhaite':lang==='de'?'Ich möchte':'I want').replace(/\s{2,}/g,' ')}
function softenSentence(s,lang){
  const pairs={nl:[[/^Kun je/i,'Zou je'],[/^Bevestig/i,'Kun je bevestigen']],en:[[/^Could you/i,'Would you mind'],[/^Please/i,'Could you please']],fr:[[/^Pouvez-vous/i,'Pourriez-vous']],de:[[/^Könnten Sie/i,'Würden Sie bitte']]};
  for(const [p,r] of (pairs[lang]||pairs.en)){if(p.test(s))return s.replace(p,r)}return s;
}
function formatReply(sentences,dominantRecipient,lang){
  if(dominantRecipient==='cool_blue'&&sentences.length>=4){const opener=sentences[0],rest=sentences.slice(1);return `${opener}\n\n${rest.map(s=>`• ${s}`).join('\n')}`}
  return sentences.join(' ');
}
function conversationRecommendation(source,topic,lang){
  const c=ENGINE_COPY[lang]||ENGINE_COPY.en;
  const sentenceCount=splitSentences(source).length;
  const complex=sentenceCount>=4||source.length>520||/multiple|several issues|complex|dependency|dependencies|scope.*capacity|capaciteit.*timing|plusieurs|complexe|abhängig|komplex/i.test(source);
  if(topic==='conflict'||isSensitive(source,topic))return{show:true,reason:c.meetingConflict,suggestion:c.meetingSuggestion};
  if(topic==='capacity')return{show:true,reason:c.meetingCapacity,suggestion:c.meetingSuggestion};
  if(complex)return{show:true,reason:c.meetingComplex,suggestion:c.callSuggestion};
  return{show:false,reason:'',suggestion:c.meetingSuggestion};
}

function profileRationale(target,rank,lang){
  const c=RESULT_COPY[lang]||RESULT_COPY.en;
  const needKey={cool_blue:'blueNeed',fiery_red:'redNeed',sunshine_yellow:'yellowNeed',earth_green:'greenNeed'};
  return `${c.dominant}: ${ENERGY[rank[0]].label} (${Math.round(target[rank[0]])}%) — ${c[needKey[rank[0]]]}. ${c.secondary}: ${ENERGY[rank[1]].label} (${Math.round(target[rank[1]])}%) — ${c[needKey[rank[1]]]}.`;
}

function recipeHtml(target,rank){
  return `<div class="message-recipe">${rank.map(k=>`<span class="recipe-chip ${ENERGY[k].css}"><i></i>${escapeHtml(ENERGY[k].label)} ${Math.round(target[k])}%</span>`).join('')}</div>`;
}

function renderAdvice(target,rank,source,lang,recipient,recipientRank){
  const c=RESULT_COPY[lang]||RESULT_COPY.en;
  const extra={
    en:{yellowPersonal:'Start with a brief personal check-in. For example: ask how they are or how their weekend/week was.',yellowIncluded:'The rewrite includes a personal opener because Sunshine Yellow is dominant.',greenSupport:'Name who supports the decision. Do not claim consensus unless it is factually true.',greenImpact:'Explain what changes for the team and what support remains available.',redDeadline:'Add a concrete deadline if action is required.',redOwner:'Clarify who owns the next action.',blueSource:'Add the actual document, source, attachment or URL that supports the message. Never invent a link.'},
    nl:{yellowPersonal:'Start met een korte persoonlijke check-in. Vraag bijvoorbeeld hoe het gaat of hoe het weekend/de week was.',yellowIncluded:'De herwerking bevat een persoonlijke opener omdat Sunshine Yellow dominant is.',greenSupport:'Benoem wie de beslissing ondersteunt. Beweer geen consensus als die niet feitelijk bevestigd is.',greenImpact:'Leg uit wat er voor het team verandert en welke ondersteuning beschikbaar blijft.',redDeadline:'Voeg een concrete deadline toe wanneer actie nodig is.',redOwner:'Verduidelijk wie eigenaar is van de volgende actie.',blueSource:'Voeg het echte document, de bron, bijlage of URL toe die het bericht onderbouwt. Verzin nooit een link.'},
    fr:{yellowPersonal:'Commencez par une courte attention personnelle : demandez comment va la personne ou comment s’est passé son week-end/sa semaine.',yellowIncluded:'La reformulation contient une ouverture personnelle car Sunshine Yellow est dominant.',greenSupport:'Précisez qui soutient la décision. N’affirmez pas un consensus s’il n’est pas confirmé.',greenImpact:'Expliquez ce qui change pour l’équipe et quel soutien reste disponible.',redDeadline:'Ajoutez une échéance concrète si une action est attendue.',redOwner:'Précisez qui est responsable de la prochaine action.',blueSource:'Ajoutez le document, la source, la pièce jointe ou l’URL réelle qui étaye le message. N’inventez jamais un lien.'},
    de:{yellowPersonal:'Beginnen Sie mit einer kurzen persönlichen Frage, etwa wie es der Person geht oder wie ihr Wochenende/ihre Woche war.',yellowIncluded:'Die Überarbeitung enthält eine persönliche Einleitung, weil Sunshine Yellow dominant ist.',greenSupport:'Nennen Sie, wer die Entscheidung unterstützt. Behaupten Sie keinen Konsens, wenn er nicht bestätigt ist.',greenImpact:'Erklären Sie, was sich für das Team ändert und welche Unterstützung verfügbar bleibt.',redDeadline:'Fügen Sie bei einer erwarteten Aktion eine konkrete Frist hinzu.',redOwner:'Klären Sie, wer den nächsten Schritt verantwortet.',blueSource:'Fügen Sie das tatsächliche Dokument, die Quelle, Anlage oder URL hinzu. Erfinden Sie niemals einen Link.'}
  }[lang]||{};
  const hasLink=/(https?:\/\/|www\.|\[[^\]]*link[^\]]*\])/i.test(source),hasDeadline=/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|vandaag|morgen|maandag|dinsdag|woensdag|donderdag|vrijdag|aujourd’hui|demain|lundi|mardi|mercredi|jeudi|vendredi|heute|morgen|montag|dienstag|mittwoch|donnerstag|freitag|\d{1,2}[\/-]\d{1,2})\b/i.test(source),hasOwner=/owner|eigenaar|responsable|verantwortlich|neemt de actie|takes the action/i.test(source),hasSupport=/support|draagvlak|achter de beslissing|soutien|unterstütz|afgestemd|aligned/i.test(source);
  const dominantRecipient=recipientRank?.[0]||rank[0],items=[];
  if(dominantRecipient==='cool_blue'||(recipient?.cool_blue||0)>=35){items.push({energy:'cool_blue',text:hasLink?c.blueUrlPresent:extra.blueSource});items.push({energy:'cool_blue',text:c.blueFacts})}
  if(dominantRecipient==='fiery_red'||(recipient?.fiery_red||0)>=35){if(!hasDeadline)items.push({energy:'fiery_red',text:extra.redDeadline});if(!hasOwner)items.push({energy:'fiery_red',text:extra.redOwner});items.push({energy:'fiery_red',text:c.red})}
  if(dominantRecipient==='sunshine_yellow'||(recipient?.sunshine_yellow||0)>=35){items.push({energy:'sunshine_yellow',text:extra.yellowIncluded||extra.yellowPersonal});items.push({energy:'sunshine_yellow',text:c.yellow})}
  if(dominantRecipient==='earth_green'||(recipient?.earth_green||0)>=35){if(!hasSupport)items.push({energy:'earth_green',text:extra.greenSupport});items.push({energy:'earth_green',text:extra.greenImpact});items.push({energy:'earth_green',text:c.green})}
  const unique=items.filter((item,i,a)=>item.text&&a.findIndex(x=>x.text===item.text)===i).slice(0,6);
  $('#adviceTitle').textContent=c.title;$('#adviceIntro').textContent=c.intro;
  $('#adviceList').innerHTML=unique.map(item=>`<li data-energy="${item.energy}">${escapeHtml(item.text)}</li>`).join('');
  $('#adviceCard').classList.toggle('hidden',!unique.length);
}

function alternateSentence(s,lang){
  const pairs={nl:[[/^Kun je/i,'Wil je'],[/^Ik hoor graag/i,'Ik ben benieuwd naar']],en:[[/^Could you/i,'Would you'],[/^I would also value/i,'I would welcome']],fr:[[/^Pouvez-vous/i,'Pourriez-vous'],[/^J’aimerais également/i,'Je souhaiterais également']],de:[[/^Könnten Sie/i,'Würden Sie'],[/^Ich würde auch gern/i,'Ich wäre auch an']]};
  let out=s;for(const[p,r]of(pairs[lang]||pairs.en)){if(p.test(out)){out=out.replace(p,r);break}}return out;
}

function shorten(s,lang){
  const sentences=s.match(/[^.!?]+[.!?]?/g)||[s];return sentences.slice(0,2).join('').trim();
}
function styleDescription(target,rank,lang){
  const text={en:{blue:'precise and structured',red:'brief and action-oriented',yellow:'warm and engaging',green:'calm and considerate',bridge:'with a professional bridge'},nl:{blue:'precies en gestructureerd',red:'kort en actiegericht',yellow:'warm en betrokken',green:'rustig en consideraat',bridge:'met een professionele brug'},fr:{blue:'précis et structuré',red:'bref et orienté action',yellow:'chaleureux et engageant',green:'calme et attentionné',bridge:'avec un pont professionnel'},de:{blue:'präzise und strukturiert',red:'kurz und handlungsorientiert',yellow:'warm und einladend',green:'ruhig und rücksichtsvoll',bridge:'mit einer professionellen Brücke'}}[lang]||{};
  return `${text[ENERGY[rank[0]].css]} + ${text[ENERGY[rank[1]].css]}, ${text.bridge}.`;
}

function clearRewrite(){
  $('#sourceText').value='';$('#sourceText').dispatchEvent(new Event('input'));removeImage();$('#resultContent').classList.add('hidden');$('#emptyResult').classList.remove('hidden');$('#adviceCard').classList.add('hidden');state.lastResult=null;state.variant=0;
}
function handleImage(e){const f=e.target.files?.[0];if(!f)return;if(f.size>7*1024*1024){toast(t('screenshotLarge'));e.target.value='';return}const r=new FileReader();r.onload=()=>{$('#preview').src=r.result;$('#preview').classList.remove('hidden');$('#removeImageBtn').classList.remove('hidden');$('#screenshotNote').classList.remove('hidden')};r.readAsDataURL(f)}
function removeImage(){$('#imageInput').value='';$('#preview').src='';$('#preview').classList.add('hidden');$('#removeImageBtn').classList.add('hidden');$('#screenshotNote').classList.add('hidden')}

const COACH_ROUTES=[
  {id:'it-hardware',keywords:/laptop|computer|pc|macbook|screen|monitor|printer|network|wifi|wi-fi|vpn|hardware|infrastructure|infrastructuur|account|login|password|outlook|teams|device|toestel|gsm|phone|internet|server|foutmelding|error/i,
    service:{en:'IT Hardware & Infrastructure',nl:'IT · Hardware & infrastructuur',fr:'IT · Matériel et infrastructure',de:'IT · Hardware und Infrastruktur'},
    contact:{en:'HaloPSA Service Desk',nl:'HaloPSA Service Desk',fr:'Service Desk HaloPSA',de:'HaloPSA Service Desk'},
    route:{en:'Create a HaloPSA ticket. Include the affected device or system, the error message, the impact and urgency. Never include a password.',nl:'Maak een ticket in HaloPSA. Vermeld het betrokken toestel of systeem, de foutmelding, de impact en de urgentie. Deel nooit een wachtwoord.',fr:'Créez un ticket HaloPSA. Indiquez l’appareil ou le système, le message d’erreur, l’impact et l’urgence. Ne partagez jamais de mot de passe.',de:'Erstellen Sie ein HaloPSA-Ticket. Nennen Sie Gerät oder System, Fehlermeldung, Auswirkung und Dringlichkeit. Teilen Sie niemals ein Passwort.'},
    actions:['halopsa','copy-ticket']},
  {id:'fleet',keywords:/wagen|wagenpark|bedrijfswagen|auto|car|vehicle|fleet|lease|tankkaart|fuel card|laadpas|charging card|banden|tyres|verzekering|insurance|schade|damage/i,
    service:{en:'Fleet management',nl:'Wagenpark',fr:'Gestion de flotte',de:'Fuhrpark'},contact:{en:'Maarten · HR & Fleet',nl:'Maarten · HR & wagenpark',fr:'Maarten · RH et flotte',de:'Maarten · HR und Fuhrpark'},
    route:{en:'Maarten manages the vehicle fleet. Contact him directly and include the vehicle, registration plate, issue and required timing.',nl:'Maarten beheert het wagenpark. Neem rechtstreeks contact op en vermeld het voertuig, de nummerplaat, het probleem en de gewenste timing.',fr:'Maarten gère la flotte. Contactez-le directement en précisant le véhicule, l’immatriculation, le problème et le délai souhaité.',de:'Maarten verwaltet den Fuhrpark. Kontaktieren Sie ihn direkt und nennen Sie Fahrzeug, Kennzeichen, Problem und gewünschten Termin.'},actions:['teams','mail']},
  {id:'hr',keywords:/\bhr\b|human resources|personeel|people|verlof|leave|vacation|vakantie|contract|salary|loon|salaire|urlaub|gehalt|policy|beleid|arbeids|employment/i,
    service:{en:'Human Resources',nl:'HR',fr:'Ressources humaines',de:'Personalwesen'},contact:{en:'Maarten · HR',nl:'Maarten · HR',fr:'Maarten · RH',de:'Maarten · HR'},
    route:{en:'Maarten is the HR contact. Policy questions can start by email; personal or sensitive matters are better discussed privately in Teams or a meeting.',nl:'Maarten is het HR-aanspreekpunt. Beleidsvragen kunnen per mail; persoonlijke of gevoelige onderwerpen bespreek je beter privé via Teams of in een gesprek.',fr:'Maarten est le contact RH. Les questions de politique peuvent commencer par e-mail ; les sujets personnels ou sensibles se discutent mieux en privé.',de:'Maarten ist der HR-Ansprechpartner. Richtlinienfragen können per E-Mail beginnen; persönliche oder sensible Themen sollten privat besprochen werden.'},actions:['teams','mail']},
  {id:'crm',keywords:/salesforce|sfmc|marketing cloud|\bcrm\b|lead|contact sync|contact synchron|campaign|journey|subscriber|data extension/i,
    service:{en:'CRM service',nl:'CRM-dienst',fr:'Service CRM',de:'CRM-Service'},contact:{en:'CRM application owner',nl:'CRM-applicatieverantwoordelijke',fr:'Responsable applicatif CRM',de:'CRM-Anwendungsverantwortung'},
    route:{en:'Route this to the CRM service. Include the record ID, environment, exact action, error message and time of occurrence.',nl:'Stuur dit naar de CRM-dienst. Voeg record-ID, omgeving, exacte actie, foutmelding en tijdstip toe.',fr:'Transmettez ceci au service CRM. Ajoutez l’identifiant, l’environnement, l’action exacte, le message d’erreur et l’heure.',de:'Leiten Sie dies an den CRM-Service weiter. Nennen Sie Datensatz-ID, Umgebung, Aktion, Fehlermeldung und Zeitpunkt.'},actions:['teams','copy-request']},
  {id:'dms',keywords:/\bdms\b|document management|documentbeheer|documentenbeheer|archief|archive|document flow|document workflow/i,
    service:{en:'DMS service',nl:'DMS-dienst',fr:'Service DMS',de:'DMS-Service'},contact:{en:'DMS application owner',nl:'DMS-applicatieverantwoordelijke',fr:'Responsable applicatif DMS',de:'DMS-Anwendungsverantwortung'},
    route:{en:'Route this to the DMS service. Include the document or dossier reference, the step that fails, permissions and expected result.',nl:'Stuur dit naar de DMS-dienst. Voeg document- of dossierreferentie, de falende stap, rechten en het verwachte resultaat toe.',fr:'Transmettez ceci au service DMS. Ajoutez la référence du document ou dossier, l’étape en échec, les droits et le résultat attendu.',de:'Leiten Sie dies an den DMS-Service weiter. Nennen Sie Dokument-/Aktenreferenz, fehlerhaften Schritt, Berechtigungen und erwartetes Ergebnis.'},actions:['teams','copy-request']},
  {id:'privacy',keywords:/privacy|gdpr|rgpd|datenschutz|personal data|persoonsgegevens|datalek|data breach|information security|cybersecurity/i,
    service:{en:'Privacy & Information Security',nl:'Privacy & Information Security',fr:'Privacy et sécurité de l’information',de:'Datenschutz und Informationssicherheit'},contact:{en:'Privacy or Information Security owner',nl:'Privacy- of Information Security-verantwoordelijke',fr:'Responsable Privacy ou sécurité',de:'Datenschutz- oder Informationssicherheitsverantwortung'},
    route:{en:'Share only the minimum necessary context. Do not copy personal or confidential data into an open channel.',nl:'Deel alleen de minimaal noodzakelijke context. Kopieer geen persoonsgegevens of vertrouwelijke gegevens naar een open kanaal.',fr:'Partagez uniquement le contexte minimum nécessaire. Ne copiez pas de données personnelles ou confidentielles dans un canal ouvert.',de:'Teilen Sie nur den minimal notwendigen Kontext. Kopieren Sie keine personenbezogenen oder vertraulichen Daten in einen offenen Kanal.'},actions:['teams','copy-request']},
  {id:'capacity',keywords:/capacity|capaciteit|capacité|kapazität|deadline|project|workload|werklast|charge|arbeitslast|resources|extra tijd|extra people|extra mensen/i,
    service:{en:'Project ownership',nl:'Projectverantwoordelijkheid',fr:'Responsabilité du projet',de:'Projektverantwortung'},contact:{en:'Project owner or manager',nl:'Projecteigenaar of manager',fr:'Responsable du projet ou manager',de:'Projektverantwortung oder Führungskraft'},
    route:{en:'Discuss scope, priorities, capacity and timing together. Prepare which work should be added, postponed or deprioritised.',nl:'Bespreek scope, prioriteiten, capaciteit en timing samen. Bereid voor welk werk moet worden toegevoegd, uitgesteld of gedeprioriteerd.',fr:'Discutez ensemble du périmètre, des priorités, de la capacité et du calendrier. Préparez les éléments à ajouter, reporter ou déprioriser.',de:'Besprechen Sie Umfang, Prioritäten, Kapazität und Termin gemeinsam. Bereiten Sie vor, was ergänzt, verschoben oder depriorisiert werden soll.'},actions:['teams','copy-request']},
  {id:'wellbeing',keywords:/struggl|overwhelm|burnout|stress|vertrouw|confidential|confidentiel|vertraulich|talk to someone|praten|moeilijke periode|difficult period/i,
    service:{en:'Confidential support',nl:'Vertrouwelijke ondersteuning',fr:'Soutien confidentiel',de:'Vertrauliche Unterstützung'},contact:{en:'A trusted manager, confidential contact or prevention service',nl:'Een vertrouwde manager, vertrouwenspersoon of preventiedienst',fr:'Un manager de confiance, une personne de confiance ou le service de prévention',de:'Eine vertraute Führungskraft, Vertrauensperson oder Präventionsdienst'},
    route:{en:'Choose the person you trust. Contact is voluntary and you decide what you share. This demo does not notify HR or retain the conversation.',nl:'Kies de persoon die je vertrouwt. Contact is vrijwillig en jij bepaalt wat je deelt. Deze demo verwittigt HR niet en bewaart het gesprek niet.',fr:'Choisissez la personne en qui vous avez confiance. Le contact est volontaire et vous décidez de ce que vous partagez. Cette démo ne prévient pas les RH.',de:'Wählen Sie eine Person Ihres Vertrauens. Der Kontakt ist freiwillig und Sie entscheiden, was Sie teilen. Diese Demo informiert HR nicht.'},actions:['teams']},
  {id:'conflict',keywords:/conflict|samenwerking|collaboration|zusammenarbeit|manager|colleague|collega|collègue|blame|schuld|frustrat/i,
    service:{en:'Direct conversation',nl:'Rechtstreeks gesprek',fr:'Échange direct',de:'Direktes Gespräch'},contact:{en:'The person involved, your manager or a confidential contact',nl:'De betrokkene, je manager of een vertrouwenspersoon',fr:'La personne concernée, votre manager ou une personne de confiance',de:'Die beteiligte Person, Ihre Führungskraft oder eine Vertrauensperson'},
    route:{en:'Start with a factual overview and the outcome you need. For a sensitive relationship issue, use a private Teams call or face-to-face conversation.',nl:'Start met een feitelijk overzicht en het resultaat dat je nodig hebt. Bespreek een gevoelige relatiekwestie privé via Teams of in een fysiek gesprek.',fr:'Commencez par les faits et le résultat attendu. Pour une question relationnelle sensible, privilégiez un appel Teams privé ou un échange en personne.',de:'Beginnen Sie mit den Fakten und dem gewünschten Ergebnis. Besprechen Sie sensible Beziehungsthemen privat per Teams oder persönlich.'},actions:['teams','copy-request']}
];

function loadCoachPrompt(key){const text={it:{en:'My laptop cannot connect to the VPN and I receive an error. Where should I report this?',nl:'Mijn laptop kan niet verbinden met de VPN en ik krijg een foutmelding. Waar meld ik dit?',fr:'Mon ordinateur ne se connecte pas au VPN et affiche une erreur. Où dois-je le signaler ?',de:'Mein Laptop kann keine VPN-Verbindung herstellen und zeigt einen Fehler. Wo melde ich das?'},hr:{en:'I have a question about HR or my company car. Who should I contact?',nl:'Ik heb een vraag over HR of mijn bedrijfswagen. Met wie neem ik contact op?',fr:'J’ai une question RH ou concernant ma voiture de société. Qui dois-je contacter ?',de:'Ich habe eine Frage zu HR oder meinem Firmenwagen. Wen sollte ich kontaktieren?'},capacity:{en:'My project needs more time or capacity. Who should I contact?',nl:'Mijn project heeft meer tijd of capaciteit nodig. Met wie bespreek ik dit?',fr:'Mon projet a besoin de plus de temps ou de capacité. Qui dois-je contacter ?',de:'Mein Projekt braucht mehr Zeit oder Kapazität. Wen sollte ich ansprechen?'},conflict:{en:'A collaboration is becoming difficult. Who can help me discuss this constructively?',nl:'Een samenwerking wordt moeilijk. Wie kan mij helpen dit constructief te bespreken?',fr:'Une collaboration devient difficile. Qui peut m’aider à en parler de manière constructive ?',de:'Eine Zusammenarbeit wird schwierig. Wer kann mir helfen, das konstruktiv zu besprechen?'},privacy:{en:'I have a privacy or security question. Who is the right contact?',nl:'Ik heb een privacy- of beveiligingsvraag. Wie is het juiste contact?',fr:'J’ai une question de confidentialité ou de sécurité. Qui est le bon contact ?',de:'Ich habe eine Datenschutz- oder Sicherheitsfrage. Wer ist der richtige Kontakt?'},wellbeing:{en:'I would like to talk to someone confidentially. What are my options?',nl:'Ik wil graag vertrouwelijk met iemand praten. Welke opties zijn er?',fr:'Je souhaite parler confidentiellement à quelqu’un. Quelles sont mes options ?',de:'Ich möchte vertraulich mit jemandem sprechen. Welche Möglichkeiten gibt es?'}};
  $('#coachText').value=text[key]?.[state.lang]||text[key]?.en||'';runCoach();
}
function coachText(value,lang){return value?.[lang]||value?.en||''}
function coachActionLabel(type,lang){const labels={
  halopsa:{en:'Open HaloPSA',nl:'Open HaloPSA',fr:'Ouvrir HaloPSA',de:'HaloPSA öffnen'},
  teams:{en:'Open Teams',nl:'Open Teams',fr:'Ouvrir Teams',de:'Teams öffnen'},
  mail:{en:'Compose email',nl:'Stel e-mail op',fr:'Rédiger un e-mail',de:'E-Mail verfassen'},
  'copy-ticket':{en:'Copy ticket description',nl:'Kopieer ticketomschrijving',fr:'Copier la description du ticket',de:'Ticketbeschreibung kopieren'},
  'copy-request':{en:'Copy request summary',nl:'Kopieer vraagsamenvatting',fr:'Copier le résumé',de:'Anfragezusammenfassung kopieren'}
};return labels[type]?.[lang]||labels[type]?.en||type}
function coachDraft(route,text,lang){const service=coachText(route.service,lang);const intro={en:`Service: ${service}\n\nQuestion: `,nl:`Dienst: ${service}\n\nVraag: `,fr:`Service : ${service}\n\nQuestion : `,de:`Dienst: ${service}\n\nFrage: `}[lang]||`Service: ${service}\n\nQuestion: `;return `${intro}${text.trim()}`}
function coachActionsHtml(route,text,lang){return `<div class="coach-actions">${route.actions.map(type=>{
  const label=escapeHtml(coachActionLabel(type,lang));
  if(type==='halopsa')return `<a class="primary-button" href="https://horizon.carya.tools/auth" target="_blank" rel="noopener">${label}</a>`;
  if(type==='teams')return `<a class="secondary-button" href="https://teams.microsoft.com/" target="_blank" rel="noopener">${label}</a>`;
  if(type==='mail'){const subject=encodeURIComponent(`${coachText(route.service,lang)} · BeNice`),body=encodeURIComponent(coachDraft(route,text,lang));return `<a class="secondary-button" href="mailto:?subject=${subject}&body=${body}">${label}</a>`}
  return `<button class="secondary-button" type="button" data-coach-copy="${type}">${label}</button>`
}).join('')}</div>`}
function runCoach(){
  const text=$('#coachText').value.trim();if(!text){toast(t('coachNeed'));return}
  const route=COACH_ROUTES.find(v=>v.keywords.test(text))||{id:'general',service:{en:'Internal service owner',nl:'Interne dienstverantwoordelijke',fr:'Responsable du service interne',de:'Interne Dienstverantwortung'},contact:{en:'Your manager or the relevant service owner',nl:'Je manager of de relevante dienstverantwoordelijke',fr:'Votre manager ou le responsable du service',de:'Ihre Führungskraft oder die zuständige Dienstverantwortung'},route:{en:'Clarify the question, desired outcome and urgency. In the production version, Liv will use the internal service directory and manager relationships to route this precisely.',nl:'Verduidelijk de vraag, het gewenste resultaat en de urgentie. In de productieversie gebruikt Liv de interne dienstencatalogus en managerrelaties om dit exact te routeren.',fr:'Clarifiez la question, le résultat attendu et l’urgence. En production, Liv utilisera l’annuaire des services et les relations managériales.',de:'Klären Sie Frage, gewünschtes Ergebnis und Dringlichkeit. In Produktion nutzt Liv Dienstverzeichnis und Managerbeziehungen für die genaue Weiterleitung.'},actions:['teams','mail']};
  const title={en:'Liv suggests this route',nl:'Liv stelt deze route voor',fr:'Liv propose cette voie',de:'Liv schlägt diesen Weg vor'}[state.lang]||'Liv suggests this route';
  const note={en:'Demo routing. Replace generic Teams/mail actions with the approved internal directory in the Microsoft version.',nl:'Demoroutering. Vervang de generieke Teams- en mailacties in de Microsoft-versie door de goedgekeurde interne directory.',fr:'Routage de démonstration. Remplacez les actions génériques par l’annuaire interne approuvé.',de:'Demo-Weiterleitung. Ersetzen Sie generische Aktionen in der Microsoft-Version durch das freigegebene interne Verzeichnis.'}[state.lang];
  $('#coachResult').innerHTML=`<h3>${escapeHtml(title)}</h3><p class="coach-service">${escapeHtml(coachText(route.service,state.lang))}</p><p>${escapeHtml(coachText(route.route,state.lang))}</p><div class="contact-card"><div><strong>${escapeHtml(coachText(route.contact,state.lang))}</strong><small>${escapeHtml(note)}</small></div><span>${escapeHtml(route.id.toUpperCase())}</span></div>${coachActionsHtml(route,text,state.lang)}`;
  $('#coachResult').classList.remove('hidden');
  $('#coachResult [data-coach-copy]')?.addEventListener('click',()=>copyText(coachDraft(route,text,state.lang)));
}

function populateDepartmentFilter(){const sel=$('#departmentFilter'),old=sel.value;sel.innerHTML=`<option value="">${escapeHtml(t('allDepartments'))}</option>`+[...new Set(state.personas.map(p=>p.department))].sort().map(d=>`<option>${escapeHtml(d)}</option>`).join('');sel.value=old}
function renderProfiles(){
  if(!state.personas.length)return;
  populateDepartmentFilter();const q=$('#profileSearch').value.toLowerCase(),dept=$('#departmentFilter').value;
  const filtered=state.personas.filter(p=>(!dept||p.department===dept)&&(!q||`${p.name} ${p.role} ${p.department} ${p.email}`.toLowerCase().includes(q)));
  $('#personaGrid').innerHTML=filtered.length?filtered.map(personaCardHtml).join(''):`<div class="card" style="padding:25px">${escapeHtml(t('noResults'))}</div>`;
}
function personaCardHtml(p){const d=dominant(p)[0];return `<article class="persona-card"><div class="persona-head"><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.role)}</small></div><span class="dominant-badge ${ENERGY[d].css}">${ENERGY[d].label}</span></div>${barsHtml(p)}<div class="persona-meta"><span>${escapeHtml(p.department)}</span><span>${escapeHtml((p.language||'en').toUpperCase())}</span></div></article>`}
function updateStats(){
  $('#profileCount').textContent=state.personas.length;$('#departmentCount').textContent=new Set(state.personas.map(p=>p.department)).size;
  let total=0,count=0;for(let i=0;i<state.personas.length;i+=5){for(let j=i+1;j<state.personas.length;j+=11){total+=profileDistance(state.personas[i],state.personas[j]);count++}}
  $('#averageDistance').textContent=`${Math.round(total/Math.max(count,1))}%`;
}
async function importCsv(e){const file=e.target.files?.[0];if(!file)return;const text=await file.text(),parsed=parseAndValidateCsv(text);if(!parsed.ok){toast(t('csvInvalid'));e.target.value='';return}state.personas=parsed.rows;localStorage.setItem('benice.personasCsv',rowsToCsv(parsed.rows));renderProfileSelectors();populateDepartmentFilter();renderProfiles();updateStats();updateSelectedProfiles();toast(t('csvLoaded'));e.target.value=''}
function downloadCurrentCsv(){const blob=new Blob([rowsToCsv(state.personas)],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='benice-personas.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
function resetDemoCsv(){localStorage.removeItem('benice.personasCsv');const parsed=parseAndValidateCsv(state.defaultCsv);state.personas=parsed.rows;renderProfileSelectors();populateDepartmentFilter();renderProfiles();updateStats();updateSelectedProfiles();toast(t('demoReset'))}

function groupBy(arr,fn){return arr.reduce((o,x)=>{const k=fn(x);(o[k]??=[]).push(x);return o},{})}
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
async function copyText(text){if(!text)return;try{await navigator.clipboard.writeText(text);toast(t('copied'))}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast(t('copied'))}}
let toastTimer;function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{})}

init().catch(err=>{console.error(err);toast('BeNice could not start. Run it through a local web server.')});
