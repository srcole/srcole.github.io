---
layout: post
is_data: "yes"
comments: true
title:  "Historical analysis of FIRE strategies"
excerpt: "On r/FIRE, there are common questions about 'Is $X enough to retire?'. I analyzed some historical inflation and SPY return data to get a sense of how often different retirement strategies succeed."
date:   2024-09-01 00:00:00
mathjax: true
---

In the financial independence subreddit, [r/FIRE](https://www.reddit.com/r/Fire/), it's common for users to ask "Is $X enough to retire?". I analyzed some historical inflation and SPY return data to get a sense of how often different retirement strategies succeed.
- The retiree sets a withdrawal rate tha they want to live on (e.g. 4%, $40k if initial investment is $1M).
- The withdrawal amount each year is increased based on inflation.
- The retiree has all funds invested in SPY, which would not be the case for conservative investors.
- Data used was obtained from [officialdata.org](https://www.officialdata.org/us/stocks/s-p-500/1900) and can be found in [this sheet](https://docs.google.com/spreadsheets/d/1D7-i4j74_lF5XtWsIOmZEGU0QBdWIbo15ZaWWAYGfP8/edit?usp=sharing).
- [Google Colab notebook](https://colab.research.google.com/drive/1IwDgsjDsFpeG-VlyleHIoAJwGBQ7sjLa?authuser=0&pli=1#scrollTo=fUBVDQf5AOoU) with python code of simulation and visualization

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/bankrupt.png" height="500">
<div class="thecap" style="text-align:center">Figure 1. What is the chance of going backrupt after X years of retirement if a budget is set based on an initial withdrawal rate? By simulating retirement in each year, this plot summarized in what % of those retirements, you would have gone bankrupt after X years.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/retire_1995_performance.png" height="350">
<div class="thecap" style="text-align:center">Figure 2. If retired in 1995 with a 4% withdrawal rate, what would the performance look like year-to-year? Pretty solid. Even more buffer room after 30 years of retirement!</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/retire_1995_annual_change.png" height="350">
<div class="thecap" style="text-align:center">Figure 3. If retired in 1995 with a 4% withdrawal rate, what would your spending and returns be each year?</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/retire_30years_performance.png" height="350">
<div class="thecap" style="text-align:center">Figure 4. If retired with a 4% withdrawal rate, what would be your balance at the end of 30 years for each retirement year X?</div></div>

&nbsp;

## Motivation

A key motivation for this analysis is that common advice is based on average market returns, but the market is very nonstationary, so results will vary wildly depending on the exact timing. To get a better idea of the spectrum of outcomes, I essentially simulated retirement at the beginning of each year back in time to see in which scenarios gains could outpace spending.

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/below_start.png" height="500">
<div class="thecap" style="text-align:center">Figure 5. Same as Figure 1, but % of years end up with less equity than started.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/below_start_infladj.png" height="500">
<div class="thecap" style="text-align:center">Figure 6. Same as Figure 1, but % of years end up with less equity than started, inflation-adjusted.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/spy_monthly_returns.png" height="750">
<div class="thecap" style="text-align:center">Figure 7. SPY monthly returns. Didn't find much of a month-of-year effect.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/spy_returns_5years.png" height="200">
<div class="thecap" style="text-align:center">Figure 8. Historical performance of SPY returns after 5 years.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/spy_returns_10years.png" height="200">
<div class="thecap" style="text-align:center">Figure 9. Historical performance of SPY returns after 10 years.</div></div>

&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/fire/spy_returns_20years.png" height="200">
<div class="thecap" style="text-align:center">Figure 10. Historical performance of SPY returns after 20 years.</div></div>
