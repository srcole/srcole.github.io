---
layout: post
comments: true
title:  "Analysis of 10,000+ fact checks on Politifact"
excerpt: "Politifact is a handy nonprofit organization that rates the truth value of political statements, mostly by American politicians. For this post, I scraped the results of their fact checking since their inception in 2007 and visualized some trends across time, space, and the political spectrum."
image: /assets/politifact/18_avg_truth_by_party_year.png
date:   2019-07-20 00:00:00
mathjax: true
---

[Politifact](https://www.politifact.com/truth-o-meter/) is a handy nonprofit organization that rates the truth value of political statements, mostly by American politicians. I scraped the results of their fact checking since their inception in 2007 and visualized some trends across time, space, and the political spectrum. You can see the notebooks used to scrape and visualize the data in [this GitHub repo](https://github.com/srcole/politifact-analysis). A "truth score" was computed for each fact check, on a 0-5 scale, using the following mapping: 0 - Pants on Fire!, 1 - False, 2 - Mostly False. 3 - Half True. 4 - Mostly True. 5 - True.

As with any data analysis, it's important to keep in mind the caveats and limitations of the results that follow. While I personally judge Politifact to be an unbiased source of truth, there is no certainty that these data are free of bias and that the standards have not changed over time.

<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/18_avg_truth_by_party_year.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 1.</b> Breakdown of the results by category for each person with at least 100 fact checks.\n\n</div>
</div>
<p></p>

<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/10_truth_breakdown_by_year.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 2.</b> Breakdown of truth results for facts checked each year. Unfortunately, it appears that politicians have been telling relatively more blatant lies relative to true statements. Despite the apparent correlation between the rise in "Pants on Fire!" statements and the start of Donald Trump's presidency, this graph remains essentially unchanged if we remove his data, as seen in [this figure](https://srcole.github.io/assets/politifact/11_truth_breakdown_by_year_noTrump.png).\n\n\n</div>
</div>
<p></p>

<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/19_most_truthful_and_least_truthful_people.png" height="600">
<div class="thecap" style="text-align:center"><b>Figure 3.</b> The average truth ratings for the 10 politicians with the highest (top) and lowest (bottom) average truth ratings. The bars are colored by political affiliation, as you would expect (Democrats are Blue. I sometimes get that mixed up.). Only politicians with at least 20 fact checks were considered.\n</div>
</div>
<p></p>

<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/7_breakdown_truth_by_person_most_checks.png" height="700">
<div class="thecap" style="text-align:center"><b>Figure 4.</b> Breakdown of the results by category for each person with at least 100 fact checks. We have an unexpected victor. Within the confidence range of Bernie and Barack though.</div>
</div>
<p></p>

<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/20_truth_by_state_and_party.png" height="600">
<div class="thecap" style="text-align:center"><b>Figure 5.</b> Average truth score for politicians that represent each state. In order to be considered, a politician needed to have at least 5 fact checks, and a state needed to have at least 5 affiliated politicians. Each red/blue dot is a single politician, and the grey dot and bars indicate the average and 95% confidence interval for that state. Lol Wisconsin.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/12_truth_breakdown_by_year_Trump.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 6.</b> Breakdown of the truthfulness of facts checked for Donald Trump each year since 2015. It appears that he's been speaking a relatively steady amount of bullshit over the years.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/5_avg_truth_by_person_most_checks.png" height="600">
<div class="thecap" style="text-align:center"><b>Figure A_1.</b> Average "truth score" across all facts checked by each person who had at least 100 fact checks.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/8_avg_truth_by_year.png" height="200">
<div class="thecap" style="text-align:center"><b>Figure A_2.</b> Average truth score for facts checked each year. Unfortunately, it appears to be declining as time goes on.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/1_n_checks_by_truth_category.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure A_3.</b> Number of fact checks that fell in each truth category. In total, I scraped 16,208 fact checks that were posted as of July 1, 2019.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/4_n_checks_per_month.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A_4.</b> Number of fact checks performed in each month. Notice the increase in fact checking preceding the November elections every 2 years.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/15_avg_truth_by_month.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A_5.</b> No apparent change in truthfulness over the year.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/16_avg_truth_by_weekday.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A_6.</b> No apparent change in truthfulness over the week.</div>
</div>



<div class="imgcap" style="text-align:center">
<img src="/assets/politifact/17_avg_truth_by_identity.png" height="240">
<div class="thecap" style="text-align:center"><b>Figure A_7.</b> Statements by people appear to be, on average, more reliable than those by political organization. And much more reliable than the facts checked about rumors on the internet.</div>
</div>
