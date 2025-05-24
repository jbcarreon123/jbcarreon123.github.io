// @ts-check
import { defineConfig, envField, passthroughImageService } from 'astro/config';
import { loadEnv } from "vite";
import nekoweb from "@indiefellas/astro-adapter-nekoweb";
import svelte from '@astrojs/svelte';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { env } from 'node:process';
// @ts-ignore
import rehypeFigure from 'rehype-figure';
import serviceWorker from "astrojs-service-worker";
import mdx from '@astrojs/mdx';
import rehypeSectionize from '@hbsnow/rehype-sectionize'
import expressiveCode from 'astro-expressive-code';

import sitemap from '@astrojs/sitemap';

import playformCompress from '@playform/compress';
import { transform } from 'lightningcss';

let nkw = [];

if (process.env.GITHUB_ACTIONS === 'true') {
  nkw.push(nekoweb({
    apiKey: env.NEKOWEB_APIKEY,
    cookie: env.NEKOWEB_COOKIE,
    folder: 'jbsite4_test'
  }));
} else {
  console.log(!(process.env.GITHUB_ACTIONS !== 'true'));
}

// https://astro.build/config
export default defineConfig({
  site: "https://jbcarreon123.nekoweb.org",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  build: {
    concurrency: 12
  },

  image: {
    service: passthroughImageService()
  },

  integrations: [expressiveCode({
    styleOverrides: {
      codeFontFamily: "'Commit Mono', monospace",
      codeFontSize: '1.125rem'
    }
  }), mdx(), sitemap({
    xslURL: '/sitemap.xsl',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
    serialize(item) {
      if (/blogs\//.test(item.url)) {
        return undefined;
      }
      return item;
    },
  }), svelte(), playformCompress({
    SVG: false,
    CSS: {
      'csso': false,
      'lightningcss': {}
    },
    HTML: {
      'html-minifier-terser': {
        minifyCSS: false
      }
    },
    JavaScript: {
      'terser': {
        keep_classnames: false,
        keep_fnames: false
      }
    },
    Image: (process.env.GITHUB_ACTIONS === 'true')
  }), ...nkw],

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