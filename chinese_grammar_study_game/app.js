import { STORAGE_KEY, isAccepted, normalizeAnswer, eligibleRules, makeQueue, newSession, currentId, sessionStats, resolveAnswer, advance, recordAnswer, emptyProgress, restoreProgress } from './game.js?v=continuous-4';

const main = document.querySelector('#main');
const icons = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  fire: '<path d="M12 3c2 5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 2 3 2 3s2-3 1-8Z"/>',
  heart: '<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>',
  book: '<path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5M6 6a8 8 0 0 1 13 3M5 15a8 8 0 0 0 13 3"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const categories = { 'advanced-patterns': 'Advanced patterns', 'everyday-basics': 'Everyday basics', foundations: 'The foundations', 'aspect-and-time': 'Time & aspect', complements: 'Verb complements', 'comparison-and-degree': 'Comparison & degree', connections: 'Connecting ideas', 'sentence-patterns': 'Sentence patterns', 'modals-and-adverbs': 'Modals & adverbs' };
let data, exercises, progress = emptyProgress();
let options = { difficulty: 'core', ruleId: 'all', mode: 'mix', skipCorrect: 0, historyScope: 'example' };
let view = 'setup';
let storageAvailable = true;
let composing = false;
let libraryQuery = '';
let libraryCategory = 'all';

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch { storageAvailable = false; }
  document.querySelector('#save-status').textContent = storageAvailable ? 'Progress saved on this device' : 'Progress available for this visit only';
}

function announce(message) { document.querySelector('#announcer').textContent = message; }
function focusHeading() { requestAnimationFrame(() => main.querySelector('h1')?.focus()); }
function stat(label, value, name, extra = '') {
  return `<div class="stat ${extra}"><span class="stat-label">${icon(name)}${label}</span><strong>${value}</strong></div>`;
}
function ruleOptions() {
  return data.rules.filter(rule => options.difficulty === 'all' || rule.difficulty === options.difficulty);
}
function eligibleCount() {
  return eligibleRules(data.rules, options, progress.missed, progress).reduce((count, rule) => count + rule.exercises.length, 0);
}

function render() {
  if (!data) return;
  const library = location.hash === '#library';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === (library ? 'library' : 'practice');
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (library) renderLibrary();
  else if (progress.active && view === 'session') {
    if (progress.active.stage === 'summary') renderSummary();
    else renderChallenge();
  } else renderSetup();
}

