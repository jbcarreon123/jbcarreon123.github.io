export async function GET(context) {
    const posts = Object.values(import.meta.glob('./posts/**/*.mdx', { eager: true }));

    let postJson = await Promise.all(posts.map(async (post) => {
        console.log(post.url)
        return {
            id: post.url.replace('/posts/', '').replace('/', ''),
            url: context.site + post.url.replace('/', ''),
            title: post.frontmatter.title,
            summary: post.frontmatter.description,
            date_published: new Date(post.frontmatter.published).toISOString(),
            tags: post.frontmatter.tags.split(', ')
        }
    }));

    let json = {
        version: "https://jsonfeed.org/version/1.1",
        title: "jb's posts",
        description: "a platform where jb yaps on",
        home_page_url: context.site,
        feed_url: context.site + 'feed.json',
        items: postJson
    }

    return new Response(
        JSON.stringify(json),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}