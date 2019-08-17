---
layout: default
mathjax: true
comments: true
title: Data science projects
permalink: /dataprojects/
---

## Projects

### 1. Burritos - [repo,](https://github.com/srcole/burritos) [blog,](https://srcole.github.io/100burritos/) [ignite talk,](https://www.youtube.com/watch?v=Hp6jFy4_bV4) [seminar1,](https://docs.google.com/presentation/d/1jVRM1Rng_km9Ycl2hcka82gfJ8n1m89kqcs3381M8Wg/edit?usp=sharing) [seminar2,](https://docs.google.com/presentation/d/1jBm4GFYtNnwSkALODX2CwXRmHQmVDrRoeF8cSG8tnDY/edit?usp=sharing) [poster,](https://srcole.github.io/assets/burrito/poster.pdf) [dashboard](https://sdburritos.herokuapp.com/)

I designed a 10-dimensional system to systematically rate burrito quality and applied this method to rate 350+ burritos (60+ restaurants, 70+ unique reviewers). I then analyzed the data to establish significant differences between rival taco shops, explore dimensionality reduction, and quantify inter-reviewer reliability. I made a couple dashboards using Tableau and Dash to explore taco shop ratings around San Diego. I also formatted the data into an [SQL database and demonstrated some example queries](https://github.com/srcole/burritos/tree/master/SQL%20practice).

### 2. Brain rhythms - [Papers,](https://scholar.google.com/citations?user=fZe7tcwAAAAJ&hl=en) [methods paper repo,](https://github.com/voytekresearch/Cole_2018_cyclebycycle) [lab toolbox,](https://github.com/voytekresearch/neurodsp) [coupling toolbox](https://github.com/voytekresearch/pacpy)

For my PhD research, I developed, implemented, and justified a fundamentally new approach to analyzing brain rhythms. Conventional analysis revolves around the Fourier transform, which decomposes brain signals as a sum of sine waves. However, these brain rhythms are often nonsinusoidal in shape, and so Fourier analysis does not well capture all the information in the signal. I [wrote a review paper](https://linkinghub.elsevier.com/retrieve/pii/S1364661316302182) that summarized past reports of potentially interesting nonsinusoidal phenomena, developed a python- and pandas-based framework for analyzing waveform shape ([methods paper](https://www.biorxiv.org/content/early/2018/04/16/302000) and [library](https://github.com/voytekresearch/neurodsp)), and applied it to uncover physiological information contained in waveform shape (paper in prep). Additionally, I [wrote a paper](http://www.jneurosci.org/content/early/2017/05/02/JNEUROSCI.2208-16.2017) demonstrating how a previous high-profile result was artifactual because it did not properly accounting for waveform shape.

### 3. Police officer misconduct - [Crime Lab New York](https://urbanlabs.uchicago.edu/labs/crime-new-york) internship

Using scikit-learn, I built and iterated among several machine learning models trained on police officer activity to predict the likelihood of complaints of excessive force. These models are designed to be incorporated in an early intervention system (EIS) used to efficiently allocate training or other resources in police departments. I also used lots of pandas and seaborn to visualize trends in police officer behavior and variance across districts.

### 4. Keystroke biometrics - [repo,](https://github.com/srcole/continu) [dashboard,](http://www.continu.site) [slides](http://bit.ly/continu-slides)

Keystroke patterns offer a unique biometric to identify individuals and authenticate them in a way that is difficult for malicious users to reproduce. As an Insight Data Science fellow, I worked with a project management fellow and a data engineering fellow towards a system to continuously authenticate users using their keystrokes. I trained a gradient boosting model in order to identify users with a 98% true positive rate and 98% true negative rate (recall), and designed a dashboard that a security team could use to visualize suspicious user activity.

### 5. Code sharing in neuroscience - [repo,](https://github.com/srcole/codesharing) [blog](https://srcole.github.io/2018/07/19/code_sharing_journals/)

I scraped the [PubMed API](https://www.ncbi.nlm.nih.gov/pmc/tools/developers/) to obtain the full text of around 170,000 articles from 20 different journals that publish neuroscience papers. I did some keyword searching in order to approximately determine which articles relied on custom-written scripts, and which articles publicly shared their code. This involved designing a tool to efficiently, semi-automatically, sift through 200 papers in order to validate the keyword-based estimates. Ultimately, I was able to see how journals vary in terms of code sharing and track how this has improved over time.

This project was expanded during a subsequent hackathon. [Our team improved and expanded the text mining to compute a measure of the openness of each journal ("O-Factor")](https://github.com/srcole/o-factor).

### 6. Flight delays - [repo,](https://github.com/srcole/flightdelay) [report](https://srcole.github.io/assets/flight_delay/report.pdf)

[Tom Donoghue](https://tomdonoghue.github.io/) and I analyzed a data set of 5 million domestic flights in 2015. We characterized different trends in the delays of flights and built several machine learning models to predict if flights would be significantly delayed.

### 7. Currency exchange prediction - [scraper,](https://github.com/srcole/fxml) [press](http://www.foxcarolina.com/story/18621418/clemson-students-made-40000)

In a past life, I was super interested in trying to predict fluctuations in financial markets. Back when I used MATLAB (cringe), I built some machine learning models (logistic regression, SVM, neural net) from scratch (thanks Andrew Ng!) to predict future trends of the Euro-Dollar exchange rate based on historical trends. At least I had the sense to use python to scrape very high quality (1-minute resolution!) historical data of the exchange rates of several currency pairs over several years.

### 8. Politifact fact checks - [repo,](https://github.com/srcole/politifact-analysis) [blog post](https://srcole.github.io/2019/07/20/politifact/)

Politifact is a handy nonprofit organization that rates the truth value of political statements, mostly by American politicians. I scraped the results of their fact checking since their inception in 2007 and visualized some trends across time, geography, and the political spectrum.

### 9. Personal data requests - [repo,](https://github.com/srcole/personal-data-requests) [blog post](https://srcole.github.io/2019/08/17/personal-data-requests/)

The EU's General Data Protection Regulation (GDPR) law has prompted many web companies to allow its users to easily download (a subset of) the personal data they have stored. I was curious what information was held by the apps that I use (and what they would provide), so I requested, processed, analyzed, and visualized data from Spotify, Twitter, Amazon, Facebook, Apple, LinkedIn, Uber, Venmo, Bank of America, and Tinder.

### 10. Maps with Tableau - [Tableau Public profile](https://public.tableau.com/profile/scott.cole#!/)

I've used Tableau to make a few maps to visualize [a weighted sum of Olympic medals](https://public.tableau.com/profile/scott.cole#!/vizhome/Olympics-Scorepercountry/Dashboard1), [burrito ratings](https://public.tableau.com/profile/scott.cole#!/vizhome/BurritosinSanDiego/MainDash), and popularity of posters at the Society for Neuroscience annual meeting ([USA](https://public.tableau.com/profile/scott.cole#!/vizhome/SfN2016posterpopularityacrosstheUnitedStates/Dashboard1), [international](https://public.tableau.com/profile/scott.cole#!/vizhome/SfN2016posterpopularityacrosstheworld/Dashboard1)). For when I want to stay in Python, I made a [simple example of plotting features as a function fo US state](https://github.com/srcole/qwm/tree/master/usa_map). 

### 11. Neuroscience poster popularity - [Notebooks,](https://github.com/srcole/qwm/tree/master/sfn) [blog](https://srcole.github.io/2016/11/27/sfnthemes/)

At the [2016 Society for Neuroscience annual meeting](https://www.sfn.org/Annual-Meeting/Neuroscience-2016), I developed an efficient data collection system that allowed me to quickly measure the number of people at over 3000 posters. I then cross-referenced this data with the online abstract booklet in order to determine which themes were most popular. Additionally, I visualized how poster popularity varied depending on the state or country of the presenter, and [determined which deviances were and were not significant](https://srcole.github.io/2016/12/12/sfnstates/).

### 12. Insight Data Science Fellows - [repo,](https://github.com/srcole/insightfellows) [blog](https://srcole.github.io/2018/05/10/insight_fellows/)

I was interested in the backgrounds of Insight Data Science fellows and the sort of jobs they ended up getting, but the only information I could find was a [long list of pictures on their website](https://www.insightdatascience.com/fellows). Therefore, I used BeautifulSoup to scrape the information of these fellows and then used pandas and seaborn to visualize the prevalence of different universities, scientific fields, and companies that the fellows worked in. I also looked at the interactions to discover a few interesting statistical relationships among these.

### 13. Interactive visualization - [script,](https://github.com/srcole/qwm/blob/master/retire/make_bokeh.py) [blog](https://srcole.github.io/2017/09/09/retirement/)

I made a simple interactive graph using Bokeh that projects a savings plan to determine when you will have enough money to retire comfortably. I know I'm too young to be thinking about this already.


## Tutorials and teaching

Throughout my time doing these projects, I've also found it useful to make some lectures and tutorials for explaining concepts and tools. Here are some of them!

### 1. Neural signal processing - [Notebooks,](https://github.com/voytekresearch/neurodsp/tree/master/tutorials) YouTube videos ([1](https://www.youtube.com/watch?v=DIK5bfoTnlg)) ([2](https://www.youtube.com/watch?v=PAipVT_B_GY))

In order to help undergrads integrating into the lab, I and other lab members have written tutorials on how to use the standard tools that we use to analyze brain data. This has also included [empirical mode decomposition (EMD)](https://github.com/srcole/binder_emd) and [extracting data from images in a paper](
https://github.com/srcole/qwm/blob/master/misc/paper_data/Extract%20time%20series%20from%20a%20published%20figure.ipynb).

### 2. Python on the Open Science Grid - [tutorial,](https://srcole.github.io/2017/01/03/osg_python/) [demo files](https://github.com/srcole/demo_OSG_python)

I was using the free supercomputing resources provided by the Open Science Grid (OSG) and there weren't many resources for using python as there were for MATLAB or C. So I shared a tutorial, that [OSG shared further](http://opensciencegrid.org/news/2017/02/10/free-supercomputing.html) to allow those who were also new to supsercomputing to get up and running utilizing it with their custom python scripts.

### 3. Introduction to data science - [Clustering slides,](https://srcole.github.io/assets/presentations/cogs108/clustering.html#/) [Linear regression notebook](https://github.com/srcole/qwm/blob/master/misc/COGS108_Multiple%20Linear%20Regression%20and%20Collinearity.ipynb)

As part of my advisor's introcution to data science undergraduate course, I gave a couple of guest lectures on clustering and multiple linear regression.