function renderSetup() {
  const available = eligibleCount();
  const resumable = progress.active && progress.active.stage !== 'summary';
  main.innerHTML = `
    <section class="hero">
      <div><div class="eyebrow"><span class="tiny-line"></span> YOUR DAILY DOSE OF CHINESE</div>
      <h1 tabindex="-1">A little practice.<br><span>A better sentence.</span></h1>
      <p>Turn what you know into words. Build your Chinese grammar<br class="desktop-break"> one translation, one small win at a time.</p></div>
      <div class="hero-art" aria-hidden="true"><span class="art-ring ring-one"></span><span class="art-ring ring-two"></span><div class="han-card back">学<span>learn</span></div><div class="han-card front">练<span>practice</span></div><div class="art-spark">✦</div><span class="art-note">Little by little. <span>一点一点。</span></span></div>
    </section>
    <div class="home-grid">
      <section class="panel setup-panel" aria-labelledby="setup-title">
        <div class="section-top"><span class="eyebrow">MAKE IT A HABIT</span><span class="soft-pill">${icon('spark')} Your next small win</span></div>
        <h2 id="setup-title">Your practice, your pace.</h2><p class="muted">Pick a focus. You bring the words.</p>
        ${resumable ? `<div class="resume-banner"><div><strong>A sentence is waiting for you.</strong><span>${sessionStats(progress.active).answered} answered · ${sessionStats(progress.active).correct} correct</span></div><button class="button small" data-action="resume">Resume ${icon('arrow')}</button></div>` : ''}
        <form id="setup-form">
          <fieldset><legend>Practice mode</legend><div class="mode-options">
            <button type="button" class="mode-option ${options.mode === 'mix' ? 'selected' : ''}" data-mode="mix" aria-pressed="${options.mode === 'mix'}">${icon('spark')}<span><strong>Fresh challenge</strong><small>Mix things up</small></span><span class="radio-dot"></span></button>
            <button type="button" class="mode-option ${options.mode === 'review' ? 'selected' : ''}" data-mode="review" aria-pressed="${options.mode === 'review'}">${icon('refresh')}<span><strong>Revisit mistakes</strong><small>${progress.missed.length} sentence${progress.missed.length === 1 ? '' : 's'} to practice</small></span><span class="radio-dot"></span></button>
          </div></fieldset>
          <div class="setup-fields"><label>Difficulty<select id="difficulty"><option value="review" ${options.difficulty === 'review' ? 'selected' : ''}>Beginner</option><option value="core" ${options.difficulty === 'core' ? 'selected' : ''}>Intermediate</option><option value="stretch" ${options.difficulty === 'stretch' ? 'selected' : ''}>Advanced</option><option value="all" ${options.difficulty === 'all' ? 'selected' : ''}>All levels</option></select></label>
          <label>Grammar focus<select id="rule-select"><option value="all">Mix all grammar rules</option>${ruleOptions().map(rule => `<option value="${rule.id}" ${options.ruleId === rule.id ? 'selected' : ''}>${escapeHTML(rule.title)}</option>`).join('')}</select></label></div>
          <div class="setup-fields"><label>Skip consistently correct<select id="skip-correct"><option value="0">Off · practice everything</option>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(times => `<option value="${times}" ${options.skipCorrect === times ? 'selected' : ''}>Correct the last ${times} ${times === 1 ? 'time' : 'times'}</option>`).join('')}</select></label>
          <label>Apply history to<select id="history-scope"><option value="example" ${options.historyScope !== 'rule' ? 'selected' : ''}>Individual sentences</option><option value="rule" ${options.historyScope === 'rule' ? 'selected' : ''}>Whole grammar rules</option></select></label></div>
          <p class="small-muted">Remembers your latest 10 responses per sentence and rule in this browser. Self-reviewed answers interrupt the correct-answer streak.</p>
          <div class="start-row"><button type="submit" class="button primary" ${!available ? 'disabled' : ''}>${resumable ? 'Start a fresh challenge' : 'Let’s practice'} ${icon('arrow')}</button><span>${available ? `3 lives · continue until lives run out` : 'No sentences match this selection.'}</span></div>
          ${!available ? `<p class="empty-hint">${options.skipCorrect ? 'Lower the correct-answer threshold, turn it off, or choose a different focus.' : progress.missed.length ? 'Try all levels or a different grammar focus.' : 'Your review list will fill up as you practice. Start with a fresh challenge.'}</p>` : ''}
        </form>
      </section>
      <aside class="notebook panel"><div class="eyebrow">YOUR NOTEBOOK</div><h2>Small steps add up.</h2><p class="muted">A little more confident, every day.</p>
        <div class="notebook-stats"><div><strong>${progress.total.toLocaleString()}</strong><span>sentences practiced</span></div><div><strong>${progress.bestStreak}<span class="orange">${icon('fire')}</span></strong><span>best answer streak</span></div></div>
        <div class="notebook-line"><span>Personal best</span><strong>${progress.bestCorrect.toLocaleString()} correct</strong></div>
        <div class="notebook-line"><span>Rules explored</span><strong>${Object.keys(progress.rules).length} <span class="muted">/ ${data.counts.rules}</span></strong></div>
        <div class="notebook-note"><span lang="zh-Hans">熟能生巧</span><p>Practice makes progress.<br>Keep showing up.</p></div>
      </aside>
    </div>
    <section class="how-section" aria-label="How it works"><div class="how-item"><span class="step-number">01</span><div><h3>Make the sentence yours</h3><p>Read the English. Type your translation in Chinese.</p></div></div><div class="how-item"><span class="step-number">02</span><div><h3>Find your rhythm</h3><p>Count your correct answers. Keep practicing until your three lives run out.</p></div></div><div class="how-item"><span class="step-number">03</span><div><h3>Take a little more away</h3><p>Learn the grammar and see three more ways to use it.</p></div></div></section>
    <a class="library-banner" href="#library"><span>${icon('book')} <strong>${data.counts.rules} rules. ${data.counts.exercises.toLocaleString()} ways to practice.</strong><span class="muted"> Find your next grammar discovery.</span></span><span>Explore the library ${icon('arrow')}</span></a>`;
  main.querySelector('#setup-form').addEventListener('submit', event => { event.preventDefault(); startChallenge(); });
  main.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
    options.mode = button.dataset.mode;
    if (options.mode === 'review') { options.difficulty = 'all'; options.ruleId = 'all'; }
    renderSetup();
    main.querySelector(`[data-mode="${options.mode}"]`).focus();
  }));
  main.querySelector('#difficulty').addEventListener('change', event => {
    options.difficulty = event.target.value; options.ruleId = 'all'; renderSetup(); main.querySelector('#difficulty').focus();
  });
  main.querySelector('#rule-select').addEventListener('change', event => {
    options.ruleId = event.target.value; renderSetup(); main.querySelector('#rule-select').focus();
  });
  for (const [id, key] of [['skip-correct', 'skipCorrect'], ['history-scope', 'historyScope']]) {
    main.querySelector(`#${id}`).addEventListener('change', event => {
      options[key] = key === 'skipCorrect' ? Number(event.target.value) : event.target.value;
      renderSetup(); main.querySelector(`#${id}`).focus();
    });
  }
  main.querySelector('[data-action="resume"]')?.addEventListener('click', () => { view = 'session'; render(); focusHeading(); });
}

