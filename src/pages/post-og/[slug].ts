// src/pages/og.png.ts
import type { APIRoute } from "astro";
import { satoriAstroOG } from "satori-astro";
import { html } from "satori-html";
import { readFileSync } from "node:fs";

const posts = Object.values(import.meta.glob('../posts/**/*.md', { eager: true }));

export const trailingSlash = 'never';

export function getStaticPaths() {
	return posts.map((val) => {
		let path = val.url.split('/');
		let slug = path[path.length - 2];
		return { params: { slug: slug + '.png' } }
	})
}

export const GET: APIRoute = async ({ params }) => {
	console.log(params)
	const post = posts.find((val) => val.url.includes('posts/' + params.slug?.replace('.png', '')))

	return await satoriAstroOG({
		template: html`
			<div style="display: flex; justify-content: space-between; flex-direction: column; background-color: #212529; color: #f1f3f5; width: 100%; height: 100%; padding: 24px;">
				<p style="margin: 0; font-size: 2em; color: #ced4da;">jb's site: ${post.url}</p>
				<div style="display: flex; flex-direction: column">
					<h1 style="margin: 0; font-size: 5.5em;">${post.frontmatter.title}</h1>
					<p style="margin: 0; font-size: 2.5em;">${post.frontmatter.description}</p>
				</div>
			</div>
		`,
		width: 1200,
		height: 630,
	}).toResponse({
		satori: {
			fonts: [
				{
					name: "Inter",
					data: readFileSync('./public/fonts/Inter-Regular.woff'),
					weight: 400,
					style: "normal",
				},
				{
					name: "Inter",
					data: readFileSync('./public/fonts/Inter-SemiBold.woff'),
					weight: 700,
					style: "normal",
				},
			],
		},
	});
};