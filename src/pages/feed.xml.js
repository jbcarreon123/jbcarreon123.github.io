export async function GET(context) {
    const posts = Object.values(import.meta.glob('./posts/**/*.mdx', { eager: true }));

    return rss({
        title: "jb's posts",
        description: "a platform where jb yaps on",
        site: context.site,
        items: await Promise.all(posts.map(async (post) => ({
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            link: post.url,
            pubDate: new Date(post.frontmatter.published),
            categories: post.frontmatter.tags.split(', ')
        }))),
        customData: `<language>en-us</language>`,
    });
}