function startChallenge(customOptions) {
  if (progress.active && progress.active.stage !== 'summary' && !confirm('Start a new challenge? Your recorded practice stays saved, but the current challenge will end.')) return;
  const selected = customOptions || options;
  const queue = makeQueue(data.rules, selected, progress.missed, progress);
  if (!queue.length) { announce('No sentences match this selection.'); return; }
  progress.active = newSession(queue);
  view = 'session';
  save();
  if (location.hash !== '#practice') history.replaceState(null, '', '#practice');
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  focusHeading();
}

function renderChallenge() {
  const session = progress.active;
  const { exercise, rule } = exercises.get(currentId(session));
  const stats = sessionStats(session);
  const answered = session.stage !== 'question';
  const pending = session.stage === 'pending';
  const last = session.stage === 'feedback' ? session.answers.at(-1) : null;
  const number = session.stage === 'feedback' ? stats.answered : stats.answered + 1;
  const ending = stats.lives === 0;
  main.innerHTML = `
    <div class="challenge-heading"><div><div class="eyebrow">A LITTLE BETTER, ONE SENTENCE AT A TIME</div><h1 tabindex="-1">Find your words<span class="orange">.</span></h1></div><button class="text-button" data-action="pause">Pause challenge <span aria-hidden="true">↗</span></button></div>
    <div class="session-stats">${stat('CORRECT', stats.correct.toLocaleString(), 'spark')}${stat('STREAK', `${stats.streak}<small> in a row</small>`, 'fire', stats.streak > 1 ? 'hot' : '')}${stat('LIVES', `<span class="hearts" aria-label="${stats.lives} of 3 lives remaining">${[1, 2, 3].map(i => `<span class="${i <= stats.lives ? 'alive' : 'lost'}">${icon('heart')}</span>`).join('')}</span>`, 'heart')}</div>
    <div class="play-grid"><div class="question-column">
      <section class="panel question-panel" aria-labelledby="prompt"><div class="question-top"><span class="eyebrow">SENTENCE ${String(number).padStart(2, '0')}</span><span class="soft-pill ${rule.difficulty}">${escapeHTML(rule.difficulty === 'core' ? 'Intermediate' : rule.difficulty === 'review' ? 'Beginner' : 'Advanced')}</span></div>
        <div class="prompt-block"><span class="eyebrow muted">TRANSLATE INTO CHINESE</span><h2 id="prompt">${escapeHTML(exercise.prompt_english)}</h2></div>
        <div class="target-pattern"><span>${icon('book')} Try this pattern</span><strong>${escapeHTML(rule.pattern)}</strong></div>
        ${answered ? `<div class="submitted-answer"><span class="input-label">YOUR TRANSLATION</span><p lang="zh-Hans">${escapeHTML(pending ? session.pending : last.input) || '<span class="muted">Answer revealed</span>'}</p></div>` : `<form id="answer-form"><label class="input-label" for="answer">YOUR TRANSLATION</label><textarea id="answer" lang="zh-Hans" placeholder="在这里输入中文…" rows="3" maxlength="1000" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="answer-help answer-error">${escapeHTML(session.draft)}</textarea><div class="input-meta"><span id="answer-help">Use your Chinese keyboard. Punctuation is up to you.</span><span class="keyboard-hint"><kbd>Enter</kbd> to check</span></div><p id="answer-error" class="error-text" role="alert"></p><div class="answer-actions"><button class="text-button" type="button" data-action="reveal">Show answer <small>−1 life</small></button><button class="button primary" type="submit">Check answer ${icon('arrow')}</button></div></form>`}
      </section>
      ${answered ? feedbackHTML(exercise, rule, session, stats, pending, last, ending) : '<div class="gentle-note">Make an attempt. That’s where the learning starts.</div>'}
    </div>
    <aside class="play-aside"><section class="panel focus-panel"><span class="icon-tile">${icon('book')}</span><div class="eyebrow">IN FOCUS</div><h2>${escapeHTML(rule.title)}</h2><p>${escapeHTML(categories[rule.category])}</p><div class="aside-divider"></div><span class="mini-label">YOUR MOMENTUM</span><div class="momentum-dots" aria-label="Answer history">${session.queue.slice(Math.max(0, stats.answered - 19), stats.answered + 1).map((id, offset) => { const i = Math.max(0, stats.answered - 19) + offset; return `<span class="${session.answers[i]?.outcome || (i === stats.answered ? 'current' : '')}" title="Sentence ${i + 1}: ${session.answers[i]?.outcome || 'not answered'}">${session.answers[i]?.outcome === 'correct' ? '✓' : session.answers[i]?.outcome === 'miss' ? '×' : session.answers[i]?.outcome === 'self' ? '–' : ''}</span>`; }).join('')}</div><p class="small-muted">${stats.streak ? 'Keep it going. Every correct answer adds one to your total.' : 'Every correct answer is a small win. Keep building your streak.'}</p></section>
      <div class="aside-quote"><span lang="zh-Hans">慢慢来</span><p>Take your time.<br>There’s no clock to beat.</p></div></aside></div>`;
  main.querySelector('[data-action="pause"]').addEventListener('click', () => { view = 'setup'; render(); focusHeading(); });
  if (!answered) bindAnswerForm(exercise);
  main.querySelector('[data-action="count-miss"]')?.addEventListener('click', () => finishAnswer('miss', session.pending, true));
  main.querySelector('[data-action="self-review"]')?.addEventListener('click', () => finishAnswer('self', session.pending, true));
  main.querySelector('[data-action="next"]')?.addEventListener('click', () => {
    advance(session);
    save(); render();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (session.stage === 'question' && matchMedia('(pointer: fine)').matches) main.querySelector('#answer').focus(); else focusHeading();
  });
}

