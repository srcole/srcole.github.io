---
layout: post
is_data: "yes"
comments: true
title:  "Metro door opening durations - Cross-city comparison"
excerpt: "Riding the metro in Mexico City, I immediately noticed how briefly their doors open at the stops. So I collected some data to compare this more quantitatively with the metro I take at home, BART."
date:   2022-06-11 00:00:00
mathjax: true
---

Riding the metro in Mexico City, I was struck by how briefly their doors open at the stops. So I began measuring the number of seconds the doors remained open, and I repeated the measurement in San Francisco over the course of a month to collect the data shown below.

<div class="imgcap" style="text-align:center">
<img src="/assets/misc/metro_door_hist_cdmx_bart.png" height="400">
<div class="thecap" style="text-align:center"></div></div>

The doors of the metro in Mexico City are open much more briefly at their stops compared to the BART in San Francisco (medians: 10s vs. 28s).

### Data collection methodology

A Google Pixel 3 with Google Sheets was installed for easy data entry. At each new stop, immediately after the doors began to open, the time on a Mobvoi Ticwatch Pro 3 was noted, in seconds-resolution. This process was repeated when the doors began to close, and the time difference was recorded as the number of seconds the doors were open at that stop in this [Google Sheet](https://docs.google.com/spreadsheets/d/1kkpbr0-V_IrsJvXUU5q6A7tsmhUxP02Bj3-C4KWcIrA/edit?usp=sharing).

### Future analysis

It could be interesting to look into some further relationships, such as:
- time of day effect (and relative to rush hour)
- metro line and direction effect
- particular stops (e.g. transfer points) effects
- autocorrelations in stop duration

It would likely help to collect more data to make any of these claims with confidence.
