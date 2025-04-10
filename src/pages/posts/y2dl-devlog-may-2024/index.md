---
layout: '../../../layouts/PostLayout.astro'
title: Y2DL Devlog - May 2024
published: 05/30/2024
color: ff2222
description: Some updates for the development of the Y2DL bot in May, 2024!
tags: y2dl, notify, devlog, updates
---

So, uhh, so I decided I'm going to post devlogs now on my blogs, which is this!

# Starting the Rewrite
Before May, I decided to rewrite Y2DL from C# to Python, that also makes it so I could fix the bugs that I missed when I did the C# version of Y2DL.

# A promise (that may be broken)
I said on my birthday (which is May 2, if you're wondering) that I would fully release Y2DL on the end of May, but I think it would be broken as I don't have much time in May to do it (because school stuff), so I would update it so the release would be TBA???

# Twitch Support!
In the start of May, I had planned to support Twitch, which now, the bot has now support for it! The only problem is that OAuth2 is hard to implement.

# OAuth2 is harder to implement than I expected
Twitch support has have a problem on the bot - which is the importance of OAuth2 to get mostly everything. Well, I can just not use OAuth2 at all, but that would limit me to getting the channel, getting the stream info, and getting the follower count, and also will limit me to 10 EventSub subscriptions **app-wide** (which means that if I want to make the bot be updated on the channel's online status, that would be 2 types so 2 subscriptions, then also some of it like `channel.follow` requires a scope [which is `moderator:read:followers` scope] so OAuth2 is required there).   
OAuth2 requires a callback server so the bot can get the token, and implementing is took so fucking long that I don't want to do it again.

# Now, I'm stuck *(for now)*.
So, where did I get stuck? **Encryption** on the OAuth2 tokens.   
I have to look at a master encryption key that:
- Encrypts the tokens that it won't be easily decrypted
- Easy to implement for the end-user that hosts the bot
- Easy for me to implement on the bot
- And, cross-platform enough that it can be used on either Windows, Mac, or Linux

I have looking for hardware IDs, but it is mostly impossible to get on Mac or Windows.   
If you know something that checks with the criteria above, say it to me by pinging me (if you are on a server with me), or joining [my Discord server](https://discord.gg/P5ecFZNyCc) and pinging me.

# Where do I get updated on this?
You can get updates on the Y2DL development on these Discord servers:
- [my Discord server](https://discord.gg/P5ecFZNyCc),
- [Kalos Likes Computers](https://discord.gg/HN73Tp93S4), and on
- [Netherverse Discord](https://discord.gg/hdEz7PPgca).   

Also, you could follow the GitHub repo at https://github.com/jbcarreon123/Y2DL.   
You can also help me develop the bot! Ping me on my discord server (or any of the servers above) for instructions. Whether if it's just helping me to the translation or helping me develop the bot entirely, I appreciate it!