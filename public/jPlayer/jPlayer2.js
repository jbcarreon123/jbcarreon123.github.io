/// <reference path="demo/chiptune2.js" />
/// <reference path="demo/libopenmpt.js" />

class jPlayer extends HTMLElement {
    _audioPlayer;
    _trackerPlayer;
    _playlist;

    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLElement} */
    #playingContainer;
    /** @type {HTMLElement} */
    #playlistContainer;


    static observedAttributes = ["solo", "id"];

    /* 
        Modify this if you want to have a custom widget.
        Moderate JS knowledge required.
     */
    renderLoading() {
        return /* html */`
            <article>
                <h1>Please wait... jPlayer2 is loading...</h1>
                <p id="jplayer--loading-status"></p>
                <p>Want to remove the thing above? Just remove it on the renderLoading() function.</p>
            </article>
        `
    }

    renderPlaylistItem(track, isFirst, mode) {
        return /* html */ `
            <button class="playlist-item${isFirst ? ' playing' : ''}"${mode ? ` data-mode=${mode}` : ''} data-src=${track.src} data-art=${track.art}>
                <div class="track-info-container">
                    <div class="album-art-container">
                        <img src="${track.art}" alt="">
                    </div>
                    <div class="track-info">
                        <h2><span class="ms">equalizer</span> ${track.title}</h2>
                        <p><span>${track.artist}</span> <span ${track.tracker ? 'data-tracker="true"' : ''}>${track.album != '' ? (!track.tracker ? '- ' : ' ') + track.album : ''}</span></p>
                    </div>
                </div>
                <div class="card-background">
                    <img src="${track.art}" alt="">
                </div>
            </button>
        `;
    }

    renderPlayingCard() {
        const currentTrack = this._playlist[0];
        return /* html */ `
            <section id="jplayer--playing-card">
                <div class="now-playing-container">
                    <div class="player-controls">
                        <div class="now-playing-info">
                            <div class="album-art-container">
                                <img src="${currentTrack?.art}" alt="">
                            </div>
                            <div class="track-info">
                                <h1>${currentTrack?.title}</h1>
                                <p><span>${currentTrack?.artist}</span> <span ${currentTrack?.tracker ? 'data-tracker="true"' : ''}>${currentTrack?.album != '' ? (!currentTrack?.tracker ? '- ' : ' ') + currentTrack?.album : ''}</span></p>
                            </div>
                        </div>
                        <div class="controls">
                            <span id="pos">0:00</span>
                            <span id="sep">/</span>
                            <span id="dur">0:00</span>
                            <div class="center">
                                ${this._playlist.length > 1 ? `
                                <button class="ms" id="shuffle">shuffle</button>
                                <button class="ms" id="prev">skip_previous</button>
                                ` : ''}
                                <button class="ms" id="playpause">play_arrow</button>
                                ${this._playlist.length > 1 ? `
                                <button class="ms" id="next">skip_next</button>
                                <button class="ms" id="repeat">repeat</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <input type="range" min="0" max="1000000" value="0">
                    </div>
                    <div class="card-background">
                        <img src="${currentTrack?.art}" alt="">
                    </div>
                </div>
            </section>
        `;
    }

    renderPlaylistCard() {
        return /* html */ `
            <section id="jplayer--playlist-card" ${this._solo ? 'style="display: none;"' : ''}>
                ${this._playlist.map(({ html }) => html).join('')}
            </section>
        `;
    }

    render() {
        this._shadow.innerHTML = /* html */ `
            <style>
                ${!this.rendered ? /* css */ `
                    #jplayer--container {
                        display: none;
                        opacity: 0;
                        animation: fadein 250ms;
                    }

                    @keyframes fadein {
                        from { opacity: 0; }
                        to   { opacity: 1; }
                    }
                ` : ''}
                ${this._style}
            </style>
            <article id="jplayer--container">
                ${this.renderPlayingCard()}
                ${this.renderPlaylistCard()}
            </article>
        `;

        this.#container = this._shadow.querySelector('#jplayer--container');
        this.#playingContainer = this.#container.querySelector('#jplayer--playing-card');
        this.#playlistContainer = this.#container.querySelector('#jplayer--playlist-card');

        this.#playlistContainer.querySelectorAll('.playlist-item').forEach((el) => {
            el.addEventListener('click', () => this.playTrack(el));
        })

        this.playTrack(this.#playlistContainer.querySelector('.playlist-item'));

        let playPause = this.#playingContainer.querySelector('#playpause');
        playPause.addEventListener('click', () => this.playPause(playPause));

        let next = this.#playingContainer.querySelector('#next');
        next?.addEventListener('click', () => this.nextTrack());

        let prev = this.#playingContainer.querySelector('#prev');
        prev?.addEventListener('click', () => this.prevTrack());

        let repe = this.#playingContainer.querySelector('#repeat');
        repe?.addEventListener('click', () => this.repeat(repe));

        let shuf = this.#playingContainer.querySelector('#shuffle');
        shuf?.addEventListener('click', () => this.shuffle(shuf));

        let progressBar = this.#playingContainer.querySelector('.progress input[type="range"]');
        progressBar.addEventListener('input', () => this.progressChanged(progressBar));

        this.rendered = true;
        this.emit('load');
    }

    constructor() {
        super();
        this._internals = this.attachInternals();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._playlist = [];
        this._playlistArt = [];
        /** @type {HTMLSourceElement[]} */
        this._playlistSources = [];
        this._observer = new MutationObserver(async () => await this.updatePlaylist())
        this._audioPlayer = new Audio();
        this._audioPlayer.addEventListener('durationchange', () => this.progress());
        this._audioPlayer.addEventListener('timeupdate', () => this.progress());
        this._audioPlayer.addEventListener('ended', () => this.nextTrack());
        this._style = this.querySelector('style');

        if (typeof ChiptuneJsPlayer !== 'undefined') {
            window['libopenmpt'] = Module;
            this._trackerAudioContext = new AudioContext();
            this._trackerPlayer = new ChiptuneJsPlayer(new ChiptuneJsConfig(0, undefined, undefined, this._trackerAudioContext));
        }

        if (typeof window.jsmediatags !== 'undefined') {
            this._mediaTags = window.jsmediatags;
        }

        this._shadow.innerHTML = this.renderLoading();
    }

    emit(type, detail = {}) {
        let ev = new CustomEvent(`jPlayer2:${type}`, {
            bubbles: true,
            detail: detail
        })

        return this.dispatchEvent(ev);
    }

    connectedCallback() {
        this._observer.observe(this, { childList: true })
    }

    disconnectedCallback() {
        this._observer.disconnect();
    }

    seek(secs) {
        if (this._trackerPlayer.currentPlayingNode !== null) {
            let module = this._trackerPlayer.currentPlayingNode.modulePtr;
            libopenmpt._openmpt_module_set_position_seconds(module, secs);
        } else {
            this._audioPlayer.currentTime = secs;
        }
        this.emit('seek', secs)
    }

    progressChanged(el) {
        if (this._trackerPlayer.currentPlayingNode !== null) {
            let duration = this._trackerPlayer.duration();
            let module = this._trackerPlayer.currentPlayingNode.modulePtr;
            libopenmpt._openmpt_module_set_position_seconds(module, (el.value / 1000000) * duration);
            this.emit('seek', (el.value / 1000000) * duration);
        } else {
            let duration = this._audioPlayer.duration;
            this._audioPlayer.currentTime = (el.value / 1000000) * duration;
            this.emit('seek', (el.value / 1000000) * duration);
        }
    }

    getProgress() {
        if (this._trackerPlayer.currentPlayingNode !== null) {
            return this._trackerPlayer.getCurrentTime();
        } else {
            return this._audioPlayer.currentTime;
        }
    }

    progress() {
        try {
            let pos = this.#playingContainer.querySelector('#pos');
            let dur = this.#playingContainer.querySelector('#dur');
            let prg = this.#playingContainer.querySelector('.progress input[type="range"]');
            if (this._trackerPlayer.currentPlayingNode !== null) {
                let duration = this._trackerPlayer.duration();
                let position = this._trackerPlayer.getCurrentTime();
                let order = this._trackerPlayer.getCurrentOrder();
                let totalOrder = this._trackerPlayer.getTotalOrder();
                pos.textContent = `${formatTime(position)}.${order}`;
                dur.textContent = `${formatTime(duration)}.${totalOrder}`;
                let val = ((position ?? 0) / (duration ?? 0)) * 1000000;
                val = Object.is(val, NaN) ? 0 : val;
                prg.value = val;

                if ("mediaSession" in navigator) {
                    navigator.mediaSession.setPositionState({
                        duration: duration,
                        position: position
                    })
                }

                if (position > 1 && duration > 1 && position >= (duration - 0.15)) {
                    this.nextTrack();
                }

                this.emit('timeUpdate', position);
            } else {
                let duration = this._audioPlayer.duration;
                let position = this._audioPlayer.currentTime;
                pos.textContent = formatTime(position);
                dur.textContent = formatTime(duration);
                let val = ((position ?? 0) / (duration ?? 0)) * 1000000;
                val = Object.is(val, NaN) ? 0 : val;
                prg.value = val;

                if ("mediaSession" in navigator) {
                    navigator.mediaSession.setPositionState({
                        duration: duration,
                        position: position
                    })
                }

                this.emit('timeUpdate', position);
            }
        } catch { }
    }

    repeat(el) {
        if (this._repeat) {
            this._repeatOne = true;
            this._repeat = false;
            el.innerHTML = 'repeat_one_on';
        } else if (this._repeatOne) {
            this._repeat = false;
            this._repeatOne = false;
            el.innerHTML = 'repeat';
        } else {
            this._repeat = true;
            this._repeatOne = false;
            el.innerHTML = 'repeat_on';
        }

        if (this._trackerPlayer.currentPlayingNode === null) {
            this._audioPlayer.loop = this._repeatOne;
        } else {
            libopenmpt._openmpt_module_set_repeat_count(this._trackerNode.modulePtr, this._repeatOne ? -1 : 0);
        }

        this.emit('repeat', { all: this._repeat, one: this._repeat });
    }

    playPause(el, play = undefined) {
        let paused = false;
        if (this._trackerPlayer.currentPlayingNode !== null) {
            if ((play == undefined || (play == true && this._trackerPlayer.currentPlayingNode.paused))) {
                this._trackerPlayer.togglePause();
            }
            paused = !this._trackerPlayer.currentPlayingNode.paused;
            if (!paused) {
                el.innerHTML = 'play_arrow';
            } else {
                el.innerHTML = 'pause';
            }
        } else {
            paused = this._audioPlayer.paused
            if (paused || play) {
                this._audioPlayer.play();
                el.innerHTML = 'pause';
            } else {
                this._audioPlayer.pause();
                el.innerHTML = 'play_arrow';
            }
        }

        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = paused ? "playing" : "paused";
        }

        this.emit('playChanged', !paused);
    }

    shuffle(el) {
        if (this._shuffle) {
            this._shuffle = false;
            el.innerHTML = 'shuffle'
        } else {
            this._shuffle = true;
            el.innerHTML = 'shuffle_on'
        }

        this.emit('shuffle', this._shuffle);
    }

    prevTrack() {
        let el = this.#playlistContainer.querySelector('.playlist-item.playing')
        let tracks = this.#playlistContainer.querySelectorAll('.playlist-item')
        if (this.getProgress() > 3) {
            this.progressChanged({ value: 0 });
            return;
        } else if (this._shuffle) {
            this.playTrack(tracks.item(getRandomArbitrary(0, tracks.length - 1)));
            return;
        }
        let trackVal = Object.values(tracks);
        let track = trackVal.find((val) => val.dataset.src === el.dataset.src);
        let trackIndex = trackVal.indexOf(track);
        this.playTrack(tracks.item(trackIndex - 1) ?? tracks.item(tracks.length - 1));
    }

    nextTrack() {
        let el = this.#playlistContainer.querySelector('.playlist-item.playing')
        let tracks = this.#playlistContainer.querySelectorAll('.playlist-item')
        if (this._repeatOne) {
            this.progressChanged({ value: 0 });
            return;
        } if (this._shuffle) {
            this.playTrack(tracks.item(getRandomArbitrary(0, tracks.length - 1)))
            return;
        }
        this._audioPlayer.pause();
        this._trackerPlayer.stop();
        let trackVal = Object.values(tracks);
        let track = trackVal.find((val) => val.dataset.src === el.dataset.src);
        let trackIndex = trackVal.indexOf(track);
        if (trackIndex === tracks.length - 1 && !this._repeat && !this._repeatOne) {
            let playPause = this.#playingContainer.querySelector('#playpause');
            playPause.innerHTML = 'play_arrow'
        }
        this.playTrack(tracks.item(trackIndex + 1) ?? tracks.item(this._repeat ? 0 : trackIndex));
    }

    playTracker(buf) {
        this._trackerPlayer.stop();
        this._trackerNode = this._trackerPlayer.createLibopenmptNode(buf, this._trackerPlayer.config);
        if (!this._trackerNode) {
            return;
        }

        libopenmpt._openmpt_module_set_repeat_count(this._trackerNode.modulePtr, this._repeatOne ? -1 : 0);
        libopenmpt._openmpt_module_set_render_param(this._trackerNode.modulePtr, OPENMPT_MODULE_RENDER_STEREOSEPARATION_PERCENT, this._trackerPlayer.config.stereoSeparation);
        libopenmpt._openmpt_module_set_render_param(this._trackerNode.modulePtr, OPENMPT_MODULE_RENDER_INTERPOLATIONFILTER_LENGTH, this._trackerPlayer.config.interpolationFilter);

        this._trackerPlayer.currentPlayingNode = this._trackerNode;
        this._trackerNode.connect(this._trackerAudioContext.destination);
    }

    async playTrack(el) {
        let track = this._fetchedPlaylist.find(({ src }) => src === el.dataset.src);
        let source = this._playlistSources.find((data) => data.src === el.dataset.src);
        let data = await this.processMetadata(source, track, this._fetchedPlaylist.indexOf(track), el.dataset.art);

        let playPause = this.#playingContainer.querySelector('#playpause');

        this.#playingContainer.querySelector('.album-art-container img').src = el.dataset.art;
        this.#playingContainer.querySelector('.card-background img').src = el.dataset.art;

        this.#playingContainer.querySelector('.track-info h1').textContent = data.title;
        this.#playingContainer.querySelector('.track-info p').innerHTML = `<p><span>${data.artist}</span> <span ${data.tracker ? 'data-tracker="true"' : ''}>${data.album != '' ? (!data.tracker ? '- ' : ' ') + data.album : ''}</span></p>`;

        this.#playlistContainer.querySelectorAll('.playlist-item').forEach((el) => {
            el.classList.remove('playing');
        })
        el.classList.add('playing');

        let isPlaying = Object.values(this.#playingContainer.querySelectorAll('button.ms')).find((el) => el.innerHTML === 'pause');

        if (el.dataset.mode === 'tracker') {
            this._audioPlayer.pause();
            this._trackerPlayer.stop();
            this._trackerPlayer.load(el.dataset.src, (out) => {
                clearInterval(this._trackerInterval);
                this.playTracker(out);
                this._trackerInterval = setInterval(() => this.progress(), 50);
                this._trackerPlayer.currentPlayingNode.addEventListener('timeupdate', () => this.progress());
                if (!isPlaying)
                    this.playPause(playPause);
                navigator.mediaSession.playbackState = 'playing';
            });
        } else {
            clearInterval(this._trackerInterval);
            this._trackerPlayer.stop();
            this._audioPlayer.src = el.dataset.src;
            this._audioPlayer.load();
            this._audioPlayer.loop = this._repeatOne;
            if (isPlaying)
                this.playPause(playPause);
        }

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: data.title,
                artist: data.artist,
                album: data.album,
                artwork: [{
                    src: el.dataset.art,
                    sizes: '512x512',
                    type: getType(el.dataset.art)
                }]
            });

            navigator.mediaSession.setActionHandler('nexttrack', () => this.nextTrack());
            navigator.mediaSession.setActionHandler('previoustrack', () => this.prevTrack());
            navigator.mediaSession.setActionHandler('play', () => this.playPause(playPause));
            navigator.mediaSession.setActionHandler('pause', () => this.playPause(playPause));
            navigator.mediaSession.setActionHandler('seekto', (secs) => this.seek(secs.seekTime));
        }

        this.emit('playing', {
            ...data,
            art: el.dataset.art
        });
    }

    async fetchTrackData(el) {
        try {
            let loading = this._shadow.querySelector('#jplayer--loading-status');
            if (loading) loading.innerHTML += `<br />Fetching: ${el.src}`
            const response = await fetch(el.src);
            if (!response.ok) {
                return { ok: false };
            }
            const buffer = await response.arrayBuffer();
            return { ok: true, src: el.src, buffer };
        } catch (error) {
            console.error("Error fetching track:", error);
            return { ok: false };
        }
    }

    async processMetadata(el, fetchedData, index, art = undefined) {
        if (fetchedData.ok) {
            let loading = this._shadow.querySelector('#jplayer--loading-status');
            if (loading) loading.innerHTML += `<br />Processing metadata: ${el.src}`;
            try {
                const metadata = readMetadata(fetchedData.buffer);
                const trackInfo = {
                    src: el.src,
                    title: metadata.info.trackTitle ?? el.dataset.title ?? "Unknown title",
                    artist: metadata.info.trackAuthor ?? el.dataset.artist ?? "Unknown artist",
                    album: metadata.info.albumTitle ?? metadata.info.trackTitle,
                    art: art ?? metadata.info.mainPicture.image,
                    raw: metadata
                };

                metadata.info.mainPicture.register(() => {
                    setTimeout(() => {
                        const playlistItem = this._playlist.find(({ src }) => src === el.src);
                        const itemIndex = this._playlist.indexOf(playlistItem);
                        if (playlistItem) {
                            playlistItem.art = art ?? metadata.info.mainPicture.image;
                            this._playlist[itemIndex] = playlistItem;
                            this._playlist[itemIndex]['html'] = this.renderPlaylistItem(this._playlist[itemIndex], index === 0);
                            if (!art) {
                                this.render();
                            }
                        }
                    }, 100)
                });

                metadata.info.mainPicture.load();

                trackInfo['html'] = this.renderPlaylistItem(trackInfo, index === 0);
                return trackInfo;
            } catch (error) {
                return await this.processTrackerMetadata(el, fetchedData.buffer, index, error);
            }
        }
        return this.createDefaultTrackInfo(el, index);
    }

    async processTrackerMetadata(el, buffer, index, error) {
        if (this._trackerPlayer) {
            return new Promise((resolve) => {
                try {
                    this._trackerPlayer.play(buffer);
                    const metadata = this._trackerPlayer.metadata();
                    if (!metadata['type']) {
                        resolve(this.createDefaultTrackInfo(el, index))
                    }
                    this._trackerPlayer.stop();
                    const trackInfo = {
                        src: el.src,
                        title: el.dataset.title ?? metadata['title'] ?? "Unknown title",
                        artist: el.dataset.artist ?? metadata['artist'] ?? "Unknown artist",
                        album: el.dataset.album ?? metadata['type'].toUpperCase() ?? '',
                        art: el.dataset.art ?? this._fallback,
                        tracker: metadata['type'] ? true : false,
                    };
                    trackInfo['html'] = this.renderPlaylistItem(trackInfo, index === 0, 'tracker');
                    resolve(trackInfo);
                } catch {
                    const trackInfo = {
                        src: el.src,
                        title: el.dataset.title ?? "Unknown title",
                        artist: el.dataset.artist ?? "Unknown artist",
                        album: '',
                        art: el.dataset.art ?? this._fallback
                    };
                    resolve(trackInfo);
                }
            });
        } else {
            const trackInfo = {
                src: el.src,
                title: el.dataset.title ?? "Unknown title",
                artist: el.dataset.artist ?? "Unknown artist",
                album: '',
                art: el.dataset.art ?? this._fallback
            };
            trackInfo['html'] = this.renderPlaylistItem(trackInfo, index === 0, 'tracker');
            resolve(trackInfo);
        }
    }

    createDefaultTrackInfo(el, index) {
        const parts = el.src.split('/');
        const trackInfo = {
            src: el.src,
            title: el.dataset.title ?? decodeURIComponent(parts[parts.length - 1]),
            artist: el.dataset.artist ?? "Unknown artist",
            album: el.dataset.album,
            art: el.dataset.art ?? this._fallback
        };
        trackInfo['html'] = this.renderPlaylistItem(trackInfo, index === 0);
        return trackInfo;
    }

    async updatePlaylist() {
        this._fallback = this.getAttribute('fallback');
        this._playlistSources = Array.from(this.querySelectorAll('source'));
        this._fetchedPlaylist = await Promise.all(this._playlistSources.map((v) => this.fetchTrackData(v)));
        this._playlist = await Promise.all(this._playlistSources.map((el, index) =>
            this.processMetadata(el, this._fetchedPlaylist[index], index)
        ));
        this._style = await (await fetch(this.getAttribute('css'))).text();
        this._solo = this.getAttribute('solo') ? true : false;
        setTimeout(() => this.render(), 500);
    }
}

function arrayBufferToFile(arrayBuffer, fileName) {
    const blob = new Blob([arrayBuffer]);
    const file = new File([blob], fileName);
    return file;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getType(base64String) {
    if (!base64String ?? typeof base64String !== 'string' ?? !base64String.startsWith('data:')) {
        return null;
    }
    const dataURIPart = base64String.substring(5, base64String.indexOf(';'));
    return dataURIPart;
}

function formatTime(seconds) {
    let s = Math.floor(seconds / 60).toString()
        + ":" + Math.floor(seconds % 60).toString().padStart(2, "0")
    return s === 'NaN:NaN' ? '0:00' : s;
}

/** @param {ArrayBuffer} buffer  */
function readMetadata(buffer) {
    metadata = { info: {}, tags: [] };
    let dec = new TextDecoder("windows-1252");
    let dv = new DataView(buffer, 0);

    let textDecoders = [
        new TextDecoder("iso-8859-1"),
        {
            /** @param {ArrayBuffer} blob  */
            decode(blob) {
                let isBigEndian = new Uint8Array(blob.slice(0, 1))[0] == 254;
                return (new TextDecoder(isBigEndian ? "utf-16be" : "utf-16le")).decode(blob)
            }
        },
        new TextDecoder("utf-16le"),
        new TextDecoder("utf-8"),
    ]

    if (dec.decode(buffer.slice(0, 4)) == "OggS") {
        let offset = 0;
        let marray = [];
        for (let i = 0; i < 2; i++) {
            let position = dv.getUint32(offset + 6, true);

            let segsCount = dv.getUint8(offset + 26);

            let segs = new Uint8Array(buffer.slice(offset + 27, offset + 27 + segsCount));

            let size = 0;
            for (let a = 0; a < segs.length; a++) size += segs[a];

            offset += 27 + segsCount;
            let data = new Uint8Array(buffer.slice(offset, offset + size));
            offset += size;

            if (i == 1) {
                for (let a = 0; a < size; a++) {
                    marray.push(data[a]);
                }
            }

            if (position === 0xFFFFFFFF) i--;
        }

        let mbuffer = new Uint8Array(marray).buffer;
        let mdv = new DataView(mbuffer, 0);


        if (marray[0] == 3 && dec.decode(mbuffer.slice(1, 7)) == "vorbis") {
            let vendorLength = mdv.getUint32(7, true);
            let vendor = textDecoders[3].decode(mbuffer.slice(11, 11 + vendorLength));

            let p = 11 + vendorLength;
            let tagCounts = mdv.getUint32(p, true);
            p += 4;

            for (let i = 0; i < tagCounts; i++) {
                let tagLength = mdv.getUint32(p, true);
                let tag = textDecoders[3].decode(mbuffer.slice(p + 4, p + 4 + tagLength));
                p += 4 + tagLength;

                let sep = tag.indexOf('=');
                let key = tag.slice(0, sep).toUpperCase();
                let value = tag.slice(sep + 1);
                metadata.tags.push([key, value]);

                switch (key) {
                    case "TITLE":
                        metadata.info.trackTitle = value;
                        break;
                    case "ARTIST":
                        metadata.info.trackAuthor = metadata.info.trackAuthor ? metadata.info.trackAuthor + ", " + value : value;
                        break;
                    case "ALBUM":
                        metadata.info.albumTitle = value;
                        break;
                    case "METADATA_BLOCK_PICTURE":
                        let data = metadata.info.mainPicture = {
                            image: null,
                            callbacks: [],
                            load() {
                                for (let c of this.callbacks) c();
                            },
                            register(callback) {
                                if (this.image) callback();
                                this.callbacks.push(callback);
                            }
                        }
                        fetch("data:application/octet-stream;base64," + value)
                            .then(x => x.blob())
                            .then(blob => blob.arrayBuffer())
                            .then(buffer => {
                                let dv = new DataView(buffer);
                                let typeSize = dv.getUint32(4);
                                let type = textDecoders[3].decode(buffer.slice(8, 8 + typeSize));
                                let offset = 8 + typeSize;
                                let descSize = dv.getUint32(offset);
                                offset += 4 + descSize;
                                let size = dv.getUint32(offset + 16);
                                let blob = new Blob([buffer.slice(offset + 20, offset + 20 + size)], { type });
                                data.image = URL.createObjectURL(blob);
                                data.load();
                            });
                        break;
                }
            }
        }
    } else if (dec.decode(buffer.slice(0, 3)) == "ID3") {
        let totalLength = dv.getUint8(6) << 21 | dv.getUint8(7) << 14 | dv.getUint8(8) << 7 | dv.getUint8(9);
        let offset = 10;
        if (dv.getUint8(5) & 64) offset += dv.getUint32(10);
        let tagTF = {
            "TIT2": "trackTitle",
            "TPE1": "trackAuthor",
            "TALB": "albumTitle",
            "TPE2": "albumAuthor",
            "APIC": "mainPicture",
        }
        while (offset < totalLength) {
            let tag = dec.decode(buffer.slice(offset, offset + 4))
            let length = dv.getUint32(offset + 4);
            let data = buffer.slice(offset + 10, length + offset + 10)
            if (tag == "APIC") {
                let a = 1;
                let enc = dv.getUint8(offset + 10);
                let type = "";
                let byte = "";
                while ((byte = dv.getUint8(offset + 10 + a)) != 0) {
                    type += String.fromCharCode(byte);
                    a++;
                }
                if (type.includes("javascript")) throw new Error("Ehh?");
                a += 2;
                let b = [1, 2, 2, 1][enc];
                let aa = a;
                while ((b == 1 ? dv.getUint8(offset + 10 + a) : dv.getUint16(offset + 10 + a)) != 0) a += b;
                let decbe = textDecoders[enc];
                let desc = decbe.decode(data.slice(aa, a));
                a += b;
                let blob = new Blob([data.slice(a, length)], { type });
                let reader = new FileReader();
                data = {
                    image: null,
                    callbacks: [],
                    load() {
                        for (let c of this.callbacks) c();
                    },
                    register(callback) {
                        if (this.image) callback();
                        this.callbacks.push(callback);
                    }
                }
                reader.onload = function (image) {
                    data.image = image.target.result;
                    data.load();
                };
                reader.readAsDataURL(blob);
            } else if (tag == "TXXX") {
                let enc = dv.getUint8(offset + 10);
                let decbe = textDecoders[enc];
                let keylen = 0;
                let b = [1, 2, 2, 1][enc];
                while ((b == 1 ? dv.getUint8(offset + 10 + keylen) : dv.getUint16(offset + 10 + keylen)) != 0) keylen += b;
                tag = decbe.decode(data.slice(1, keylen + 1)).replace(/^[\s\x00]+|[\s\x00]+$/gm, "");
                data = decbe.decode(data.slice(keylen + 2, length)).replace(/^[\s\x00]+|[\s\x00]+$/gm, "");
            } else if (tag.startsWith("T")) {
                let decbe = textDecoders[dv.getUint8(offset + 10)];
                data = decbe.decode(data.slice(1, length)).replace(/^[\s\x00]+|[\s\x00]+$/gm, "");
            }
            metadata.tags.push([tag, data]);
            if (tagTF[tag]) metadata.info[tagTF[tag]] = data;
            offset += length + 10;
        }
    }
    return metadata;
}

customElements.define("player-container", jPlayer);