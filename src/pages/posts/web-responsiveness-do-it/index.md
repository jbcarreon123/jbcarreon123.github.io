---
layout: '../../../layouts/PostLayout.astro'
title: "Web responsiveness: why you should follow it on your site"
description: Most people browse the Internet on their phones, and some people are browsing on a small screen, and you should make your site accommodate that!
published: 05/20/2025 00:30
tags: indie-web, responsive-web
---
So, I've seen so many indie sites that is saying "not mobile responsive" or "don't be a phone chump" or "better viewed on *this resolution*" or "*that resolution*" and it still bothers me that why does most indie sites nowadays, does not consider supporting mobile??? 

Based on StatCounter, mobile users contributes to 62.38% on browsing the Internet, and seeing these sites that does not work well on mobile, makes most of the people on that population to just turn back and close your site. Look, it's much better if everyone can see your site, right??? 

# But why though?
There are multiple reasons why a webmaster cannot make their website to be accessible:

- They don't know how to make their site responsive,
- The assets or layout would massively break on their site,
- The site has too much HTML4 or older code that would not translate well on site responsiveness (like tabled layouts)

There's so much more but some of these are reasonable, but I don't think some other reasons are reasonable because they just don't like to make their site responsive.

# People with small screens too
It's also not just mobile users, people with small screens also gets affected on this, like if you test your site in full screen 1080p and design your site only on that resolution, chances are some things on your site break on screens smaller or larger than 1080p, which is not great.

Most people (like me) browse the internet mostly on windowed browsers, this breaks your site if people have their window size different to what you have coded.

# Accessibility, too
This also affects people who needs accessibility features, like zooming. Your site breaking due to it requiring a specific viewport makes it so people that needs zooming can't view your site properly. Same goes for sites that disables zooming entirely.

# How do I make my site responsive?
Use things like media queries and flexboxes to make your layout responsive. Depending on your current site's layout, it can vary from easily done to impossible to be done without a major overhaul, which is fine because it's not too late to implement responsiveness on your site! You can also do a separate page for mobile users, which is also fine but if you aren't using an SSG, it can be difficult to sync data around.

Also, consider trying your site in different sizes, like resizing your browser window, use [your browser's mobile viewport emulator](https://www.digitalcitizen.life/emulate-mobile-device-desktop-browser/), or just visiting your site on your phone!

# Resources
Here's some resources you want to see when you're making your site responsive:

- [How to Make Your Site Mobile-Friendly (by Beepbird)](https://www.beepbird.net/articles/accessibility/how-to-make-your-site-mobile-friendly.html)
- [Responsive Web Directory Resources](https://kalechips.net/responsive/resources) [(archive)](https://web.archive.org/web/https://kalechips.net/responsive/resources)
- [W3Schools tutorial about Responsive Web Design](https://www.w3schools.com/html/html_responsive.asp)
- [MDN's tutorial about Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)