function feedbackHTML(exercise, rule, session, stats, pending, last, ending) {
  const correct = last?.outcome === 'correct';
  const self = last?.outcome === 'self';
  const title = pending ? 'Let’s take a closer look.' : correct ? 'Nicely put!' : self ? 'A different way to say it.' : 'A little learning to take with you.';
  const detail = pending ? 'Not in the accepted answer list. Other valid translations exist; compare yours below.' : correct ? `+1 correct answer${stats.streak > 1 ? ` · ${stats.streak}-answer streak` : ''}` : self ? 'Self-reviewed · correct count unchanged · no life lost · streak reset' : `One life used · ${stats.lives} remaining · added to your review list`;
  return `<section class="panel feedback-panel ${correct ? 'success' : pending ? 'pending' : self ? 'self-reviewed' : 'learning'}" aria-labelledby="feedback-title"><div class="feedback-heading"><span class="feedback-icon">${icon(correct ? 'check' : 'book')}</span><div><h2 id="feedback-title" tabindex="-1">${title}</h2><p>${detail}</p></div></div>
    <div class="expected-answer"><span class="eyebrow">EXPECTED TRANSLATION</span><p class="chinese-answer" lang="zh-Hans">${escapeHTML(exercise.expected.chinese)}</p><p class="pinyin" lang="zh-Latn">${escapeHTML(exercise.expected.pinyin)}</p><p class="translation">${escapeHTML(exercise.expected.english)}</p></div>
    ${exercise.accepted_answers.length > 1 ? `<details class="alternatives"><summary>Also accepted</summary>${exercise.accepted_answers.slice(1).map(answer => `<p lang="zh-Hans">${escapeHTML(answer)}</p>`).join('')}</details>` : ''}
    <div class="grammar-note"><span class="eyebrow">WHY IT WORKS</span><h3>${escapeHTML(rule.title)}</h3><p>${escapeHTML(rule.explanation)}</p></div>
    <div class="more-examples"><span class="eyebrow">THREE MORE WAYS TO USE IT</span>${exercise.feedback_example_ids.map((id, i) => { const sample = exercises.get(id).exercise.expected; return `<div class="example"><span class="example-number">0${i + 1}</span><div><p lang="zh-Hans">${escapeHTML(sample.chinese)}</p><p class="pinyin" lang="zh-Latn">${escapeHTML(sample.pinyin)}</p><p class="translation">${escapeHTML(sample.english)}</p></div></div>`; }).join('')}</div>
    ${pending ? `<div class="review-decision"><p>You know what you meant. Does your translation work?</p><div><button class="button secondary" data-action="self-review">My translation is valid</button><button class="button primary" data-action="count-miss">Count as a miss <span>−1 life</span></button></div><small>Self-review keeps your life, does not increase your correct count, and resets your streak.</small></div>` : `<div class="feedback-next"><button class="button primary" data-action="next">${ending ? 'See your results' : 'Next sentence'} ${icon('arrow')}</button></div>`}
  </section>`;
}

