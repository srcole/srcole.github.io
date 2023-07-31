---
layout: post
is_data: "yes"
comments: true
title:  "Black Mirror episode ranking analysis"
excerpt: "Several websites have ranked all of the episodes in Seasons 1-6 of Black Mirror. I aggregated them into a spreadsheet along with my own ratings, and produced some figures and tables, including aggregate rankings and the most underrated and overrated skits."
date:   2023-07-31 00:00:00
mathjax: true
---

Several websites have ranked all of the episodes in Seasons 1-6 of Black Mirror. Similar to [my analysis of “I Think You Should Leave” skits](https://srcole.github.io/2023/06/12/itysl-skit-rankings/), I wanted to analyze these rankings and compare them to my own opinions. The plots and tables below show some insights into the Black Mirror episode rankings, generated from the data I aggregated [in this spreadsheet, which you can contribute your own rankings to](https://docs.google.com/spreadsheets/d/1E13g2qMW_h0FzHO_P-iRy_6gUMmGuoSR1eL2Hi9TFg8/edit#gid=0). Plots were generated using [this Colab Notebook](https://colab.research.google.com/drive/1FUGDC6L-Sq_c0KUh95BpGG0wOuhaxJBG).

## Top-ranked episodes

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/episode_ranks.png" height="520">
<div class="thecap" style="text-align:center">Figure 1. Ranking of all Black Mirror episodes from seasons 1-6, sorted by average ranking.</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/rank_corrs.png" height="450">
<div class="thecap" style="text-align:center">Figure 2. Correlation matrix of different rankings, sorted by their correlation with Mashable’s Dread ranking.</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/top10_avg.png" height="250">
<div class="thecap" style="text-align:center">Table 1. Top 10 episodes, according to average rankings</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/top10_me.png" height="250">
<div class="thecap" style="text-align:center">Table 2. Top 10 episodes, according to my rankings</div></div>
&nbsp;
&nbsp;

## Most underrated, overrated, & polarizing episodes

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/top10_overrated.png" height="250">
<div class="thecap" style="text-align:center">Table 3. Top 10 most over-rated episodes, according to my rankings.</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/top10_underrated.png" height="250">
<div class="thecap" style="text-align:center">Table 4. Top 10 most under-rated episodes, according to my rankings.</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/top10_polarizing.png" height="250">
<div class="thecap" style="text-align:center">Table 5. Top 10 most polarizing episodes, as measured by the standard deviation of all rankings.</div></div>
&nbsp;
&nbsp;

## Correlations

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/overrated_by_dread.png" height="300">
<div class="thecap" style="text-align:center">Figure 3. Correlation between Mashable’s ranking of episodes by dread, and my metric of over-ratedness, measured as the difference between my ranking and the average ranking. Episodes that are less dreadful tend to be more overrated  (Spearman rho = -0.40, un-corrected p-value = 0.04).</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/rank_by_date.png" height="300">
<div class="thecap" style="text-align:center">Figure 4. Weak correlation between the ranking of an episode and when it was released: episodes released longer ago tend to have a better ranking (Spearman rho = 0.37, un-corrected p-value = 0.06).</div></div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/blackmirror/avg_by_season.png" height="300">
<div class="thecap" style="text-align:center">Table 6. Average episode ranks by season.</div></div>

## Data sources
You can easily load the data yourself in python by running: `pandas.read_csv('https://docs.google.com/spreadsheets/d/13jl1yrwu4W-zL0i_avoNzVBDtbBRzUmKKTjLIHfJopE/export?format=csv&gid=0')`. It includes my own rankings and those from 9 websites:
- [https://ew.com/tv/black-mirror-episodes-ranked/](https://ew.com/tv/black-mirror-episodes-ranked/)
- [https://www.vulture.com/2016/10/every-black-mirror-episode-from-worst-to-best.html](https://www.vulture.com/2016/10/every-black-mirror-episode-from-worst-to-best.html)
- [https://www.radiotimes.com/tv/sci-fi/best-black-mirror-episodes/](https://www.radiotimes.com/tv/sci-fi/best-black-mirror-episodes/)
- [https://editorial.rottentomatoes.com/article/black-mirror-best-episodes/](https://editorial.rottentomatoes.com/article/black-mirror-best-episodes/)
- [https://www.denofgeek.com/tv/black-mirror-ranking-every-episode/](https://www.denofgeek.com/tv/black-mirror-ranking-every-episode/)
- [https://www.indiewire.com/features/best-of/best-black-mirror-episodes-worst-netflix-ranked-1201897973/](https://www.indiewire.com/features/best-of/best-black-mirror-episodes-worst-netflix-ranked-1201897973/)
- [https://www.imdb.com/search/title/?series=tt2085059&sort=user_rating,desc&count=250&view=simple](https://www.imdb.com/search/title/?series=tt2085059&sort=user_rating,desc&count=250&view=simple)
- [https://www.pastemagazine.com/tv/black-mirror/black-mirror-episodes-ranked](https://www.pastemagazine.com/tv/black-mirror/black-mirror-episodes-ranked)
- [https://mashable.com/article/black-mirror-pessimism-ranking-dread](https://mashable.com/article/black-mirror-pessimism-ranking-dread)
