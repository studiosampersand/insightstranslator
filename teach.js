const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const ENERGY = {
  cool_blue: { label: 'Cool Blue', css: 'blue' },
  fiery_red: { label: 'Fiery Red', css: 'red' },
  sunshine_yellow: { label: 'Sunshine Yellow', css: 'yellow' },
  earth_green: { label: 'Earth Green', css: 'green' }
};
const ENERGY_KEYS = Object.keys(ENERGY);
const state = { index: [], conversation: null, selectedMessageId: null, filter: 'all', reviews: {} };

init().catch(error => {
  console.error(error);
  toast(`Kon Teach Liz niet laden: ${error.message}`);
});

async function init() {
  configureGitHubLinks();
  state.index = await fetchJson('./data/conversations/index.json');
  $('#conversationCount').textContent = state.index.length;
  $('#conversationSelect').innerHTML = state.index.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.title)}</option>`).join('');
  bindEvents();
  if (state.index[0]) await loadConversation(state.index[0].id);
}

function bindEvents() {
  $('#conversationSelect').addEventListener('change', event => loadConversation(event.target.value));
  $('#messageFilter').addEventListener('change', event => { state.filter = event.target.value; renderMessages(); });
  $$('[data-review-choice="status"] button').forEach(button => button.addEventListener('click', () => setReviewStatus(button.dataset.value)));
  $('#saveReviewBtn').addEventListener('click', saveCurrentReview);
  $('#exportReviewBtn').addEventListener('click', exportCurrentReview);
  $('#exportAllBtn').addEventListener('click', exportAllReviews);
  $('#submitIssueBtn').addEventListener('click', submitCurrentReview);
}

function configureGitHubLinks() {
  const config = window.INSIGHTS_TRANSLATOR_CONFIG || {};
  const inferredOwner = location.hostname.endsWith('.github.io') ? location.hostname.split('.')[0] : '';
  const inferredRepo = location.hostname.endsWith('.github.io') ? location.pathname.split('/').filter(Boolean)[0] : '';
  const owner = config.githubOwner || inferredOwner || 'YOUR-GITHUB-OWNER';
  const repo = config.githubRepo || inferredRepo || 'insightstranslator';
  state.github = { owner, repo, reviewLabel: config.reviewLabel || 'liz-review' };
  const base = `https://github.com/${owner}/${repo}`;
  $('#actionsLink').href = `${base}/actions`;
  $('#generateLink').href = `${base}/actions/workflows/${config.generateWorkflow || 'generate-conversations.yml'}`;
}

async function loadConversation(id) {
  const entry = state.index.find(item => item.id === id);
  if (!entry) return;
  state.conversation = await fetchJson(entry.path);
  state.selectedMessageId = null;
  state.reviews = loadStoredReviews(state.conversation.id);
  renderConversation();
  renderReview();
}

function renderConversation() {
  const c = state.conversation;
  $('#conversationTitle').textContent = c.title;
  $('#conversationScenario').textContent = c.scenario;
  $('#conversationTension').textContent = `Spanning: ${c.tension}`;
  $('#conversationMeta').textContent = `${c.messages.length} berichten · ${c.language.toUpperCase()} · ${c.model || c.generatedBy}`;
  $('#messageCount').textContent = c.messages.length;
  $('#participantStrip').innerHTML = c.participants.map(participantChipHtml).join('');
  renderMessages();
  updateStats();
}

