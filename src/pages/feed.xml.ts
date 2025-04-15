import type { APIContext } from "astro";
import { generateFeed } from "../assets/feed.ts";


export async function GET(context: APIContext) {
    return new Response(
        (await generateFeed(context, 'rss')).replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>'),
        {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            }
        }
    )
}