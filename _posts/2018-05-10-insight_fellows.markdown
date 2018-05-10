---
layout: post
comments: true
title:  "Analysis of Insight Data Science Fellows"
excerpt: "Insight Data Science is a very popular fellowship for people finishing their PhDs and going into data analytics. I wanted to get a better sense of where their fellows came from and ended up, so I scraped some data from the Insight website and analyzed it here."
date:   2018-05-10 00:00:00
mathjax: true
---

The [Insight Data Science Fellows program](https://www.insightdatascience.com/) is a highly sought-after post-doctoral training fellowship to help PhD graduates find a good job in data science. I was curious about the background of the fellows (e.g. how many are from UC San Diego? Neuroscience?) and where they ended up. I couldn't find any aggregated information about them, so I scraped their [list of fellows](https://www.insightdatascience.com/fellows) and summarized them in the following figures ([see Jupyter Notebook](LINK TBD)).

## Insight fellows dataset overview

For each fellow, we scraped 5 features:

1. Academic field (e.g. Physics)
2. Last academic position (PhD or Postdoc)
3. Academic institution (e.g. UC San Diego)
4. Title (e.g. Senior data scientist)
5. Company (e.g. Twitter)
6. Insight project title (e.g. "Parental Guidance: Finding Yelp reviews written by parents")

In total, I scraped 794 fellows (just over half of Insight's advertised >1400 fellows). I was unable to get academic backgrounds of 68 of these fellows because of difficult in parsing their descriptions, leaving 726 fellows to analyze. Of these fellows, 65% recently finished a PhD and 29% are recovering from a postdoc. 18% of the fellows went on into senior data science positions.

<div class="imgcap">
<img src="/assets/insightfellows/companies.png" height="800">
<div class="thecap"><b>Figure 1.</b> Number of fellows at each company that has hired at least 3 fellows.</div>
</div>

<div class="imgcap">
<img src="/assets/insightfellows/academicfields.png" height="400">
<div class="thecap"><b>Figure 2.</b> Number of fellows coming from each academic field.</div>
</div>

<div class="imgcap">
<img src="/assets/insightfellows/universities.png" height="800">
<div class="thecap"><b>Figure 3.</b> Number of fellows from each university with at least 5 fellows.</div>
</div>

<div class="imgcap">
<img src="/assets/insightfellows/wordcloud.png" height="400">
<div class="thecap"><b>Figure 2.</b> Number of fellows coming from each academic field.</div>
</div>

## Relationships between fellows background and data science position

I was curious if there were any correlations between where a fellow came from and where they ended up (e.g. does a certain company tend to recruit from a certain field?). To analyze this, I created [crosstabs](https://chrisalbon.com/python/data_wrangling/pandas_crosstabs/) between each pair of fellow features and analyzed whether there were any potentially significant biases. I came up with the following preliminary hypotheses. Because I tested hundreds of potential hypotheses, and these effects are generally small, claims of statistical significance would not be valid here.

Differences between fellows with and without postdocs:

1. Senior positions are more likely to be obtained by fellows with post docs (22%, 47/211) than fellows just with PhDs (17%, 78/472).
2. Postdocs disproportionately analyzed Twitter in their Insight project (14/211, 7%) compared to PhD fellows (11/472, 2%)
3. Fellows from NYU disproportionately tend to be postdocs (11/22, 50% compared to 27% baseline)
4. Neuroscience fellows are more likely to be postdocs (43/102, 42%), while social science and engineer fellows are less likely to be postdocs (16% and 15%, respectively)

Other observations included:
1. NYU, UC Davis, and U Penn fellows are disproportionately from neuroscience.
2. Fellows from Caltech disproportionately have senior positions (7/10 vs. 18% baseline)
3. Fellows whose project names contain the word "find" are disproportionately likely to come from Harvard or Columbia and go to StitchFix or Yelp
4. Fellows from biology are disproportionately likely to have senior data science positions (22%), while those from Math are less likely (10%)
5. Neuroscientists disproportionately work at Insight Data Science. Square disproportionately takes physicists, and Facebook samples roughyl equally from all fields.
6. Fellows going to Facebook and Gartner rarely have senior positions, while those at Insight Data Science always have senior positions, and ~50% fellows at Netflix and ~35% of fellows at LinkedIn have senior positions.