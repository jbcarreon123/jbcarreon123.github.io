// @ts-check
import { defineConfig, envField, passthroughImageService } from 'astro/config';
import { loadEnv } from "vite";
import nekoweb from '@indiefellas/astro-adapter-nekoweb';
import svelte from '@astrojs/svelte';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { env } from 'node:process';
// @ts-ignore
import rehypeFigure from 'rehype-figure';

import mdx from '@astrojs/mdx';
import rehypeSectionize from '@hbsnow/rehype-sectionize'
import expressiveCode from 'astro-expressive-code';

console.log(env.NEKOWEB_APIKEY);

// https://astro.build/config
export default defineConfig({
  site: "https://jbcarreon123.nekoweb.org",

  prefetch: {
    prefetchAll: true
  },

  image: {
    service: passthroughImageService()
  },

  integrations: [expressiveCode({
    styleOverrides: {
      codeFontFamily: "'Commit Mono', monospace",
      codeFontSize: '1.125rem'
    }
  }), svelte(), mdx()],

  adapter: nekoweb({
    apiKey: env.NEKOWEB_APIKEY,
    cookie: env.NEKOWEB_COOKIE,
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
          properties: { ariaHidden: "true" },
          children: [
            {
              type: 'text', value: ' '
            },
            {
              type: 'element', tagName: 'span',
              properties: { className: ['ms'], dataIcon: ['open_in_new'] },
            }
          ]
        }
      }
      ],
      rehypeFigure,
      rehypeSectionize
    ],
  }
});