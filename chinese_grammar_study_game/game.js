export const STORAGE_KEY = 'ju-progress-v1';

export function normalizeAnswer(answer) {
  return answer.normalize('NFKC').replace(/[\p{White_Space}\p{P}]/gu, '');
}

export function isAccepted(input, exercise) {
  const normalized = normalizeAnswer(input);
  return Boolean(normalized) && exercise.accepted_answers.some(answer => normalizeAnswer(answer) === normalized);
}

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function recentlyCorrect(history, times) {
  return Number.isInteger(times) && times > 0 && times < 10 && Array.isArray(history) && history.length >= times && history.slice(-times).every(result => result === true);
}

export function eligibleRules(rules, { difficulty = 'core', ruleId = 'all', mode = 'mix', skipCorrect = 0, historyScope = 'example' }, missed = [], progress = {}) {
  const missedSet = new Set(missed);
  return rules.filter(rule => (difficulty === 'all' || rule.difficulty === difficulty) && (ruleId === 'all' || rule.id === ruleId))
    .map(rule => ({ ...rule, exercises: rule.exercises.filter(exercise =>
      (mode !== 'review' || missedSet.has(exercise.id)) && !recentlyCorrect(
        historyScope === 'rule' ? progress.rules?.[rule.id]?.recent : progress.examples?.[exercise.id]?.recent, skipCorrect)) }));
}

export function makeQueue(rules, options, missed = [], progress = {}) {
  const eligible = eligibleRules(rules, options, missed, progress);
  // Draw across rules before drawing a second exercise from one rule.
  const buckets = shuffle(eligible).map(rule => shuffle(rule.exercises));
  const queue = [];
  while (buckets.some(bucket => bucket.length)) {
    for (const bucket of buckets) {
      if (bucket.length) queue.push(bucket.pop().id);
    }
  }
  return queue;
}

export function sessionStats(session) {
  let streak = 0, bestStreak = 0, correct = 0, misses = 0, selfReviewed = 0;
  for (const answer of session.answers) {
    if (answer.outcome === 'correct') {
      streak++;
      correct++;
      bestStreak = Math.max(bestStreak, streak);
    } else {
      streak = 0;
      if (answer.outcome === 'miss') misses++;
      else selfReviewed++;
    }
  }
  return { streak, bestStreak, correct, misses, selfReviewed, lives: Math.max(0, 3 - misses), answered: session.answers.length };
}

export function newSession(queue) {
  if (!queue.length) throw new Error('No exercises match your selection.');
  return { pool: [...new Set(queue)], queue: [...new Set(queue)], answers: [], stage: 'question', draft: '', pending: null };
}

export function currentId(session) {
  const index = session.stage === 'feedback' ? session.answers.length - 1 : session.answers.length;
  return session.queue[index];
}

export function resolveAnswer(session, outcome, input = '') {
  if (!['question', 'pending'].includes(session.stage)) throw new Error('This question has already been answered.');
  if (!['correct', 'miss', 'self'].includes(outcome)) throw new Error('Unknown outcome.');
  session.answers.push({ id: currentId(session), outcome, input });
  session.stage = 'feedback';
  session.pending = null;
  session.draft = '';
}

export function advance(session) {
  if (session.stage !== 'feedback') return;
  const stats = sessionStats(session);
  if (stats.lives === 0) { session.stage = 'summary'; return; }
  if (stats.answered >= session.queue.length) {
    const next = shuffle(session.pool || [...new Set(session.queue)]);
    if (next.length > 1 && next[0] === session.queue.at(-1)) {
      [next[0], next[1]] = [next[1], next[0]];
    }
    session.queue.push(...next);
  }
  session.stage = 'question';
}

export function emptyProgress() {
  return { version: 1, total: 0, correct: 0, selfReviewed: 0, bestCorrect: 0, bestStreak: 0, missed: [], rules: {}, examples: {}, active: null };
}

