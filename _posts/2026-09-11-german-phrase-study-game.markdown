---
layout: post
is_data: "yes"
comments: true
title:  "Vibe coded web app #5: Practicing German with a cloud backend"
excerpt: "A German study game, and my first app in this series with a login experience and progress saved in the cloud."
date:   2026-09-11 00:00:00
---

NOTE: this is a Codex-generated blog post and app:

I made another language study app with Codex, this time for German. I'm especially happy about this one because it has a cloud backend and a login experience. Getting accounts and saved progress working feels like a nice step forward in what I can build with these tools.

The app is called Wortreise. Each quiz picks 10 random words or phrases from a small beginner vocabulary list, and you can practice translating from German to English or English to German. After each guess, you can review the answer and example sentences, and hear the German pronunciation when your browser has a German voice available. If the automatic grading misses a valid translation, you can mark your answer correct.

You create an account and log in, and completed quizzes are saved in the cloud so you can return to your history on another device. A progress page shows your overall stats and puts the vocabulary with the lowest accuracy first, making it easier to see what needs more practice.

The app is hosted on Vercel and uses Supabase for login and a PostgreSQL database. It's still a small study game, but I'm excited to have used Codex to put those pieces together into something I can use.

Try it here: [Wortreise — German phrase study game](https://german-phrase-study-game.vercel.app/).
