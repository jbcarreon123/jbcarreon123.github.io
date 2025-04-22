import { readdirSync } from 'node:fs';
import { fromPath } from '@catamphetamine/id3js/node';
import path from 'node:path';

export async function loadMusic() {
    let files = readdirSync('./public/music').filter((v) => v.endsWith('mp3'));
    return await Promise.all(files.map(async (file) => {
        let info = await fromPath(path.join('./public/music', file))
        return {
            name: file,
            info: info
        }
    }))
}