function renderMessages() {
  const messages = state.conversation?.messages || [];
  const filtered = messages.filter(message => {
    const review = state.reviews[message.id];
    if (state.filter === 'unreviewed') return !review;
    if (state.filter === 'flagged') return review && review.status !== 'approved';
    if (state.filter === 'approved') return review?.status === 'approved';
    return true;
  });
  $('#messageList').innerHTML = filtered.map(message => {
    const review = state.reviews[message.id];
    const statusClass = review?.status === 'approved' ? 'approved' : review ? 'flagged' : '';
    const statusText = review?.status === 'approved' ? 'Goedgekeurd' : review ? 'Gemarkeerd' : 'Nog niet beoordeeld';
    return `<button type="button" class="message-card ${statusClass} ${message.id === state.selectedMessageId ? 'selected' : ''}" data-message-id="${escapeHtml(message.id)}">
      <span class="message-head"><strong>${escapeHtml(message.speakerName)}</strong><span>bericht ${message.turn}</span></span>
      <p>${escapeHtml(message.text)}</p>
      <span class="message-review-mark"><i></i>${statusText}</span>
    </button>`;
  }).join('') || '<p class="empty-list">Geen berichten voor dit filter.</p>';
  $$('.message-card').forEach(card => card.addEventListener('click', () => selectMessage(card.dataset.messageId)));
}

