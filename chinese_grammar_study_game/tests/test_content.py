import copy
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from build_content import pinyin
from validate_content import normalize_answer, validate


class ContentTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / "content/grammar-exercises.json").read_text(encoding="utf-8"))

    def test_dataset_is_complete(self):
        report = validate(self.data)
        self.assertGreaterEqual(report["rules"], 100)
        self.assertEqual(report["unique_chinese_sentences"], report["exercises"])

    def test_broken_feedback_is_rejected(self):
        damaged = copy.deepcopy(self.data)
        exercise = damaged["rules"][0]["exercises"][0]
        exercise["feedback_example_ids"] = [exercise["id"], "missing", "missing"]
        with self.assertRaisesRegex(ValueError, "self-referencing feedback"):
            validate(damaged)

    def test_missing_canonical_answer_is_rejected(self):
        damaged = copy.deepcopy(self.data)
        damaged["rules"][0]["exercises"][0]["accepted_answers"] = ["别的答案。"]
        with self.assertRaisesRegex(ValueError, "canonical answer not accepted"):
            validate(damaged)

    def test_incomplete_rule_is_rejected(self):
        damaged = copy.deepcopy(self.data)
        damaged["rules"][0]["exercises"].pop()
        with self.assertRaisesRegex(ValueError, "fewer than 10 exercises"):
            validate(damaged)

    def test_normalization_preserves_grammar(self):
        self.assertEqual(normalize_answer(" 我 明天去上海！\n"), normalize_answer("我明天去上海。"))
        self.assertEqual(normalize_answer("Ａ，Ｂ"), "AB")
        self.assertNotEqual(normalize_answer("我去了"), normalize_answer("我去"))
        self.assertNotEqual(normalize_answer("他都不去"), normalize_answer("他不都去"))

    def test_contextual_pinyin_readings(self):
        cases = {
            "除非得到": "chú fēi dé dào",
            "我都会": "wǒ dōu huì",
            "她都会": "tā dōu huì",
            "变长了": "biàn cháng le",
            "没有倒": "méi yǒu dǎo",
            "那张照片": "nà zhāng zhào piàn",
            "饿肚子": "è dù zi",
            "不适应": "bù shì yìng",
            "长时间": "cháng shí jiān",
            "想得到认可": "xiǎng dé dào rèn kě",
            "不记得我": "bù jì de wǒ",
            "没收到": "méi shōu dào",
            "钱非还": "qián fēi huán",
            "泄露密码": "xiè lù mì mǎ",
            "我的哥哥": "wǒ de gē ge",
            "牛奶和面包": "niú nǎi hé miàn bāo",
            "米饭和面条": "mǐ fàn hé miàn tiáo",
            "那只猫": "nà zhī māo",
            "说得好": "shuō de hǎo",
            "买得到": "mǎi de dào",
            "得到允许": "dé dào yǔn xǔ",
            "耐心地": "nài xīn de",
            "地图": "dì tú",
            "睡不着": "shuì bù zháo",
            "开着": "kāi zhe",
            "又长": "yòu cháng",
            "班长": "bān zhǎng",
            "选为": "xuǎn wéi",
            "一个": "yī gè",
            "不是": "bù shì",
            "一点儿": "yī diǎn er",
        }
        for chinese, expected in cases.items():
            with self.subTest(chinese=chinese):
                self.assertEqual(pinyin(chinese), expected)


if __name__ == "__main__":
    unittest.main()