function bindAnswerForm(exercise) {
  const input = main.querySelector('#answer');
  composing = false;
  input.addEventListener('compositionstart', () => { composing = true; });
  input.addEventListener('compositionend', () => { composing = false; });
  input.addEventListener('input', () => { progress.active.draft = input.value; save(); main.querySelector('#answer-error').textContent = ''; input.removeAttribute('aria-invalid'); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && !composing && event.keyCode !== 229) {
      event.preventDefault(); main.querySelector('#answer-form').requestSubmit();
    }
  });
  main.querySelector('#answer-form').addEventListener('submit', event => {
    event.preventDefault();
    if (composing || progress.active.stage !== 'question') return;
    const answer = input.value.trim();
    if (!normalizeAnswer(answer)) {
      main.querySelector('#answer-error').textContent = 'Type your Chinese translation first.';
      input.setAttribute('aria-invalid', 'true'); input.focus(); return;
    }
    if (isAccepted(answer, exercise)) finishAnswer('correct', answer);
    else {
      progress.active.pending = answer; progress.active.stage = 'pending'; save(); render();
      announce('Compare your translation with the expected answer before choosing whether to count a miss.');
      main.querySelector('#feedback-title').focus();
    }
  });
  main.querySelector('[data-action="reveal"]').addEventListener('click', () => finishAnswer('miss', input.value.trim()));
}

function finishAnswer(outcome, input, continueImmediately = false) {
  const session = progress.active;
  const { rule } = exercises.get(currentId(session));
  resolveAnswer(session, outcome, input);
  recordAnswer(progress, session, rule.id);
  if (continueImmediately) advance(session);
  save(); render();
  announce(outcome === 'correct' ? `Correct. You have ${sessionStats(session).correct} correct answers.` : outcome === 'self' ? 'Self-reviewed. Your life is preserved.' : `${sessionStats(session).lives} lives remaining.`);
  if (continueImmediately) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (session.stage === 'question' && matchMedia('(pointer: fine)').matches) main.querySelector('#answer').focus(); else focusHeading();
  } else main.querySelector('#feedback-title').focus();
}