export function recordAnswer(progress, session, ruleId) {
  const answer = session.answers.at(-1);
  const stats = sessionStats(session);
  progress.total++;
  if (answer.outcome === 'correct') progress.correct++;
  if (answer.outcome === 'self') progress.selfReviewed++;
  progress.bestCorrect = Math.max(progress.bestCorrect, stats.correct);
  progress.bestStreak = Math.max(progress.bestStreak, stats.bestStreak);
  const missed = new Set(progress.missed);
  if (answer.outcome === 'miss') missed.add(answer.id);
  if (answer.outcome === 'correct') missed.delete(answer.id);
  progress.missed = [...missed];
  const rule = progress.rules[ruleId] || { attempts: 0, correct: 0 };
  rule.attempts++;
  if (answer.outcome === 'correct') rule.correct++;
  // Oldest to newest. null preserves self-review without claiming correctness.
  const accuracy = answer.outcome === 'self' ? null : answer.outcome === 'correct';
  rule.recent = [...(rule.recent || []), accuracy].slice(-10);
  progress.rules[ruleId] = rule;
  progress.examples ??= {};
  progress.examples[answer.id] = { recent: [...(progress.examples[answer.id]?.recent || []), accuracy].slice(-10) };
}

export function restoreProgress(raw, exercises, ruleIds) {
  // Saved browser data is optional. Discard malformed state instead of trapping the player.
  const clean = emptyProgress();
  try {
    const value = JSON.parse(raw);
    if (value?.version !== 1) return clean;
    const nonnegative = n => Number.isSafeInteger(n) && n >= 0;
    const recent = history => Array.isArray(history) ? history.slice(-10).map(result => result === true || result === false ? result : null) : [];
    for (const key of ['total', 'correct', 'selfReviewed', 'bestCorrect', 'bestStreak']) {
      if (nonnegative(value[key])) clean[key] = value[key];
    }
    clean.missed = Array.isArray(value.missed) ? [...new Set(value.missed.filter(id => exercises.has(id)))] : [];
    if (value.rules && typeof value.rules === 'object') {
      for (const id of ruleIds) {
        const record = value.rules[id];
        if (record && nonnegative(record.attempts) && nonnegative(record.correct) && record.correct <= record.attempts) clean.rules[id] = { attempts: record.attempts, correct: record.correct, recent: recent(record.recent) };
      }
    }
    if (value.examples && typeof value.examples === 'object') {
      for (const id of exercises.keys()) {
        if (value.examples[id]) clean.examples[id] = { recent: recent(value.examples[id].recent) };
      }
    }
    const active = value.active;
    if (!active) return clean;
    if (!Array.isArray(active.queue) || !active.queue.length || !active.queue.every(id => exercises.has(id))) return clean;
    if (!Array.isArray(active.answers) || active.answers.length > active.queue.length) return clean;
    if (!active.answers.every((answer, index) => answer?.id === active.queue[index] && ['correct', 'miss', 'self'].includes(answer.outcome) && typeof answer.input === 'string' && answer.input.length <= 1000)) return clean;
    if (!['question', 'pending', 'feedback', 'summary'].includes(active.stage)) return clean;
    if (['question', 'pending'].includes(active.stage) && (active.answers.length === active.queue.length || sessionStats(active).lives === 0)) return clean;
    if (active.stage === 'feedback' && !active.answers.length) return clean;
    if (active.stage === 'summary' && active.answers.length < active.queue.length && sessionStats(active).lives > 0) return clean;
    if (active.stage === 'pending' && (typeof active.pending !== 'string' || !normalizeAnswer(active.pending) || active.pending.length > 1000)) return clean;
    active.draft = typeof active.draft === 'string' ? active.draft.slice(0, 1000) : '';
    const pool = active.pool || [...new Set(active.queue)];
    if (!Array.isArray(pool) || !pool.length || new Set(pool).size !== pool.length || !pool.every(id => exercises.has(id)) || !active.queue.every(id => pool.includes(id))) return clean;
    active.pool = pool;
    clean.bestCorrect = Math.max(clean.bestCorrect, sessionStats(active).correct);
    clean.active = active;
  } catch { /* Start clean if storage is missing or corrupt. */ }
  return clean;
}
