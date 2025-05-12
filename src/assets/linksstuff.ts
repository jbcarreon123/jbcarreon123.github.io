export interface LinksStuff {
    author?: string,
    name: string,
    url: string,
    description: string,
    button?: string,
    tags?: string[]
}

export const linksStuff: LinksStuff[] = [
    {
        name: 'Nekoweb',
        url: 'https://nekoweb.org',
        description: 'The host of this webbed site',
        button: 'https://nekoweb.org/assets/buttons/button5.gif',
        tags: ['hosts', 'indieweb']
    },
    {
        author: 'thepersonever',
        name: 'PSFL Adventures',
        url: 'https://psfla.net',
        description: 'thepersonever\'s mspaint adventures',
        tags: ['mspa'],
        button: 'https://psfla.net/resc/img/psflabutton.png'
    },
    {
        name: 'IndieSeas',
        url: 'https://indieseas.net',
        description: 'An indie web search engine',
        tags: ['search', 'indieweb']
    }
]