function selectMessage(id) {
  state.selectedMessageId = id;
  renderMessages();
  renderReview();
  if (window.innerWidth < 1100) $('.review-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderReview() {
  const message = currentMessage();
  $('#reviewEmpty').classList.toggle('hidden', !!message);
  $('#reviewForm').classList.toggle('hidden', !message);
  if (!message) return;
  const participant = participantFor(message.speakerId);
  const review = state.reviews[message.id] || blankReview(message, participant);
  $('#reviewSpeaker').textContent = `${message.speakerName} beoordelen`;
  $('#selectedMessageText').textContent = message.text;
  $('#selectedSpeakerProfile').innerHTML = profileBarsHtml(participant);
  $('#reviewReason').value = review.reason || '';
  $('#suggestedRewrite').value = review.suggestedRewrite || '';
  $('#adaptationMode').value = review.adaptationMode || 'common_ground';
  $$('#flagOptions input').forEach(input => input.checked = (review.labels || []).includes(input.value));
  setChoiceVisual(review.status || '');
  updateStatusBadge(review.status);
}

function setReviewStatus(status) {
  if (!currentMessage()) return;
  const review = collectCurrentReview();
  review.status = status;
  state.reviews[review.messageId] = review;
  persistReviews();
  setChoiceVisual(status);
  updateStatusBadge(status);
  renderMessages();
  updateStats();
}

function setChoiceVisual(status) {
  $$('[data-review-choice="status"] button').forEach(button => button.classList.toggle('active', button.dataset.value === status));
}

function updateStatusBadge(status) {
  const badge = $('#reviewStatusBadge');
  badge.className = `review-status ${status || ''}`;
  badge.textContent = status === 'approved' ? 'Goedgekeurd' : status === 'flagged' ? 'Niet oké' : status === 'needs_rewrite' ? 'Herschrijven' : 'Niet beoordeeld';
}

function collectCurrentReview() {
  const message = currentMessage();
  const speaker = participantFor(message.speakerId);
  const existing = state.reviews[message.id] || blankReview(message, speaker);
  return {
    ...existing,
    conversationId: state.conversation.id,
    conversationTitle: state.conversation.title,
    messageId: message.id,
    originalText: message.text,
    speakerId: message.speakerId,
    speakerName: message.speakerName,
    speakerProfile: profileSnapshot(speaker),
    status: activeStatus() || existing.status || 'flagged',
    labels: $$('#flagOptions input:checked').map(input => input.value),
    reason: $('#reviewReason').value.trim(),
    suggestedRewrite: $('#suggestedRewrite').value.trim(),
    adaptationMode: $('#adaptationMode').value,
    updatedAt: new Date().toISOString()
  };
}

function saveCurrentReview() {
  if (!currentMessage()) return;
  const review = collectCurrentReview();
  state.reviews[review.messageId] = review;
  persistReviews();
  renderMessages();
  updateStats();
  toast('Review lokaal bewaard.');
}

function exportCurrentReview() {
  const review = collectCurrentReview();
  downloadJson(`liz-review-${review.conversationId}-${review.messageId}.json`, review);
}

function exportAllReviews() {
  const payload = { exportedAt: new Date().toISOString(), conversations: { [state.conversation?.id || 'none']: state.reviews } };
  downloadJson(`teach-liz-reviews-${new Date().toISOString().slice(0,10)}.json`, payload);
}

function submitCurrentReview() {
  const review = collectCurrentReview();
  state.reviews[review.messageId] = review;
  persistReviews();
  const json = JSON.stringify(review, null, 2);
  const body = `<!-- LIZ_REVIEW_JSON_START -->\n\`\`\`json\n${json}\n\`\`\`\n<!-- LIZ_REVIEW_JSON_END -->\n\nControleer deze review. Na indienen maakt GitHub Actions er een dataset-pull-request van.`;
  const title = `Teach Liz review: ${review.conversationId} / ${review.messageId}`;
  const base = `https://github.com/${state.github.owner}/${state.github.repo}/issues/new`;
  const url = `${base}?title=${encodeURIComponent(title)}&labels=${encodeURIComponent(state.github.reviewLabel)}&body=${encodeURIComponent(body)}`;
  if (url.length > 7500) {
    navigator.clipboard?.writeText(json);
    toast('Review is te lang voor een vooringevulde URL. JSON is gekopieerd; plak die in het issueformulier.');
    window.open(`${base}?template=liz-review.yml&labels=${encodeURIComponent(state.github.reviewLabel)}`, '_blank', 'noopener');
  } else {
    window.open(url, '_blank', 'noopener');
  }
}

function blankReview(message, participant) {
  return {
    conversationId: state.conversation.id,
    messageId: message.id,
    originalText: message.text,
    speakerId: message.speakerId,
    speakerName: message.speakerName,
    speakerProfile: profileSnapshot(participant),
    status: '', labels: [], reason: '', suggestedRewrite: '', adaptationMode: 'common_ground'
  };
}

function loadStoredReviews(conversationId) {
  try { return JSON.parse(localStorage.getItem(`teachLiz.reviews.${conversationId}`) || '{}'); }
  catch { return {}; }
}
function persistReviews() { localStorage.setItem(`teachLiz.reviews.${state.conversation.id}`, JSON.stringify(state.reviews)); }
function currentMessage() { return state.conversation?.messages.find(message => message.id === state.selectedMessageId); }
function participantFor(id) { return state.conversation?.participants.find(person => person.id === id) || {}; }
function activeStatus() { return $('[data-review-choice="status"] button.active')?.dataset.value || ''; }
function profileSnapshot(p) { return Object.fromEntries(['id','name','role',...ENERGY_KEYS].map(key => [key, p?.[key] ?? null])); }

function updateStats() {
  const values = Object.values(state.reviews);
  $('#reviewedCount').textContent = values.length;
  $('#flaggedCount').textContent = values.filter(review => review.status && review.status !== 'approved').length;
}

function participantChipHtml(p) {
  return `<div class="participant-chip"><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.role)}</small>${miniBarsHtml(p)}</div>`;
}
function miniBarsHtml(p) {
  return `<div class="mini-bars">${ENERGY_KEYS.map(key => `<span class="${ENERGY[key].css}" title="${ENERGY[key].label} ${Number(p[key])}%"><i style="--value:${Number(p[key])}%"></i></span>`).join('')}</div>`;
}
function profileBarsHtml(profile) {
  return `<div class="profile-bars">${ENERGY_KEYS.map(key => `<div class="profile-bar ${ENERGY[key].css}"><span class="profile-bar-label"><i></i>${ENERGY[key].label}</span><span class="profile-bar-track"><span class="profile-bar-fill" style="--value:${Math.max(0, Math.min(100, Number(profile[key]) || 0))}"></span></span><b>${Math.round(Number(profile[key]) || 0)}%</b></div>`).join('')}</div>`;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${url} gaf ${response.status}`);
  return response.json();
}
function downloadJson(filename, value) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
function toast(message) { const el = $('#teachToast'); el.textContent = message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 3200); }
