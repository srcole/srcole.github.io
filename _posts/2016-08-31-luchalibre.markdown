---
layout: post
comments: true
title:  "Lucha Libre Taco Shop: Official burrito review"
excerpt: "Twenty-eight people applied burritology to asses their experiences eating burritos at the famous Lucha Libre Taco Shop in San Diego."
date:   2016-08-31 00:00:00
mathjax: true
---

<span style="font-weight:400;">In the future, when more data is collected (requiring multiple burritos from several establishments), we can identify the taco shop with the best meat, best tortilla, most optimal Meat:Filling, etc. Currently, we can share the rankings of each of the 3 taco shops from which we have rated at least 9 burritos. We find that Taco Stand is superior in most categories (overall average: 4.1/5) but fares worst in terms of cost, volume, and temperature. Rigoberto’s Taco Shop on Miramar Road, seems to be the best value burrito with the lowest cost and greatest volume and Meat:Filling and still an overall rating of 3.8/5.</span>

<div class="imgcap">
<img src="/assets/burrito/100_table_rank.png" height="200">
<div class="thecap">Table 1. Ranking of the three most-rated taco shops in each burrito dimension. '1.5' indicates a tie.</div>
</div>

### The MNIST (Mexican National Institute for Sustenance Taste) burrito database

<span style="font-weight:400;">As with the </span><a href="http://yann.lecun.com/exdb/mnist/"><span style="font-weight:400;">MNIST handwritten digit database</span></a><span style="font-weight:400;">, all raw data is available in the Google spreadsheet </span><a href="https://docs.google.com/spreadsheets/d/18HkrklYz1bKpDLeL-kaMrGjAhUM6LeJMIACwEljCgaw/edit?usp=sharing"><span style="font-weight:400;">here</span></a><span style="font-weight:400;">. The subsequent analyses performed can be found in </span><a href="https://github.com/srcole/qwm/tree/master/burrito"><span style="font-weight:400;">my GitHub repo for this blog, organized in IPython Notebooks here</span></a><span style="font-weight:400;">. As of May 19, 2016, the review system outlined above has been applied by 30 people to rate 104 burritos at 31 unique restaurants. Only 9 of those 31 (29%) taco shops provided free chips. The California burrito was the most commonly rated variety, mainly because it is one of my favorites and a standard in San Diego. However, multiple samples were taken from other common varieties as well as each restaurant’s specialties.</span>



August 30, 2016 was not a typical Taco Tuesday. Our group of well-trained burrito reviewers congregated at the Champion's
Booth at [Lucha Libre Taco Shop in North Park](http://www.tacosmackdown.com/). Lucha Libre is potentially the most famous taco shop
in San Diego. It qualified for [FiveThirtyEight’s Burrito Bracket](http://fivethirtyeight.com/burrito/#brackets-view). 
The Luchador (Wrestler) theme is fun and silly, and there's commonly a line of customers out the door. 
That night, our group applied the [10-dimensional burrito rating system](https://srcole.github.io/100burritos/) to
nearly all the burritos on the [menu](http://www.tacosmackdown.com/menu.htm).

<img src="/assets/burrito/lichalibresize.png" height="400">

### The Ratings

Overall, everyone's burrito experience at Lucha Libre that night was fairly variable, as overall 
scores ranged from 4.5/5 (great!) to 1.5/5 (disappointing!) with an average score of 3.26.

<div class="imgcap">
<img src="/assets/burrito/lichalibre_fig1.png" height="200">
<div class="thecap">
Figure 1. A. Distribution of burritos consumed.
B. Overall burrito quality ratings, sorted by burrito type.
C. Volume measurements for each burrito type.
</div>
</div>

Naturally, half of the 28 burritos rated were California burritos. And of the California burritos,
half were Surfin' Californias, which include shrimp in addition to steak. Interestingly, there was
no pattern for which types of burritos were rated low or high (Fig 1B). A statistical test concluded
no significant difference in the overall rating between California burritos and non-California burritos.
However, there was an evident relationship between burrito type and the size of the burrito. A Surfin' California
burrito averaged over 900mL in volume while all Holy Moly burritos were less than 700mL (Fig 1C).


### The Rankings

<div class="imgcap">
<img src="/assets/burrito/lichalibre_table1.png" height="200">
<div class="thecap">
Table 1. A. Ranking of burritos at Lucha Libre against 5 other commonly reviewed taco shops.
</div>
</div>

We compared Lucha Libre to the 5 other taco shops that have obtained at least 10 burrito ratings over the past year.
In Table 1, we see that Lucha Libre has the best salsa and some of the biggest burritos. However,
Lucha Libre sells the most expensive and coldest burritos.
Lucha Libre also ranked relatively low in meat quality, which I would disagree with. But the data is the data, and
I will not argue against it. As my PI, Brad, has said, "[this] is how good science is done: by pushing against
even our own past work."
Despite its fame, Lucha Libre's overall burrito rating was relatively low compared to other popular taco shops.
Overall, Lucha Libre's burritos ranked 5th, only beating out Los Primos in UTC, the taco shop we only go to because it's
close to campus.

<b>The consensus is that Lucha Libre is overrated</b>


### The comments

* "Probably the best steak I've had in a burrito", "Large, but feels good in my hands.", "fries=4[/5]", "first bite was entirely sour cream" - California
* "Good guac", "Probably positively biased by the service", "Shrimp was questionable" - Surfin' California
* "Ordered a specialty burrito and guess I was expecting an ordinary one! Sauce was good but overpowering; no veggies at all; overall just did not feel like a burrito." - Holy Moly
* "Not as good as the first time" - Surf & Turf
* "Bland" - Bean & Cheese
