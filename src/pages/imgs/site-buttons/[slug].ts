import Buttons from '../../../../public/buttons.json' with {type: 'json'};
import type { APIRoute } from "astro";

let buttons: {slug: string, url: string}[] = [];

export function getStaticPaths() {
    buttons = Buttons
        .filter((btn) => !btn.imgUrl.startsWith('/imgs'))
        .map((btn) => {
            let url = new URL(btn.imgUrl)
            let spl = url.pathname.split('/')
            let ext = spl[spl.length - 1]
            let nme = url.hostname.replace('www', '').split('.')[0]

            return { slug: `${nme}-${ext}`, url: btn.imgUrl }
        });

    let btns = buttons.map((btn) => ({
        params: { slug: btn.slug }
    }))

    return btns
}

export const GET: APIRoute = async ({ params }) => {
    let btn = buttons.find((bt) => bt.slug === params.slug)
    if (btn) {
        let res = await fetch(btn.url)
        return new Response(await res.arrayBuffer())
    } else {
        return new Response('button not found', {
            status: 404,
            statusText: 'button not found'
        })
    }
}