"""Compile original bilingual source sentences into the browser's static dataset."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypinyin import Style, lazy_pinyin, load_phrases_dict

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "content/grammar-exercises.json"

# Context-specific readings missing from the library's general dictionary.
# Keep dictionary tones for 一 and 不; do not mix in selective tone sandhi.
load_phrases_dict({
    "除非得到": [["chú"], ["fēi"], ["dé"], ["dào"]],
    "我都会": [["wǒ"], ["dōu"], ["huì"]],
    "她都会": [["tā"], ["dōu"], ["huì"]],
    "变长了": [["biàn"], ["cháng"], ["le"]],
    "没有倒": [["méi"], ["yǒu"], ["dǎo"]],
    "那张照片": [["nà"], ["zhāng"], ["zhào"], ["piàn"]],
    "饿肚子": [["è"], ["dù"], ["zi"]],
    "不适应": [["bù"], ["shì"], ["yìng"]],
    "长时间": [["cháng"], ["shí"], ["jiān"]],
    "想得到认可": [["xiǎng"], ["dé"], ["dào"], ["rèn"], ["kě"]],
    "不记得我": [["bù"], ["jì"], ["de"], ["wǒ"]],
    "没收到": [["méi"], ["shōu"], ["dào"]],
    "钱非还": [["qián"], ["fēi"], ["huán"]],
    "泄露密码": [["xiè"], ["lù"], ["mì"], ["mǎ"]],
    "我的哥哥": [["wǒ"], ["de"], ["gē"], ["ge"]],
    "牛奶和面包": [["niú"], ["nǎi"], ["hé"], ["miàn"], ["bāo"]],
    "米饭和面条": [["mǐ"], ["fàn"], ["hé"], ["miàn"], ["tiáo"]],
    "那只猫": [["nà"], ["zhī"], ["māo"]],
    "得": [["de"]],
    "得到": [["dé"], ["dào"]],
    "觉得": [["jué"], ["de"]],
    "记得": [["jì"], ["de"]],
    "地": [["de"]],
    "地方": [["dì"], ["fang"]],
    "地铁": [["dì"], ["tiě"]],
    "地图": [["dì"], ["tú"]],
    "地址": [["dì"], ["zhǐ"]],
    "地上": [["dì"], ["shàng"]],
    "地板": [["dì"], ["bǎn"]],
    "目的地": [["mù"], ["dì"], ["dì"]],
    "耐心地": [["nài"], ["xīn"], ["de"]],
    "买得到": [["mǎi"], ["de"], ["dào"]],
    "睡不着": [["shuì"], ["bù"], ["zháo"]],
    "长十厘米": [["cháng"], ["shí"], ["lí"], ["mǐ"]],
    "又长": [["yòu"], ["cháng"]],
    "选为": [["xuǎn"], ["wéi"]],
})


def pinyin(chinese: str) -> str:
    syllables = lazy_pinyin(chinese, style=Style.TONE, errors=lambda text: list(text))
    assert len(syllables) == len(chinese), f"Unexpected character alignment: {chinese}"
    for index, char in enumerate(chinese):
        # Phrase dictionaries sometimes bake in sandhi; enforce our stated convention.
        if char in {"一", "不"}:
            syllables[index] = {"一": "yī", "不": "bù"}[char]
        elif char == "儿" and index > 0 and chinese[index - 1] in "点会哪这那玩":
            syllables[index] = "er"
    result = " ".join(syllables)
    for original, replacement in {"。": ".", "，": ",", "？": "?", "！": "!", "；": ";", "：": ":"}.items():
        result = result.replace(original, replacement)
    return re.sub(r"\s+([.,?!;:])", r"\1", result).strip()


def compile_dataset() -> dict:
    rules = []
    for source in sorted((ROOT / "content/source").glob("*.txt")):
        category = source.stem.split("-", 1)[1]
        for block in source.read_text(encoding="utf-8").strip().split("\n\n"):
            lines = block.splitlines()
            assert lines[0].startswith("# "), (source, lines[0])
            title, pattern, level = [part.strip() for part in lines[0][2:].split("|")]
            rule_id = f"grammar-{len(rules) + 1:03d}"
            exercises = []
            for index, line in enumerate(lines[2:], start=1):
                primary, *alternatives = line.split("||")
                chinese, english = [part.strip() for part in primary.split("|")]
                accepted = list(dict.fromkeys([chinese, *(s.strip() for s in alternatives)]))
                exercises.append({
                    "id": f"{rule_id}-{index:02d}",
                    "prompt_english": english,
                    "expected": {"chinese": chinese, "pinyin": pinyin(chinese), "english": english},
                    "accepted_answers": accepted,
                    "feedback_example_ids": [],
                })
            for index, exercise in enumerate(exercises):
                exercise["feedback_example_ids"] = [
                    exercises[(index + offset) % len(exercises)]["id"] for offset in (1, 3, 6)
                ]
            rules.append({
                "id": rule_id,
                "title": title,
                "category": category,
                "difficulty": level,
                "pattern": pattern,
                "explanation": lines[1],
                "exercises": exercises,
            })
    return {
        "schema_version": "1.0.0",
        "language": "zh-Hans",
        "prompt_language": "en",
        "audience": "Beginner through advanced learners; everyday basics, intermediate practice, and advanced sentence patterns",
        "level_system": "Editorial review/core/stretch labels (foundation/intermediate/advanced in the game); not an official HSK grammar or vocabulary mapping",
        "content_status": "Original authored draft with automated structural validation; no independent linguistic review",
        "pinyin_convention": "Lowercase tone-marked syllables separated by spaces; dictionary tones for 一 and 不; neutral tones unmarked; 儿 shown as a separate er syllable. Generated with pypinyin and contextual overrides, not phonetic audio transcription.",
        "answer_policy": {
            "mode": "predefined_allowlist",
            "normalization": "NFKC; remove Unicode whitespace and punctuation only; preserve Chinese characters and word order",
            "canonical_answer_included": True,
            "exhaustive": False,
            "show_target_pattern_before_answering": True,
            "unmatched_answer_label": "Not in the accepted answer list",
            "note": "An unmatched answer may still be a valid translation. Do not equate allowlist mismatch with proven grammatical error. Scoring and lives behavior is for the game implementation to decide.",
        },
        "feedback_policy": "After submission, show expected Chinese, pinyin, English, the parent rule explanation, and the three referenced exercises as examples. References stay within the rule and exclude the submitted exercise; they may appear as practice questions in other rounds.",
        "counts": {
            "rules": len(rules),
            "exercises": sum(len(rule["exercises"]) for rule in rules),
            "minimum_exercises_per_rule": min(len(rule["exercises"]) for rule in rules),
            "feedback_examples_per_exercise": 3,
        },
        "rules": rules,
    }


def main() -> None:
    dataset = compile_dataset()
    rendered = json.dumps(dataset, ensure_ascii=False, indent=2) + "\n"
    guide = ["# Chinese grammar exercise bank", "",
             f"{dataset['counts']['rules']:,} rules · {dataset['counts']['exercises']:,} exercises · simplified Chinese · beginner through advanced", "",
             "Original draft; editorial levels are not official HSK assignments. Pinyin uses dictionary tones, with one space per syllable. Each numbered item is an English-to-Chinese exercise. The JSON also links three other examples of the same rule for feedback.", ""]
    for rule in dataset["rules"]:
        guide.extend([f"## {rule['id']}: {rule['title']}", "",
                      f"**{rule['difficulty']} · {rule['pattern']}**", "", rule["explanation"], ""])
        for index, exercise in enumerate(rule["exercises"], start=1):
            expected = exercise["expected"]
            guide.extend([f"{index}. {expected['english']}",
                          f"   - {expected['chinese']}", f"   - {expected['pinyin']}"])
            if len(exercise["accepted_answers"]) > 1:
                guide.append("   - Also accepted: " + " / ".join(exercise["accepted_answers"][1:]))
        guide.append("")
    artifacts = {OUTPUT: rendered, ROOT / "content/study-guide.md": "\n".join(guide)}
    if "--check" in sys.argv:
        for path, text in artifacts.items():
            if not path.exists() or path.read_text(encoding="utf-8") != text:
                raise SystemExit(f"{path.name} is stale. Run scripts/build_content.py.")
        print("Compiled JSON and study guide match authored sources.")
    else:
        for path, text in artifacts.items():
            path.write_text(text, encoding="utf-8")
            print(f"Wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
