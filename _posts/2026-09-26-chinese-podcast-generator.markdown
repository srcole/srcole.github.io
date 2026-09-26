---
layout: post
is_data: "yes"
comments: true
title: "Vibe coding a Chinese podcast generator"
excerpt: "Making custom Chinese listening practice about recent news, histories of places, and other stuff"
date: 2026-09-26 00:00:00
---

NOTE: this is (an edited version of) a Codex-generated blog post.

I like practicing Chinese by listening to podcasts. There are many YouTubers who make content for Chinese learners, but I also wanted to make custom podcasts about things I'm interested in, so I vibe-coded a [Chinese podcast generator](https://github.com/srcole/chinese_podcast_generator). It's a small Python tool that turns a Chinese transcript, an English translation, and a vocabulary list (I used ChatGPT to generate all of these) into a single MP3. Preparing those texts is a separate step; the generator handles turning them into audio and assembling the episode.

The default episode has four parts:

1. The Chinese transcript read slowly.
2. Vocabulary, with each Chinese term followed by its English meaning.
3. The English translation.
4. The Chinese transcript again at normal speed.

The idea is to first try following the Chinese on its own, then get some help with vocabulary and meaning before hearing it again. Having everything in one audio file makes it easy to listen through without switching between a recording while I'm walking around or something.

Under the hood, it uses Microsoft's text-to-speech service through `edge-tts` and FFmpeg to assemble the audio. It also has a short preview mode to check how an episode sounds before generating the whole thing, and caches speech segments so interrupted runs can reuse audio that's already been generated.

These aren't quite as good as the podcasts from the YouTube teachers I like. But I still find them useful and engaging. The big appeal is being able to choose a specific topic I already want to learn about, whether that's the history of somewhere I'm visiting or a data science concept. That gives me another reason to pay attention while practicing Chinese.

The code and instructions for running it are on [GitHub](https://github.com/srcole/chinese_podcast_generator).
