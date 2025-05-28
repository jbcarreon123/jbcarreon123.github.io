---
layout: '../../../layouts/TutorialLayout.astro'
title: Auto Reload Addon
description: This thing is just a really simple modification on Ayano's Comment Widget that makes it so the widget auto reloads when the user submits a comment.
category: Ayano's Comment Widget
published: 05/02/2025
---

This thing is just a really simple modification on 
[Ayano's Comment Widget](https://virtualobserver.moe/ayano/comment-widget)
that makes it so the widget auto reloads when the user submits a comment. This is made
because I can't stand why it would need a reload when you submit a comment.

To implement this to your site, here's the steps:

Find the input that's have the id `c_form`. That should look like this:

```html title="comment-widget.js"
<form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true;" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
```

Now, add `refreshForm();` on the `onsubmit` attribute. That should look like this:

```html title="comment-widget.js"
<form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true; refreshForm();" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
```

Then, we're now making the JS function that will reload it. It's just a simple 3 lines. Put this on the script.
Modify the `1500` to how many milliseconds do you want before it reloads the widget.

```js title="comment-widget.js"
function refreshForm() {
    setTimeout(getComments, 1500);
}
```

And that's pretty much it!