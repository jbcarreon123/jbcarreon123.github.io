---
layout: '../../../layouts/TutorialLayout.astro'
title: Markdown Addon
description: This thing is a modification to Ayano's Comment Widget to allow your users to use Markdown on their comments.
category: Ayano's Comment Widget
---

This thing is a modification to
[Ayano's Comment Widget](https://virtualobserver.moe/ayano/comment-widget)
to allow your users to use Markdown on their comments. It uses Showdownjs for the Markdown
parsing, and DOMPurify for purifying user comments client-side.

Note that this is a client-side addon and won't sanitize comments server side. I'm working on a solution but this is I think sufficient enough unless the bad actor got access to your files and managed to update your site to remove sanitization or something.

To implement this to your site, here's the steps:

1.  Get [Showdownjs](https://showdownjs.com/) and [DOMPurify](https://github.com/cure53/DOMPurify). I recommend grabbing the min versions
    as those are the most recommended way to use these libraries. Also if you want, also grab the source maps for the minified scripts.
2.  Include both of them above where the comment script is embedded, like this:

    ```html title="comments.html"
    <script src="/lib/purify.min.js"></script>
    <script src="/lib/showdown.min.js"></script>
    <script src="/lib/comment-widget.js" defer></script>
    <div id="c_widget"></div>
    ```
3.  Put these below the configuration lines. These will be the configuration
    variables for Showdownjs and DOMPurify, respectively. I recommend the DOMPurify
    config options below, but you can refer to [this FAQ on DOMPurify's GitHub](https://github.com/cure53/DOMPurify#can-i-configure-dompurify)
    of how to configure DOMPurify for your needs.

    ```javascript title="comment-widget.js"
    var converter = new showdown.Converter()
    DOMPurify.setConfig(
        {
            USE_PROFILES: { html: true },
            FORBID_TAGS: ['style'],
            FORBID_ATTR: ['style', 'class', 'aria-hidden']
        }
    )
    ```
4.  Now, find the `createComment` function, then find the comment that says `// Text content`.
    We need the code below that, until above `return comment;` That should look like this:

    ```javascript title="comment-widget.js"
    // Text content
    let text = document.createElement('p');
    let filteredText = data.Text;
    if (s_wordFilterOn) {filteredText = filteredText.replace(v_filteredWords, s_filterReplacement)}
    text.innerText = filteredText;
    text.className = 'c-text';
    comment.appendChild(text);
    ```
5.  Now, let's add the Markdown rendering. **Process it after the word filter as that might break stuff!**
    You can add it by appending this above `text.innerText = filteredText;`:

    ```javascript title="comment-widget.js"
    filteredText = converter.makeHtml(filteredText);
    ```
6.  Then, let's sanitize the rendered message. **Process it after the renderer as that might expose some XSS vulnerabilities!**
    Append this below the above:

    ```javascript title="comment-widget.js"
    filteredText = DOMPurify.sanitize(filteredText)
    ```
7.  Lastly, let's modify the innerText to use innerHTML, like this:

    ```javascript title="comment-widget.js"
    text.innerHTML = filteredText;
    ```

And that's pretty much it!