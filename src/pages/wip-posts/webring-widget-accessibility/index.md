---
layout: '../../../layouts/PostLayout.astro'
title: 'Ringmasters: You should consider making your webring widgets accessible'
published: 05/09/2025 10:00
description: It shouldn't be just websites who needs to be accessible, the external components of a website should be also accessible!
tags: accessibility, indie-web, webrings
---

Hi there! This is a post I split up onto a post I wanted to make, which is about accessibility on the indie web. I really think that webrings are pretty cool but we also need to learn the fact that we should also consider making them accessible.

# Why bother?
It's mind-blowing that most of the indie web nowadays, especially simple layout sites, isn't making the bare minimum to make HTML semantic so any screen reader could read it properly, and having enough contrast on their site so anyone can read it, but that's a whole other topic that's not the scope of this post.

Let's focus on webrings. Webrings nowadays, are really simple unlike the old web counterparts, which are easier to make and easier to make it accessible, right? But I have seen occasionally webring default values being inaccessible.

Let's see 2 common accessibility issues on webring widgets:

# Images having no alt text
This is really common, especially if the webring primarily uses images on their widget. This shouldn't be a difficult thing to fix as you can add one attribute on the image and it should work:
```
<img src="https://jbcarreon123.nekoweb.org/">
```