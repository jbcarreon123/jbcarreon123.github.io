---
layout: '../../../layouts/TutorialLayout.astro'
title: Thread Locking Addon
description: This thing is a modification to Ayano's Comment Widget that allows you to lock specific comment threads.
category: Ayano's Comment Widget
---

This thing is a modification to
[Ayano's Comment Widget](https://virtualobserver.moe/ayano/comment-widget) that allows you to lock specific comment threads.

To implement this to your site, here's the steps:

1. Go to the Google Form you used to set up the widget, add a short-answer text question
   and name it 'Locked', wait a bit, then delete it. Yes, really.
    > ### How does this work then?
    > We don't need the question to lock comments, we're gonna do it on the google
        sheets.
    > You can also verify that 'Locked' is on your Google Sheets for your comments,
        if there's not, recreate it and delete it.
2. Now, we're gonna edit some stuff on the forms. Find the `displayComments()` function
   on your script and find the `// Main comments (not replies)` comment. We're gonna edit the loop below.
3. Find these codes:
   ```javascript title="comment-widget.js"
    button.innerHTML = s_replyButtonText;
    button.value = comment.id;
    button.setAttribute('onclick', `openReply(this.value)`);
    button.className = 'c-replyButton';
   ```
4. We're gonna replace them to this:
   ```javascript title="comment-widget.js"
    button.disabled = Boolean(comments[i].Locked);
    button.innerHTML = button.disabled == true ? `Locked` : s_replyButtonText;
    if (!button.disabled) {
        button.value = comment.id;
        button.addEventListener('click', () => openReply(comment.id));
        button.className = 'c-replyButton';
    }
   ```
5. And you're good to go! Try it by commenting, then pinning it on the sheets, by setting your comment's `Locked` to `TRUE`! To have better protection against people replying on a locked thread, consider making a [response validation](https://support.google.com/docs/answer/3378864?hl=en#zippy=%2Crules-for-short-answer-questions) to `Reply`! (use the comment's ID for blocking it!)