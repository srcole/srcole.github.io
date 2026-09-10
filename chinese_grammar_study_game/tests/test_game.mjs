import { emptyProgress, newSession, resolveAnswer, recordAnswer, restoreProgress, recentlyCorrect, makeQueue, eligibleRules, advance, currentId, sessionStats } from '../game.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const rules = [{ id: 'rule', difficulty: 'core', exercises: [{ id: 'a' }, { id: 'b' }] }];
const exercises = new Map(rules[0].exercises.map(exercise => [exercise.id, exercise]));
let progress = emptyProgress();
function answer(id, outcome) {
  const session = newSession([id]);
  resolveAnswer(session, outcome, 'test');
  recordAnswer(progress, session, 'rule');
  progress.active = session;
}
answer('a', 'miss');
for (let i = 0; i < 9; i++) answer('a', 'correct');
answer('b', 'self');
assert(progress.rules.rule.recent.length === 10, 'Rule history capped at ten');
assert(progress.rules.rule.recent.at(-1) === null, 'Self-review remains unknown');
assert(progress.examples.a.recent[0] === false, 'Example history ordered oldest first');
assert(recentlyCorrect(progress.examples.a.recent, 9), 'Last nine correct');
assert(!recentlyCorrect(progress.rules.rule.recent, 1), 'Self-review breaks streak');
for (const x of [0, 10, -1, 1.5, '2']) assert(!recentlyCorrect([true, true], x), 'Invalid threshold disabled');
assert(!recentlyCorrect([true], 2), 'Insufficient history stays eligible');
let options = { skipCorrect: 9 };
assert(JSON.stringify(makeQueue(rules, options, [], progress)) === '["b"]', 'Skip mastered example');
assert(eligibleRules(rules, options, [], progress)[0].exercises.length === 1, 'Count matches queue');
assert(makeQueue(rules, { ...options, mode: 'review' }, ['a'], progress).length === 0, 'Review respects filter');
answer('a', 'correct');
assert(progress.examples.a.recent.length === 10 && progress.examples.a.recent.every(Boolean), 'Example history rolls over');
assert(makeQueue(rules, { skipCorrect: 1, historyScope: 'rule' }, [], progress).length === 0, 'Skip entire rule');
const saved = JSON.stringify(progress);
progress = restoreProgress(saved, exercises, ['rule']);
assert(JSON.stringify(progress) === saved, 'History and active session survive reload without duplicate answers');
answer('a', 'miss');
assert(!recentlyCorrect(progress.examples.a.recent, 1), 'Miss restores eligibility');
const legacy = restoreProgress(JSON.stringify({ version: 1, total: 5, rules: { rule: { attempts: 5, correct: 4 } } }), exercises, ['rule']);
assert(legacy.total === 5 && legacy.rules.rule.correct === 4 && legacy.rules.rule.recent.length === 0, 'Legacy totals preserved without inventing history');
const malformed = restoreProgress(JSON.stringify({ version: 1, examples: { a: { recent: [true, 'bad', true] }, unknown: { recent: [true] } } }), exercises, ['rule']);
assert(!recentlyCorrect(malformed.examples.a.recent, 3), 'Invalid results cannot create correct streak');
assert(!malformed.examples.unknown, 'Unknown exercise discarded');
assert(restoreProgress('{', exercises, ['rule']).total === 0, 'Corrupt storage safe');
console.log('Performance history tests passed');

const endless = newSession(['a', 'b']);
const endlessProgress = emptyProgress();
for (let i = 0; i < 45; i++) {
  assert(endless.stage === 'question', 'Challenge continues beyond the old length limit');
  resolveAnswer(endless, 'correct', 'answer');
  recordAnswer(endlessProgress, endless, 'rule');
  advance(endless);
}
assert(sessionStats(endless).correct === 45, 'Every accepted answer counts exactly once');
assert(endlessProgress.bestCorrect === 45, 'Personal best counts correct answers');
assert(endless.answers.every((a, i, answers) => i === 0 || a.id !== answers[i - 1].id), 'Avoid immediate repeats across cycles');
endlessProgress.active = endless;
const resumed = restoreProgress(JSON.stringify(endlessProgress), exercises, ['rule']);
assert(JSON.stringify(resumed) === JSON.stringify(endlessProgress), 'Long repeating challenge survives reload');
for (let i = 0; i < 3; i++) {
  resolveAnswer(endless, 'miss');
  advance(endless);
  assert(endless.stage === (i === 2 ? 'summary' : 'question'), 'Only the third miss ends the challenge');
}
const single = newSession(['a']);
resolveAnswer(single, 'self'); advance(single);
assert(single.stage === 'question' && currentId(single) === 'a', 'Single-sentence pool repeats without ending');
assert(sessionStats(single).correct === 0 && sessionStats(single).lives === 3, 'Self-review adds no correct answer and costs no life');
const oldSave = emptyProgress();
oldSave.bestScore = 1200;
oldSave.active = { queue: ['a'], answers: [{ id: 'a', outcome: 'correct', input: 'answer' }], stage: 'feedback', draft: '', pending: null };
const migrated = restoreProgress(JSON.stringify(oldSave), exercises, ['rule']);
advance(migrated.active);
assert(migrated.active.stage === 'question', 'Old unfinished finite challenge becomes continuous');
assert(migrated.bestCorrect === 1, 'Legacy points are not mistaken for correct answers');
console.log('Continuous challenge tests passed');
