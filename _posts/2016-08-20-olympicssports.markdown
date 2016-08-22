---
layout: post
comments: true
title:  "Olympics 2016: Normalizing results by sport"
excerpt: "The United States is dominating in the Olympic medal count, but maybe that's because of the disproportionate number of medals in swimming. What would the results look like if the number of medals was even for all sports?"
date:   2016-08-20 00:00:00
mathjax: true
---

**[Python code for data acquisition and analysis](https://github.com/srcole/qwm/tree/master/olympics)**

## A new medal count: Normalized by sport
In [our last Tableau visualization](https://srcole.github.io/2016/08/17/olympics/), we could vary the weights of gold,
silver, and bronze medals to calculate a composite score for each country other than a simple medal count.
However, I still don't think the weighted medal count above is sufficient because it seems odd that we weight sports
with many medals, like swimming, much more than sports with fewer medals, like volleyball. Therefore, in the
visualization below, you can click to observe how the medal count differs if we were to normalize the results
such that each sport has the same weight. For example, since there are 104 medals in swimming, each medal is worth
1/104, and since there are 12 medals in archery, they are each worth more (1/12 of a point).

<html>
<div class='tableauPlaceholder' id='viz1471721153729' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ol&#47;Olympics-Normalizedmedalcounts&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='Olympics-Normalizedmedalcounts&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ol&#47;Olympics-Normalizedmedalcounts&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1471721153729');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='804px';vizElement.style.height='669px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>
</html>

## Create your own Olympics: Custom sports weighting
Interestingly, if we look at the number of gold medals after applying the uniform weighting across sports, we see that the United States's lead
diminishes considerably. Additionally, I thought it'd be fun to create an interactive visualization in which we can choose the
weighting for each sport and then this will weight the medal count appropriately. For example, if I'm a fan of
diving (weight = 5), but I don't like swimming as much (weight = 0.5), then I see that China wins my Olympics.

<html>
<div class='tableauPlaceholder' id='viz1471721319810' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;H8&#47;H8KMBZJ9N&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='path' value='shared&#47;H8KMBZJ9N' /> <param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;H8&#47;H8KMBZJ9N&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1471721319810');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='804px';vizElement.style.height='669px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>
</html>