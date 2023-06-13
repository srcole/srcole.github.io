---
layout: post
is_data: "yes"
comments: true
title:  "I Think You Should Leave Skit Ranking: A systematic review and meta-analysis"
excerpt: "Multiple websites have ranked the best skits in “I Think You Should Leave.” I aggregated them into a spreadsheet along with my own ratings, and produced some figures and tables, including aggregate rankings and the most underrated and overrated skits."
date:   2023-06-12 00:00:00
mathjax: true
---

Multiple websites have ranked the best skits in “I Think You Should Leave.” I wanted to analyze them a bit and compare those rankings to my own opinions. The plots and tables below show a few different rankings of all the skits from Seasons 1-3. I aggregated the data [in this spreadsheet, which you can contribute your own rankings to](https://docs.google.com/spreadsheets/d/14fAxECkTVpWwCB2a0MqUP28LANK0MIq1HWnNPgaDoPg/). Plots were generated using [this Colab Notebook](https://colab.research.google.com/drive/1jrhSKnAaAGnnhRadHBMmz0XTZjrHlqxE).

<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/itysl_ranking_v2.png" height="1200">
<div class="thecap" style="text-align:center">Figure 1. Ranking of all “I Think You Should Leave” skits from Seasons 1-3. Rankings were created by two websites (Consequence and Indie Wire) and myself.</div></div>


<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/ranking_mine.png" height="300">
<div class="thecap" style="text-align:center">Table 1. Top 10 skits, according to my rankings</div></div>


<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/ranking_aggregate.png" height="300">
<div class="thecap" style="text-align:center">Table 2. Top 10 skits, averaging across all rankings.</div></div>


<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/underrated.png" height="300">
<div class="thecap" style="text-align:center">Table 3. Most underrated skits from seasons 1-2, according to my rankings.</div></div>


<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/overrated.png" height="300">
<div class="thecap" style="text-align:center">Table 4. Most overrated skits from seasons 1-2, according to my rankings.</div></div>


<div class="imgcap" style="text-align:center">
<img src="/assets/itysl/itysl_skit_counts.png" height="300">
<div class="thecap" style="text-align:center">Figure 2. There were 3-5 skits per episode. 29 skits in season 1 and 27 skits each in seasons 2 and 3.</div></div>


## Some other stats
- Season 2 skits were ranked the best, with an average rank of 34. Followed by season 1 (average rank = 43) and season 3 (average rank = 49).
- Skits starring Tim Robinson were more highly ranked than those that did not
  - Top 5 episodes: 100% Tim Robinson
  - Top 10 episodes:  80% Tim Robinson
  - Top 50% episodes:  71% Tim Robinson
  - Bottom 50% episodes:  49% Tim Robinson
  - Bottom 10 episodes:  30% Tim Robinson
- The best episode was Season 2, Episode 4, according to my rankings
  - My Wife (#8)
  - Blues Brothers (#9)
  - Calico Cut Pants (#2)
- The best episode was Season 3, Episode 4, according to my rankings
  - I’d Wanna be Mike (#49)
  - Pacific Proposal Park (#82)
  - Gelutol (#56)
  - Farewell Ronnie (#78)
  - Shirt Brothers (#39)
- Most underrated skit from season 3: “Dog-eared hair”. 
  - My rank: #14, average rank: #51
- Most overated skit from season 3: “Pacific Proposal Park”. 
  - My rank: #82, average rank: #50

## Data sources
You can easily load the data yourself in python by running: `pandas.read_csv('https://docs.google.com/spreadsheets/d/1ohrGvph_ALF7NICLiDsa3g-ZnNKUhcDC1DpLdYC7jrE/export?format=csv')`. It includes my own rankings and those from 6 websites:
- https://consequence.net/2023/06/i-think-you-should-leave-sketches-ranked-tim-robinson/12/ 
- https://www.indiewire.com/gallery/i-think-you-should-leave-sketches-ranked-tim-robinson-best/i-think-you-should-leave-season-2-capital-room-sketch/ 
- https://www.polygon.com/23737241/every-i-think-you-should-leave-sketch-ranked-best-to-worst-itysl 
- https://variety.com/lists/best-i-think-you-should-leave-sketches/drive-thru-pay-it-forward-season-3-episode-3/ 
- https://www.looper.com/1122605/the-12-best-i-think-you-should-leave-sketches-ranked/ 
- https://comicbook.com/tv-shows/news/i-think-you-should-leave-best-skits-netflix-tim-robinson/ 
