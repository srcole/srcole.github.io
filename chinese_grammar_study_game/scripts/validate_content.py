"""Validate the static dataset without third-party or network dependencies."""

from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def normalize_answer(answer: str) -> str:
    return "".join(
        char for char in unicodedata.normalize("NFKC", answer)
        if not char.isspace() and not unicodedata.category(char).startswith("P")
    )


def validate(data: dict) -> dict:
    errors = []

    def require(condition: bool, message: str) -> None:
        if not condition:
            errors.append(message)

    rules = data["rules"]
    require(len(rules) >= 100, "At least 100 rules are required")
    all_ids = []
    all_chinese = []
    accepted_count = 0
    for rule in rules:
        rid = rule["id"]
        all_ids.append(rid)
        for key in ("title", "category", "pattern", "explanation"):
            require(bool(rule[key].strip()), f"{rid}: missing {key}")
        require(rule["difficulty"] in {"review", "core", "stretch"}, f"{rid}: difficulty")
        exercises = rule["exercises"]
        require(len(exercises) >= 10, f"{rid}: fewer than 10 exercises")
        by_id = {exercise["id"]: exercise for exercise in exercises}
        local_prompts = []
        local_answers = []
        for exercise in exercises:
            eid = exercise["id"]
            all_ids.append(eid)
            expected = exercise["expected"]
            chinese = expected["chinese"]
            english = expected["english"]
            pronunciation = expected["pinyin"]
            require(bool(re.search(r"[\u3400-\u9fff]", chinese)), f"{eid}: missing Chinese")
            require(bool(re.search(r"[A-Za-z]", english)), f"{eid}: missing English")
            require(not re.search(r"[\u3400-\u9fff]", pronunciation), f"{eid}: untranslated pinyin")
            han_count = len(re.findall(r"[\u3400-\u9fff]", chinese))
            syllables = re.findall(r"[^\W\d_]+", pronunciation, flags=re.UNICODE)
            require(len(syllables) == han_count, f"{eid}: pinyin syllable count {len(syllables)} != {han_count}")
            require(bool(re.search(r"[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]", pronunciation)), f"{eid}: no pinyin tone marks")
            require(exercise["prompt_english"] == english, f"{eid}: English translation mismatch")
            answers = exercise["accepted_answers"]
            require(chinese in answers, f"{eid}: canonical answer not accepted")
            normalized = [normalize_answer(answer) for answer in answers]
            require(len(normalized) == len(set(normalized)), f"{eid}: duplicate normalized accepted answers")
            require(all(re.search(r"[\u3400-\u9fff]", answer) for answer in answers), f"{eid}: non-Chinese accepted answer")
            refs = exercise["feedback_example_ids"]
            require(len(refs) == 3 and len(set(refs)) == 3, f"{eid}: need three distinct feedback examples")
            require(eid not in refs, f"{eid}: self-referencing feedback")
            require(all(ref in by_id for ref in refs), f"{eid}: feedback outside rule")
            local_prompts.append(english.casefold())
            local_answers.append(normalize_answer(chinese))
            all_chinese.append(chinese)
            accepted_count += len(answers)
        require(len(local_prompts) == len(set(local_prompts)), f"{rid}: repeated English prompt within rule")
        require(len(local_answers) == len(set(local_answers)), f"{rid}: repeated Chinese example within rule")
    require(len(all_ids) == len(set(all_ids)), "Duplicate IDs")
    require(len({rule["title"] for rule in rules}) == len(rules), "Duplicate rule titles")
    require(data["counts"]["rules"] == len(rules), "Incorrect rule count")
    require(data["counts"]["exercises"] == len(all_chinese), "Incorrect exercise count")
    require(data["counts"]["minimum_exercises_per_rule"] == min(len(r["exercises"]) for r in rules), "Incorrect minimum count")
    require(data["counts"]["feedback_examples_per_exercise"] == 3, "Incorrect feedback count")
    if errors:
        raise ValueError("\n".join(errors))
    return {
        "rules": len(rules),
        "exercises": len(all_chinese),
        "unique_chinese_sentences": len(set(all_chinese)),
        "accepted_answers": accepted_count,
        "feedback_references": len(all_chinese) * 3,
        "difficulty_counts": dict(Counter(rule["difficulty"] for rule in rules)),
        "checks": "Passed IDs, minimum counts, required content, pinyin coverage, within-rule uniqueness, canonical answer inclusion, and feedback integrity",
        "limitation": "Structural validation does not establish linguistic correctness or exhaustive accepted translations.",
    }


if __name__ == "__main__":
    data = json.loads((ROOT / "content/grammar-exercises.json").read_text(encoding="utf-8"))
    report = validate(data)
    (ROOT / "content/validation-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))
