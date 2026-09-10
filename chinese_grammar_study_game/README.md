# Chinese grammar study game

English-to-Chinese translation practice for beginner through advanced learners, using simplified Chinese, with correct-answer counts, streaks, and lives.

## Run locally

With Python 3 installed, run these commands from the directory containing your checkout:

```sh
cd chinese_grammar_study_game
python3 scripts/serve.py
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. If your terminal is already in the project directory, skip the `cd` command. No dependency installation or build step is needed to play.

Keep the server running while you play; press `Ctrl+C` in the terminal to stop it. If port 8000 is already in use, run `python3 scripts/serve.py --port 8001` and open `http://localhost:8001` instead.

Startup prints the exact folder and exercise count being served (currently **155 rules, 1,550 exercises**). If you see an older count, check that you launched this checkout and opened the matching port. The local server disables browser caching, and the app always requests fresh exercise data. After updating an older running server, restart it and hard-refresh once (`Cmd+Shift+R` on Mac or `Ctrl+Shift+R` on Windows/Linux).

Challenges continue until all three lives are used. Sentences matching your starting selection are shuffled and repeat after the pool is exhausted; history filters apply when starting a challenge. Each accepted answer adds one to your correct count, with no streak bonuses. Personal best records the most correct answers in a challenge; old point-based records are not converted into correct counts.

## Saved performance

The game saves progress automatically in this browser's local storage, including the latest **10 responses for each sentence and grammar rule**. On the practice screen, use **Skip consistently correct** to exclude items answered correctly the last **1–9 times**, and choose whether to apply it to individual sentences or whole rules. Items with fewer responses remain eligible. Rule history combines responses across that rule's sentences.

Histories are stored oldest to newest as `recent` arrays under `examples[exerciseId]` and `rules[ruleId]`: `true` for an accepted answer, `false` for a miss or revealed answer, and `null` for a self-reviewed answer. Misses and self-reviews interrupt a correct-answer streak. Existing saved totals remain intact; detailed history starts with responses recorded after this update. Resuming a challenge keeps its existing questions.

Reloading the practice page opens the home screen, even after a finished challenge. An unfinished challenge stays available through **Resume**; clicking **Practice** also returns home. Your correct-answer counts and answer history remain saved.

History stays in the same browser profile and site address (including port); clearing site data removes it. If browser storage is unavailable, the footer indicates that progress lasts only for the current visit.

Run the performance-history checks with Node.js installed:

```sh
node --experimental-default-type=module tests/test_game.mjs
```

## Exercise bank

- **155 grammar rules**, with **10 exercises each**: **1,550 distinct Chinese sentences**.
- Every exercise has an English prompt, expected Chinese, tone-marked pinyin, English meaning, and a predefined accepted-answer list.
- Every rule has a pattern and an English explanation.
- Every exercise links **three other examples of its rule** for feedback, each with Chinese, pinyin, and English. These are drawn from the same ten-example pool and never include the question just answered.
- 51 review rules, 73 core rules, and 31 advanced rules (stored as `stretch`). These are editorial labels for this learner, not official HSK assignments. Vocabulary is not limited to an official HSK 4 list.

The beginner set adds **20 beginner-focused rules and 200 examples** with short sentences and everyday vocabulary: identity, possession, questions, likes, ordering, age, time, and simple activities. Select **Beginner** for easier practice, or choose **Everyday basics** in the grammar library to find the new rules.

The advanced set adds **30 rules and 300 examples** covering nuanced conditions, concessions, rhetorical questions, formal reasoning, and emphatic necessity. Select **Advanced** in practice, or **Advanced patterns** in the grammar library. This set is intended as a step beyond the intermediate material, not an official HSK 5/6 syllabus. The existing stretch rule is also available in Advanced practice.

Read the [complete study guide](content/study-guide.md), use the [JSON dataset](content/grammar-exercises.json), or inspect the [validation report](content/validation-report.json).

## Content format

`rules[]` contains `id`, `title`, `category`, `difficulty`, `pattern`, `explanation`, and `exercises[]`. An exercise looks like:

```json
{
  "id": "grammar-007-01",
  "prompt_english": "I am going to Shanghai tomorrow.",
  "expected": {
    "chinese": "我明天去上海。",
    "pinyin": "wǒ míng tiān qù shàng hǎi.",
    "english": "I am going to Shanghai tomorrow."
  },
  "accepted_answers": ["我明天去上海。", "明天我去上海。"],
  "feedback_example_ids": ["grammar-007-02", "grammar-007-04", "grammar-007-07"]
}
```

The browser can load the JSON as a static asset without an API key or runtime AI service. Show the English prompt and target pattern before submission. After submission, display `expected`, the parent rule's `explanation`, and the `expected` fields of the three referenced examples.

For comparison, normalize both input and accepted answers with Unicode NFKC, remove whitespace and Unicode punctuation, and preserve all other characters and word order. The Python reference implementation is `normalize_answer` in `scripts/validate_content.py`. Do not strip grammatical particles or reorder words automatically.

Accepted answers are finite: there are 1,658 listed answers, including each canonical answer. An unlisted translation may still be correct. The game should describe an unmatched answer as **“Not in the accepted answer list”**, rather than claim that every mismatch is a grammar error. Handling disputed answers before deducting lives is handled by the game.

## Editing and rebuilding

Original bilingual material lives in nine files under [content/source](content/source). A block starts with `# Title | Pattern | Difficulty`, followed by one explanation line and ten `Chinese|English` lines. Append explicit alternatives with `||Chinese alternative`. Blank lines separate rules. Files, rules, and examples currently receive IDs by their order; preserve existing order and append new material after existing material to keep IDs stable.

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-content.txt
.venv/bin/python scripts/build_content.py
python3 scripts/validate_content.py
.venv/bin/python -m unittest discover -s tests
.venv/bin/python scripts/build_content.py --check
```

Pinyin generation uses the pinned `pypinyin` dependency with contextual reading corrections. The convention is lowercase, tone-marked, and spaced by syllable, with dictionary tones for 一 and 不 rather than spoken tone changes. Neutral tones are unmarked; suffix 儿 is shown separately as `er`. This is a pronunciation aid, not word-segmented orthography or an audio transcription.

The validator checks minimum counts, identifiers, required fields, pinyin coverage, duplicate questions within each rule, accepted-answer integrity, and feedback references. Tests check rejection of damaged content and known ambiguous readings. This is an original authored draft with structural validation and targeted pronunciation checks; it has not had independent linguistic review.