function renderSummary() {
  const session = progress.active;
  const stats = sessionStats(session);
  const completed = stats.lives > 0; // Previously saved fixed-length challenges.
  const missed = session.answers.filter(answer => answer.outcome === 'miss');
  main.innerHTML = `<section class="summary-hero"><span class="summary-symbol">${icon(stats.lives ? 'spark' : 'book')}</span><div class="eyebrow">${completed ? 'CHALLENGE COMPLETE' : 'THREE LIVES, PLENTY LEARNED'}</div><h1 tabindex="-1">${completed ? 'Look how far you’ve come.' : 'Every attempt is progress.'}</h1><p>${completed ? 'One more practice in the books. Let it sink in.' : 'Your lives are used up. Take what you learned into the next round.'}</p></section>
    <section class="panel summary-panel"><div class="summary-score"><span class="eyebrow">CORRECT ANSWERS</span><strong>${stats.correct.toLocaleString()}</strong>${stats.correct > 0 && stats.correct === progress.bestCorrect ? '<span class="soft-pill">Your personal best ✦</span>' : ''}</div><div class="summary-numbers"><div><strong>${stats.correct}<small> / ${stats.answered}</small></strong><span>answers matched</span></div><div><strong>${stats.bestStreak}</strong><span>best streak</span></div><div><strong>${stats.selfReviewed}</strong><span>self-reviewed</span></div></div>
    <p class="summary-detail">${stats.answered} sentences practiced · ${missed.length} to revisit</p><div class="summary-actions"><button class="button primary" data-action="again">Another small win ${icon('arrow')}</button><button class="button secondary" data-action="setup">Choose your next focus</button>${missed.length ? '<button class="text-button" data-action="review-missed">Practice these mistakes</button>' : ''}</div></section>
    ${missed.length ? `<section class="summary-review"><div class="section-top"><h2>Worth another look.</h2><span class="muted">Saved in Revisit mistakes</span></div>${missed.map(answer => { const { exercise, rule } = exercises.get(answer.id); return `<details class="panel review-card" open><summary><span>${escapeHTML(exercise.prompt_english)}</span><span class="muted">Review +</span></summary><p class="chinese-answer" lang="zh-Hans">${escapeHTML(exercise.expected.chinese)}</p><p class="pinyin">${escapeHTML(exercise.expected.pinyin)}</p><h3>${escapeHTML(rule.title)}</h3><p>${escapeHTML(rule.explanation)}</p></details>`; }).join('')}</section>` : '<p class="summary-kind">Keep the feeling. Come back for a few sentences tomorrow.</p>'}`;
  main.querySelector('[data-action="again"]').addEventListener('click', () => startChallenge({ ...options, mode: 'mix' }));
  main.querySelector('[data-action="setup"]').addEventListener('click', () => { view = 'setup'; render(); focusHeading(); });
  main.querySelector('[data-action="review-missed"]')?.addEventListener('click', () => {
    progress.active = newSession(missed.map(answer => answer.id)); view = 'session'; save(); render(); focusHeading();
  });
}

function renderLibrary() {
  main.innerHTML = `<section class="library-hero"><div class="eyebrow">BUILD YOUR UNDERSTANDING</div><h1 tabindex="-1">Good sentences start here<span class="orange">.</span></h1><p>${data.counts.rules} grammar rules to explore. Find a pattern, see it in action, make it yours.</p></section><div class="library-toolbar"><label class="search-field">${icon('search')}<input id="library-search" type="search" placeholder="Search rules, patterns, or examples…" aria-label="Search grammar rules" value="${escapeHTML(libraryQuery)}"></label><label class="category-field"><span class="sr-only">Grammar category</span><select id="library-category"><option value="all">All categories</option>${Object.entries(categories).map(([key, title]) => `<option value="${key}" ${libraryCategory === key ? 'selected' : ''}>${title}</option>`).join('')}</select></label></div><div class="library-meta"><span id="library-count" role="status"></span><span>Beginner → Intermediate → Advanced</span></div><div id="library-list" class="library-list"></div>`;
  main.querySelector('#library-search').addEventListener('input', event => { libraryQuery = event.target.value; renderLibraryList(); });
  main.querySelector('#library-category').addEventListener('change', event => { libraryCategory = event.target.value; renderLibraryList(); });
  renderLibraryList();
}

