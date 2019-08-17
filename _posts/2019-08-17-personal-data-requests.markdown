---
layout: post
comments: true
title:  "Analysis of my personal data from 10 apps"
excerpt: "GDPR has prompted many websites and apps to allow its users to easily download their personal data. I requested, analyzed, and visualized data from Spotify, Twitter, Amazon, Facebook, Apple, LinkedIn, Uber, Venmo, Bank of America, and Tinder."
image: /assets/personaldata/apple_podcast_counts.png
date:   2019-08-17 00:00:00
mathjax: true
---

The EU's General Data Protection Regulation (GDPR) law has prompted many websites and apps to allow its users to easily download (a subset of) the personal data they have stored. I was curious what information was held by the apps that I use (and what they would provide), so I requested data from the companies below. I've listed some of the interesting data they provided and show some plots below ([GitHub code](https://github.com/srcole/personal-data-requests)).

1. Spotify - streaming history, playlists, search queries (only last 90 days)
2. Twitter - tweets, likes, ad impressions/engagements, messages
3. Amazon - orders, items (missing browsing history available for amazon.co.uk)
4. Facebook - likes, comments, messages, search history (missing ad impressions)
5. Apple - podcast listening history, app downloads, every wifi network I've connected to (missing location data)
6. LinkedIn - connections, messages, searches
7. Uber - cost, locations for every ride
8. Venmo - all transactions
9. Bank of America - all credit card transactions
10. Tinder - messages, (daily aggregate numbers of) matches and swipes

I also requested data from Airbnb (denied), Bumble (denied), CoffeeMeetsBagel (waiting 3+ weeks), Google (waiting 3+ weeks), Lyft (denied), and Yelp (nothing interesting provided, missing browsing history).

&nbsp;
&nbsp;
<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/apple_podcast_temporal.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 1.</b> Some of my favorite podcasts over time. (Data source: Apple)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/boa_cuisines_stacked_proportion.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 2.</b> Changes in the relative amount I've spent on different cuisines. (Data source: Bank of America)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/spotify_plays_artist_counts.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 3.</b> The bands I have listened to most recently (Data source: Spotify)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/facebook_meme_likes_temporal.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 4.</b> Over time, I have been using Facebook less for friends and more for memes. (Data source: Facebook)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/twitter_my_tweets_wordcloud_good.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 5.</b> Word cloud indicating the words I use most frequently in my tweets. (Data source: Twitter)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/tinder_match_per_day_by_city.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 6.</b> Rate of Tinder matches while I'm in different cities. (Data source: Tinder)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/venmo_wordcloud_good.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 7.</b> Word cloud indicating the words and emojis that are most common in my Venmo transacations. (Data source: Venmo)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/uber_cost_per_minute_by_city.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure 8.</b> Cost of my Uber rides per minute in different cities. (Data source: Uber)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/linkedin_connection_categories.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure 9.</b> Number of my LinkedIn connections classified in each profession. (Data source: LinkedIn)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/amazon_spent.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure 10.</b> Amount I've spent on Amazon in different categories. (Data source: Amazon)</div>
</div>
&nbsp;
&nbsp;
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/apple_podcast_counts.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure A1.</b> Play counts for my favorite podcasts. (Data source: Apple)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/boa_cuisines_by_year_total_stacked.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure A2i.</b> How much I've spent on different cuisines (Data source: Bank of America)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/boa_categories_year_total.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure A2ii.</b> How much I've spent on different things over time (Data source: Bank of America)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/boa_cuisines.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure A2iii.</b> Total amount I've spent on different cuisines on my credit cards since 2013. (Data source: Bank of America)</div>
</div>
&nbsp;
&nbsp;


<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/spotify_listening_duration_by_day.png" height="250">
<div class="thecap" style="text-align:center"><b>Figure A3i.</b> Amount of Spotify I've listened to each day. (Data source: Spotify)</div>
</div>
&nbsp;
&nbsp;


<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/spotify_plays_top_songs.png" height="350">
<div class="thecap" style="text-align:center"><b>Figure A3ii.</b> Songs I've played most recently. (Data source: Spotify)</div>
</div>
&nbsp;
&nbsp;


<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/spotify_plays_top_songs.png" height="350">
<div class="thecap" style="text-align:center"><b>Figure A3iii.</b> Artists I've listened to a lot in June and July 2019. (Data source: Spotify)</div>
</div>
&nbsp;
&nbsp;


<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/spotify_liked_songs_artist_counts.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A3iv.</b> Number of songs from each artist that I have favorited. (Data source: Spotify)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/twitter_liked_word_rate.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure A5i.</b> Frequency of different words in the tweets I like. (Data source: Twitter)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/twitter_liked_word_rate.png" height="500">
<div class="thecap" style="text-align:center"><b>Figure A5ii.</b> Number of times I've liked tweets from different accounts. Fairly few non-neuroscientists(*). (Data source: Twitter)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/venmo_note_counts.png" height="400">
<div class="thecap" style="text-align:center"><b>Figure A7i.</b> Number of times different words or emojis (:emoji:) appear in my venmo transactions. (Data source: Venmo)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/venmo_transaction_accounts.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A7ii.</b> Amount of money I've transferred on Venmo over time. (Data source: Venmo)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/uber_cost_per_mile_by_city.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A8i.</b> Cost of UberX per mile in different cities. (Data source: Uber)</div>
</div>
&nbsp;
&nbsp;

<div class="imgcap" style="text-align:center">
<img src="/assets/personaldata/uber_cost_per_minute_by_year_California.png" height="300">
<div class="thecap" style="text-align:center"><b>Figure A8ii.</b> Cost of my UberX rides per minute over time in California. (Data source: Uber)</div>
</div>
&nbsp;
&nbsp;



