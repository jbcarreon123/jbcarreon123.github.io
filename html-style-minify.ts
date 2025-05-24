import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { walk } from '@nodelib/fs.walk/promises';
import { fileURLToPath } from "url";
import { transform } from "lightningcss";
import { readFileSync, writeFileSync } from "fs";

// @ts-ignore
async function minifyStyleTags(htmlContent, logger) {
    const styleTagRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;

    // @ts-ignore
    return htmlContent.replace(styleTagRegex, (match, attributes, cssContent) => {
        if (!cssContent.trim()) return match;

        try {
            const result = transform({
                filename: 'inline.css',
                code: Buffer.from(cssContent),
                minify: true,
                targets: { chrome: 95 << 16 }
            });

            const minifiedCSS = result.code.toString();
            return `<style${attributes}>${minifiedCSS}</style>`;
        } catch (error) {
            logger.warn('CSS minification failed, keeping original');
            return match;
        }
    });
}

async function processHTMLFile(filePath: string, logger: AstroIntegrationLogger) {
    const fs = require('fs').promises;
    const htmlContent = await fs.readFile(filePath, 'utf8');
    const minifiedHTML = await minifyStyleTags(htmlContent, logger);
    await fs.writeFile(filePath, minifiedHTML, 'utf8');
    return minifiedHTML;
}

export default function createIntegration(): AstroIntegration {
    return {
        name: 'html-style-minify',
        hooks: {
            'astro:build:done': async ({ dir, assets, logger }) => {
                const outDir = fileURLToPath(dir);

                let files = await walk(outDir);
                files.forEach(async (v) => {
                    if (v.name.endsWith('.html')) {
                        writeFileSync(v.path, await processHTMLFile(v.path, logger));
                        logger.info(`Minified style tags of ${v.path}`);
                    }
                })
            }
        }
    }
}