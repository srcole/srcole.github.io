---
layout: post
is_data: "yes"
comments: true
title:  "A web app for studying traditional Chinese characters"
excerpt: "I made a small quiz to practice recognizing traditional Chinese characters and recalling their simplified forms."
date:   2026-08-30 00:00:00
---

I have been studying Mandarin and wanted a quick way to practice the characters that differ between traditional and simplified Chinese. So I made a small browser game that shows a traditional character and asks me to type its corresponding simplified form.

For example:

- 這 → 这 (this)
- 國 → 国 (country)
- 學 → 学 (to learn)
- 會 → 会 (can / will)

The quiz gives immediate feedback with the correct character, pinyin, and English definition. It also keeps track of accuracy while you play. You can optionally filter the character list by priority or by how well you already know each character, and download a CSV of your results when you finish.

Try it here: [Traditional → Simplified Chinese character study game](/trad_char_study_web_app/).

The game runs entirely in the browser, with the character data loaded from a CSV file, so there is no account or server required.
