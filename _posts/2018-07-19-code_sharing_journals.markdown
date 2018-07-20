---
layout: post
comments: true
title:  "Estimating the prevalence of code sharing in scientific research"
excerpt: "I scraped over 100,000 full-text articles from the Pub Med API to estimate how common code sharing is across different journals."
date:   2018-07-19 00:00:00
mathjax: true
---

Science and scientific peer review are often superficially assumed to be rigorous, particularly by non-scientists. Therefore, it’s strange that it’s not standard practice to share all code and data needed to reproduce scientific publications. This is pretty troubling, as I’ve found significant bugs in my scripts in the late stages of my analysis soon before submitting to peer review, and I doubt I'm in a small minority here. I worry that someone will find a bug in our shared code that would warrant a retraction. This is an understandable reason why many aren’t so inclined to make their code and data easily accessible. Regardless, transparent code sharing is the right thing to do, and so I was curious in quantifying how often code is in fact shared ([see code](https://github.com/srcole/codesharing)).

To do this, I scraped the full text of 173,979 papers published since 2014 from 20 journals (see counts in table at bottom). I then approximately determined the subset of these papers that wrote custom software by narrowing the analysis only to papers that contained the strings “matlab” or “python” (Figure 1).

<div class="imgcap">
<img src="/assets/codesharing/code_mentions.png" height="600">
<div class="thecap" style="text-align:center"><b>Figure 1.</b> Proportions of articles that putatively used MATLAB or python in their analysis. Note that this is almost certainly an underestimate, as many papers may only mention the programming language in the supplement, if at all. Especially for journals like PNAS and Science which have most of the methods in the supplement.</div>
</div>

My first-pass estimate for code sharing was checking if “github” appeared in the paper text. Using this estimate, Figure 2 shows considerable variance across journals (Figure 2).

<div class="imgcap">
<img src="/assets/codesharing/github_mentions.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 2.</b> Proportions of articles that putatively shared code via GitHub. Analysis was restricted to articles containing the string “matlab” or “python.”</div>
</div>

In order to assess how accurate the “github” surrogate is for code sharing, text surrounding the keywords “github”, “open”, “code”, “matlab”, and “python” were extracted from the 200 putative MATLAB/python articles in PNAS and Nature Methods. I then wrote a script to loop through all of this extracted text and label each article as sharing code or not (googling the articles when clarification was necessary). Nearly all of the “github” articles were confirmed to share code (52/53), and 29 articles shared code outside of GitHub. Therefore, to estimate the prevalence of code sharing in Figure 3, I increased the number of articles containing “github” by 50%.

<div class="imgcap">
<img src="/assets/codesharing/sharing_estimates.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 3.</b> Proportions of articles that putatively shared code across journals.</div>
</div>

I fully acknowledge that this is an imperfect estimate of code sharing, but it seems a reasonable compromise given limitations in time and NLP. I further found that python researchers were more likely to share code via GitHub compared to MATLAB researchers (Figure 4), and code sharing has been increasing steadily each year since 2014 (Figure 5).

<div class="imgcap">
<img src="/assets/codesharing/sharing_matlab_python.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 4.</b> Papers based on python code are more likely to share code via github compared to papers using MATLAB code.</div>
</div>

<div class="imgcap">
<img src="/assets/codesharing/sharing_time.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 5.</b> Code sharing has been steadily increasing since 2014.</div>
</div>

It’s interesting to see how the different journals stack up in terms of code sharing. Especially since some of these (Nature family, PNAS) require statements of code / data availability. However, a recent study showed that less than half of authors (of 2011-2012 Science articles) fulfilled requests for code and data sharing [Stodden et al., PNAS, 2018](http://www.pnas.org/content/115/11/2584). Due to its automation, this current analysis allowed a broader scope, though of course has its share of limitations. In the future, I’m hoping to expand this to study data sharing across fields and institutions (this data is already scraped with the [current code](https://github.com/srcole/codesharing)). If anyone else is interested in working on this, I’ll happily send you the data already scraped.

<div class="imgcap">
<img src="/assets/codesharing/article_counts_table.png" height="600">
<div class="thecap" style="text-align:center"><b>Table 1.</b> Number of articles scraped from each journal.</div>
</div>
