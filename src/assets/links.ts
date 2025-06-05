export type LinkObj = {
    name: string,
    links: {
        name: string,
        path: string,
        redirect: boolean,
        icon: string,
    }[]
}[]

export const LinkObjs: LinkObj = [
    {
        name: "whereabouts",
        links: [
            {
                name: "About JB",
                path: "/about/",
                redirect: false,
                icon: "person"
            },
            {
                name: "Time",
                path: "/time/",
                redirect: false,
                icon: "schedule"
            },
            {
                name: "Projects",
                path: "/projects/",
                redirect: false,
                icon: "terminal"
            },
            {
                name: "FAQs",
                path: "/faq/",
                redirect: false,
                icon: "quick_reference"
            },
            {
                name: "RIIAtW",
                path: "/riiatw/",
                redirect: false,
                icon: "language"
            },
            {
                name: "Packages",
                path: "/packages/",
                redirect: false,
                icon: "inventory_2"
            },
            {
                name: "Gallery",
                path: "/gallery/",
                redirect: false,
                icon: "photo_library"
            },
            {
                name: "Album List",
                path: "/albumlist/",
                redirect: false,
                icon: "library_music"
            },
        ]
    },
    {
        name: "tools & stuff",
        links: [
            {
                name: "\"AI\" Chat",
                path: "/chat/",
                redirect: false,
                icon: "smart_toy"
            },
            {
                name: "Split It!",
                path: "/utils/split-it/",
                redirect: false,
                icon: "space_dashboard"
            },
            {
                name: "Nekobox",
                path: "/utils/nekobox/",
                redirect: false,
                icon: "inventory_2"
            },
            {
                name: "The Inaccessible Website (soon)",
                path: "https://inaccessible.nekoweb.org",
                redirect: true,
                icon: "not_accessible"
            },
            {
                name: "jPlayer2",
                path: "https://jbcarreon123.github.io/jPlayer2",
                redirect: true,
                icon: "music_note"
            },
            {
                name: "nkko.link",
                path: "https://nkko.link",
                redirect: true,
                icon: "link"
            },
            {
                name: "Nekoweb Deployment Adapters",
                path: "https://deploy.nekoweb.org",
                redirect: true,
                icon: "rocket_launch"
            },
            {
                name: "simple-webring-redirect",
                path: "https://github.com/jbcarreon123/simple-webring-redirect",
                redirect: true,
                icon: "call_split"
            }
        ]
    },
    {
        name: "writing",
        links: [
            {
                name: "Posts",
                path: "/posts/",
                redirect: false,
                icon: "article"
            },
            {
                name: "Tutorials",
                path: "/tutorials/",
                redirect: false,
                icon: "help"
            }
        ]
    },
    {
        name: "my webrings",
        links: [
            {
                name: "SSGRing",
                path: "/webrings/ssgring/",
                redirect: false,
                icon: "build"
            },
            {
                name: "Responeko",
                path: "/webrings/responeko/",
                redirect: false,
                icon: "phone_android"
            },
            {
                name: "YAMring",
                path: "/webrings/yamring/",
                redirect: false,
                icon: "tag"
            }
        ]
    },
    {
        name: "outlinks",
        links: [
            {
                name: "Links",
                path: "/links/",
                redirect: false,
                icon: "link"
            },
            {
                name: "Webrings",
                path: "/webrings/",
                redirect: false,
                icon: "donut_large"
            },
            {
                name: "Bookmarks",
                path: "/bookmarks/",
                redirect: false,
                icon: "bookmark"
            }
        ]
    },
    
]