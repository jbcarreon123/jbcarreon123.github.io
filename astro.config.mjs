// @ts-check
import { defineConfig, envField, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from "vite";
import nekoweb from '@indiefellas/astro-adapter-nekoweb';
import svelte from '@astrojs/svelte';
import fs from 'node:fs';
import { getEnv } from 'astro/env/runtime';
import opengraphImages, { presets } from "astro-opengraph-images";
import embeds from 'astro-embed/integration';
import opengraphImage from 'astro-opengraph-image';
import remarkToc from 'remark-toc';
import remarkSectionize from 'remark-sectionize';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
// @ts-ignore
import rehypeFigure from 'rehype-figure';

import mdx from '@astrojs/mdx';

// @ts-ignore
const { NEKOWEB_APIKEY, NEKOWEB_COOKIE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://inaccessible.nekoweb.org",

  prefetch: {
    prefetchAll: true
  },

  image: {
    service: passthroughImageService()
  },

  integrations: [embeds(), svelte(), mdx()],

  adapter: nekoweb({
    apiKey: NEKOWEB_APIKEY,
    cookie: NEKOWEB_COOKIE,
    folder: 'jbsite4_test'
  }),

  trailingSlash: 'always',

  markdown: {
    remarkPlugins: [
      remarkToc
    ],

    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeAutolinkHeadings,
      [rehypeExternalLinks, {
        rel: ['nofollow'], target: '_blank',
        content: {
          type: 'element', tagName: 'span',
          children: [
            {
              type: 'text', value: ' '
            },
            {
              type: 'element', tagName: 'span',
              properties: { className: ['ms'] },
              children: [{type: 'text', value: 'open_in_new'}]
            }
          ]
        }
      }
      ],
      rehypeFigure
    ]
  }
});