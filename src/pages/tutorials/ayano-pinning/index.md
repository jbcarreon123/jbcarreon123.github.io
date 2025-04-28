---
layout: '../../../layouts/TutorialLayout.astro'
title: Comment Pinning Addon
description: This thing is a modification to Ayano's Comment Widget that allows you to pin specific comments.
category: Ayano's Comment Widget
---

This thing is a modification to
[Ayano's Comment Widget](https://virtualobserver.moe/ayano/comment-widget) that allows you to pin specific comments.

To implement this to your site, here's the steps:

1. Go to the Google Form you used to set up the widget, add a short-answer text question
   and name it 'Pinned', wait a bit, then delete it. Yes, really.
    > ### How does this work then?
    > We don't need the question to pin comments, we're gonna do it on the google
        sheets.
    > You can also verify that 'Pinned' is on your Google Sheets for your comments,
        if there's not, recreate it and delete it.
2. Now, we're gonna edit some stuff on the forms. Find the `displayComments()` function
   on your script and find the `// Main comments (not replies)` comment. We're gonna edit the loop below.
3. Find the `c_container.appendChild(comment);` and `a_commentDivs.push(document.getElementById(comment.id));` code. We're gonna replace it to this:
   ```javascript title="comment-widget.js"
    if (comments[i].Pinned == true) {
        c_container.insertBefore(comment, c_container.firstChild);
        a_commentDivs.unshift(document.getElementById(comment.id));
        comment.style.display = 'block';
    } else {
        c_container.appendChild(comment);
        a_commentDivs.push(document.getElementById(comment.id));
    }
    ```
4. Now, find the `// Replies` comment, find the `container.appendChild(reply);` code, and replace that to this:
   ```javascript title="comment-widget.js"
    if (replies[i].Pinned == true) {
        container.insertBefore(reply, container.firstChild);
    } else {
        container.appendChild(reply);
    }
    ```
5. Now find the `createComment(data)` function on your script and above `comment.appendChild(name);`, add this:
    ```javascript title="comment-widget.js"
    if (data.Pinned == true) {
        name.insertAdjacentHTML('beforeend', '[Pinned]');
    }
    ```
    > You can modify the `[Pinned]` to anything as long it's valid HTML, or just keep it like that.
6. And you're good to go! Try it by commenting, then pinning it on the sheets, by setting your comment's `Pinned` to `TRUE`!