function renderLibraryList() {
  const query = libraryQuery.toLocaleLowerCase().trim();
  const rules = data.rules.filter(rule => (libraryCategory === 'all' || rule.category === libraryCategory) && `${rule.title} ${rule.pattern} ${rule.explanation} ${rule.exercises.map(exercise => `${exercise.expected.chinese} ${exercise.expected.english}`).join(' ')}`.toLocaleLowerCase().includes(query));
  main.querySelector('#library-count').textContent = `${rules.length} rule${rules.length === 1 ? '' : 's'}`;
  main.querySelector('#library-list').innerHTML = rules.length ? rules.map(rule => `<details class="panel library-rule"><summary><span class="rule-index">${rule.id.slice(-3)}</span><span class="rule-heading"><span class="mini-label">${escapeHTML(categories[rule.category])}</span><strong>${escapeHTML(rule.title)}</strong><span class="rule-pattern">${escapeHTML(rule.pattern)}</span></span><span class="rule-end"><span class="soft-pill ${rule.difficulty}">${rule.difficulty === 'core' ? 'Intermediate' : rule.difficulty === 'review' ? 'Beginner' : 'Advanced'}</span><span class="expand-sign" aria-hidden="true">+</span></span></summary><div class="rule-body"><p>${escapeHTML(rule.explanation)}</p><div class="rule-actions"><button class="button small primary" data-practice-rule="${rule.id}">Practice this rule ${icon('arrow')}</button><span class="muted">10 sentences${progress.rules[rule.id] ? ` · ${progress.rules[rule.id].correct} correct in your practice` : ''}</span></div><div class="rule-examples">${rule.exercises.map((exercise, i) => `<div class="example"><span class="example-number">${String(i + 1).padStart(2, '0')}</span><div><p lang="zh-Hans">${escapeHTML(exercise.expected.chinese)}</p><p class="pinyin" lang="zh-Latn">${escapeHTML(exercise.expected.pinyin)}</p><p class="translation">${escapeHTML(exercise.expected.english)}</p></div></div>`).join('')}</div></div></details>`).join('') : '<div class="panel empty-state"><h2>No rules found.</h2><p>Try a shorter search or choose a different category.</p></div>';
  main.querySelectorAll('[data-practice-rule]').forEach(button => button.addEventListener('click', () => {
    options = { difficulty: 'all', ruleId: button.dataset.practiceRule, mode: 'mix', skipCorrect: 0, historyScope: 'example' }; startChallenge();
  }));
}

async function init() {
  let contentLoaded = false;
  try {
    const response = await fetch('./content/grammar-exercises.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Content could not be loaded (${response.status}).`);
    data = await response.json();
    if (!Array.isArray(data.rules) || !data.rules.length) throw new Error('The exercise bank is empty.');
    contentLoaded = true;
    exercises = new Map(data.rules.flatMap(rule => rule.exercises.map(exercise => [exercise.id, { exercise, rule }])));
    try { progress = restoreProgress(localStorage.getItem(STORAGE_KEY), exercises, data.rules.map(rule => rule.id)); }
    catch { storageAvailable = false; }
    view = 'setup';
    save(); render();
  } catch (error) {
    data = null;
    main.innerHTML = `<section class="panel error-state"><span class="brand-mark" lang="zh-Hans">句</span><h1>${contentLoaded ? 'Let’s get your practice started.' : 'Let’s get your sentences loaded.'}</h1><p>${contentLoaded ? 'The exercise bank loaded, but the game could not start. Refresh the page to load the latest version.' : 'We couldn’t load the exercise bank. Make sure your local server is running and try again.'}</p>${location.protocol === 'file:' ? '<p>Run <code>python3 scripts/serve.py</code> in the project folder, then open <code>http://localhost:8000</code>.</p>' : ''}<button class="button primary" id="retry-load">Try again ${icon('refresh')}</button></section>`;
    main.querySelector('#retry-load').addEventListener('click', init);
    console.error(error);
  }
}

window.addEventListener('hashchange', () => { if (location.hash === '#practice') view = 'setup'; render(); focusHeading(); });
init();
