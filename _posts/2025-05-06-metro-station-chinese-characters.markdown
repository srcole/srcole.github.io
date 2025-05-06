---
layout: post
is_data: "yes"
comments: true
title:  "Most frequent Chinese characters appearing in metro station names"
excerpt: "When I arrive in a new Chinese city, one problem I have is not knowing how to read the names of the metro stations I need to go to. I scraped a few thousand station names from Wikipedia to familiarize myself with the most frequent characters."
date:   2025-05-06 00:00:00
mathjax: true
---

When I arrive in a new Chinese city, one problem I have is not knowing how to read the names of the metro stations I need to go to. So I scraped a 3,237 station names across 14 cities from Wikipedia to familiarize myself with the most frequent characters.

## Plots

There are 3 plots below, which show both the most frequent character and also character combinations. The plots are limited to the top characters that appear the most, but you can see the ranking of all characters in this [Google Sheet](https://docs.google.com/spreadsheets/d/1Xo_OcRMchrhX_76FOtOD6B_XC6DdeySVhamcbJiOHoU/edit?gid=0#gid=0).

<div class="imgcap" style="text-align:center">
<img src="/assets/mandarin/metro_character_ranking_14metros.png" height="1200">
<div class="thecap" style="text-align:center"></div>Frequencies of individual characters that occur in at least 25 station names</div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/mandarin/metro_2char_combo_ranking_14metros.png" height="600">
<div class="thecap" style="text-align:center"></div>Frequencies of two-character combinations</div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/mandarin/metro_3char_combo_ranking_14metros.png" height="600">
<div class="thecap" style="text-align:center"></div>Frequencies of 3+ character combinations</div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/mandarin/metro_char_comparison_by_city.png" height="500">
<div class="thecap" style="text-align:center"></div>Top character frequency differences by city</div>

## Code
You can see this [Jupyter Notebook](https://github.com/srcole/mandarin_data/blob/main/01_metro_stations/03_wikipedia_scrape_all.ipynb) for how I:
1. Scraped and parsed the data from Wikipedia
2. Computed character and combination frequencies
3. Got the pinyin for the characters
4. Made the plots!