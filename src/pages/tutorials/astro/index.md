---
layout: '../../../layouts/TutorialLayout.astro'
title: Astro (in the indie web)
description: Astro is a web framework that you can use to build your indie site!
category: SSGs/Frameworks
---

Astro is a web framework for building fast, content-driven websites. It allows you to have components/layouts that you can use anywhere on your site without ever thinking or worrying of having mismatched data on your site's pages, with the expense of running a command to make Astro build the site from Astro's syntax to HTML for you.

Unlike static site generators, like 11ty or Jekyll, Astro is a web framework, and can be used to drive both statically-generated sites and dynamically-generated sites (or both), but on this tutorial, I'm going to just focus on it's static site functionality, basically mimicking a feature of a static site generator, but with the features Astro gives, as almost all indie web hosting platforms (e.g. Neocities or Nekoweb) is static only web hosts.

> If you want to look a site that runs Astro, look at [my site's repository](https://github.com/jbcarreon123/jbcarreon123.github.io/)!

# Prerequisites
You will need:
- [`node.js`](https://nodejs.org/en/download/) v18.20.8 or v20.3.0, v22.0.0 or higher. ( v19 and v21 are not supported),
- Latest version of `npm`,
- A code editor (I recommend [Visual Studio Code](https://code.visualstudio.com/)), and
- a basic knowledge of how a terminal works

Also I recommend installing the official Astro extension, which provides linting and syntax highlighting on Astro files!

# Installation
Run this command in your terminal:
```bash
$ npm create astro
```

Now, you will see this:
```bash
$ npm create astro
Need to install the following packages:
create-astro@4.12.0
Ok to proceed? (y)
```

Just press 'y' and wait for it to install, then follow the steps.

For this tutorial, I will use these. You can use anything else, but this should work fine on your config (unless you selected any template other than the 'Use minimal (empty) template').

```bash
 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         .

  tmpl   How would you like to start your new project?
         Use minimal (empty) template

  deps   Install dependencies?
         Yes

   git   Initialize a new git repository?
         No
      ◼  Sounds good! You can always run git init manually.

      ✔  Project initialized!
         ■ Template copied
         ■ Dependencies installed

  next   Liftoff confirmed. Explore your project!
         Run npm run dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut!
╰─────╯
```

# Configuration
Before we start, we need to change some settings on the Astro config file, `astro.config.mjs`. That should be in the root of your project folder. Open it and edit it to be like this:
```js title="astro.config.mjs"
// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    image: {
        service: passthroughImageService()
    }
});
```

That will tell Astro to disable the Sharp image optimization service, which is unsupported for many static web hosts (like Nekoweb or Neocities).

# Creating your 'Hello World' page
Now, open the `index.astro` file on the `src/pages` folder.

After viewing it, you wonder, why it looks like HTML, but with those Markdown frontmatter-like dashes at the top, that's the Astro syntax! It feels like HTML and sounds like HTML but you can do more stuff on it!

But for our hello world page, just edit it like how you would edit an HTML page!

```astro title="src/pages/index.astro"
---

---

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content={Astro.generator} />
        <title>Hello world!</title>
    </head>
    <body>
        <h1>Hello world!</h1>
        <p>I'm JB!</p>
    </body>
</html>
```

# Running the development server
Now that you have created your hello world page, you wanna know how to show it on your browser locally.

For that, just run `npm run dev`! For the first time running it, it will say that it collects anonymous usage data. If you don't want telemetry, just run `astro telemetry disable`.
```bash
$ npm run dev

> dev
> astro dev

▶ Astro collects anonymous usage data.
  This information helps us improve Astro.
  Run "astro telemetry disable" to opt-out.
  https://astro.build/telemetry

22:53:10 [types] Generated 3ms
22:53:10 [content] Syncing content
22:53:10 [content] Synced content

 astro  v5.8.0 ready in 845 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

22:53:10 watching for file changes...
```

Now, on your browser, go to `http://localhost:4321/`, and you should see your hello world page!

# Components and Layouts
Components and Layouts is a powerful part of Astro, which allows you to have reusable code with almost no boilerplate!

Let's create a simple layout that we can use!

1. Firstly, create a `layouts` folder inside the `src` folder.
2. Then, we will create an Astro file. Let's name it `base.astro`.
3. To simplify our lives, let's copy the contents of the `index.astro` file, and let's remove the contents of the `<body></body>` tag.
4. Now, inside `<body></body>`, let's put `<slot></slot>`.

   Your `base.astro` file should look like this:
   ```astro title="src/layouts/base.astro"
   ---

   ---
   
   <html lang="en">
       <head>
           <meta charset="utf-8" />
           <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
           <meta name="viewport" content="width=device-width" />
           <meta name="generator" content={Astro.generator} />
           <title>Hello world!</title>
       </head>
       <body>
           <slot></slot>
       </body>
   </html>
   ```

   Now, you're asking, how do I use it?

5. Now, go back to the `index.astro` file, and remove all code besides the `---` frontmatter and the things inside the `<body></body>` element (so the `<h1></h1>` and `<p></p>` element)
6. Then, inside the frontmatter, put this code:
   ```astro title="src/pages/index.astro"
   ---
   import Base from '../layouts/base.astro';
   ---
   ```
   That will tell the `index.astro` file to import the `base.astro` file using the `<Base></Base>` tag.
7. Now, let's use it! Wrap the `<h1></h1>` and `<p></p>` element with the `<Base></Base>` tag, like this:
   ```astro title="src/pages/index.astro"
   ---
   import Base from "../layouts/base.astro";
   ---

   <Base>
       <h1>Hello world!</h1>
       <p>I'm JB!</p>
   </Base>
   ```
8. Save both files, and reload your browser. Now you will see that nothing has changed, but your `index.astro` file now uses the `base.astro` layout!

## Passing properties through components or layouts
Now, you want to pass properties from your index file to the base layout. How do I do it? It's simple, props passing!

Let's pass a title and make the base layout use it, with a default if nothing has set!

1. Go back to your `base.astro` file, and add this to the file's frontmatter:
   ```astro title="src/pages/base.astro"
   ---
   const { title = "My site title!" } = Astro.props;
   ---
   ```
2. Now, let's use it. We will change the content of the `<title></title>` element from 'Hello World!' to `{title}`!
   ```astro title="src/pages/base.astro" collapse={1-9, 13-16}
   ---
   const { title = "My site title!" } = Astro.props;
   ---
   
   <html lang="en">
       <head>
           <meta charset="utf-8" />
           <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
           <meta name="viewport" content="width=device-width" />
           <meta name="generator" content={Astro.generator} />
           <title>{title}</title>
       </head>
       <body>
           <slot></slot>
       </body>
   </html>
   ```
3. Now save. You will see that it says 'My site title!'. Now, let's make it change to something by specifying the title on `index.astro`!
   ```astro title="src/pages/index.astro"
   ---
   import Base from "../layouts/base.astro";
   ---

   <Base title="Hello World!">
	   <h1>Hello world!</h1>
	   <p>I'm JB!</p>
   </Base>
   ```
4. Now, after you save it, it should now say 'Hello World!'!

# Markdown
Astro natively supports Markdown, which is a popular markup language for formatting text. It's useful for making blog posts, tutorials, and more!

Now, to create a markdown file, just create a file with the `.md` extension in the `src/pages` folder! Let's create one called `cool.md`!

```markdown title="src/pages/cool.md"
# Astro is cool!
Markdown is supported!!!
```

Now, navigate to `http://localhost:4321/cool`, and you will see your Markdown file being translated to HTML, without any external libraries!

# Building your site
Now, if you wanna export your site, just run `npm run build`! It should build your site inside the `dist` folder on the root of your project folder!

> Do not edit the built files, as it will going to be overwritten when you run `npm run build` again!

# Reading further
Astro is a very extensive platform, and you can do almost everything on it, so I recommend going to the [Astro documentation](https://docs.astro.build/en/getting-started/) for more stuff like [using frontmatter](https://docs.astro.build/en/guides/markdown-content), [using layouts on Markdown files](https://docs.astro.build/en/guides/markdown-content/#frontmatter-layout-property), [using components from other frameworks like Svelte or React on your Astro application](https://docs.astro.build/en/guides/integrations-guide/), [Dynamically rendering files](https://docs.astro.build/en/guides/routing/#static-ssg-mode), and more!

You can also search the [Astro Integrations](https://astro.build/integrations/) page for things you can add into Astro!

That's about it, and if you want something to be added it, let me know in the comments!!!