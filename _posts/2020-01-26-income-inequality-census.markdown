---
layout: post
comments: true
title:  "Income inequality in USA, visualized"
excerpt: "I had heard that “income inequality is getting worse,” but I never really had a quantified perspective of it. Therefore, I downloaded some data from the Census and visualized it here"
image: /assets/income-inequality/4a_Income distribution - all races.png
date:   2020-01-26 00:00:00
mathjax: true
---

Income inequality is one of the biggest problems in our society. It’s pretty messed up that there are so many people struggling to meet basic needs and having a hard life, while many of us live in relative luxury because we were lucky enough to be inclined in the skills that industries value (and/or be born into wealthy families).

I had heard that “income inequality is getting worse,” but I never really had a quantified perspective of it. Therefore, I downloaded some [data from the Census Bureau](https://www.census.gov/data/tables/2019/demo/income-poverty/p60-266.html) and visualized it below. Overall, it seems like "the rich get richer, and the poor <strike>get poorer</strike> stay about the same." The most prominent trends are:
- The 90th percentile of households now earn 13x that of the 10%, and 3x that of the median household.
- Over the past 40 years, incomes have increased more rapidly (in both relative and absolute terms) for the more wealthy households.
    - While the inflation-adjusted income of the 90th percentile has increased 14% in the past 10 years, the income of the 10th percentile of the population has only increased by 3%.
- The official poverty rate has fluctuated over the past 40 years between 12% and 15%, and as of 2018, we are in a relatively good period (11.8% poverty rate).
- The southern states have the greatest rates of poverty (Louisiana and Mississippi have poverty rates of 20%). New Hampshire has the lowest poverty rate (6%).
- The rates at which the median household income has improved from 2008 to 2018 varies by race (hispanic: +16%, asian +13%, white +9%, black +4%). The same trend holds for mean income, but the percentages are increased.

Visualizations were created in python from raw spreadsheets downloaded from teh Census website with [this notebook](https://github.com/srcole/qwm/blob/master/misc/Income%20Inequality%20Visualizations.ipynb)

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/1_Historical income percentiles.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 1.</b> Change in the income levels of the 10th, 20th, 50th, 90th, and 95th percentiles of US households over the past 50 years. Amounts were adjusted for inflation by the Census Bureau.</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/2_Historical income inequality ratios.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 2.</b> Historical changes in the ratios of annual income between different percentiles of US households. A value of 1 would indicate that the two percentiles earn the same (i.e. everyone between these percentiles earned the same amount). A value of 10 indicates e.g. in 1986, the 90th percentile of households earned 10x as much as the 10th percentile of households (blue line).</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/4a_Income distribution - all races.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 3.</b> Historical changes in the distribution of households in each income bracket over the past 40 years. Amounts were adjusted for inflation by the Census Bureau. Note that in 2018, 30% of US households earn at least $100,000 per year. That is more than I expected. Still, 40% of US households earn less than $50,000 per year, and 10% earn less than $15,000 per year. Hopefully this will improve.</div>
</div>

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/5_Historical poverty rates.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 4.</b> Fluctuation in the official poverty rate across US households over the past 35 years.</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/6_Poverty rates by state.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 5a.</b> Poverty rate in each US state, averaged across 2016, 2017, and 2018 figures. Louisiana and Mississippi had the highest poverty rates: 20%. New Hampshire had the lowest poverty rate: 6%. See rates ranked by each state below.</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/6b_Poverty rates by state bar.png" height="600">
<div class="thecap" style="text-align:center"><b>Figure 5b.</b> Poverty rate in each US state, averaged across 2016, 2017, and 2018 figures. Same data as figure above.</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/income-inequality/3_Median income by race.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 6.</b> Median income of households of each race over the past 30 years. Amounts were adjusted for inflation by the Census Bureau.</div>
</div>
&nbsp;
&nbsp;
