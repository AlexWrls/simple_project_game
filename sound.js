const SOUND = Object.freeze({
    STEP: 'STEP',
    BTN: 'BTN',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    FALL: 'FALL',
    NEW_OBJ: 'NEW_OBJ',
    PORTAL: 'PORTAL',
    NEW_LEVEL: 'NEW_LEVEL',
    BANG: 'BANG',
    SHOT: 'SHOT',
})

function initSound() {
    let map = new Map()

    map.set(SOUND.STEP, createAudio('step.mp3', 1.5, 0.4, true))
    map.set(SOUND.BTN, createAudio('btn.mp3', 1, 1, false))
    map.set(SOUND.OPEN, createAudio('open.mp3', 3, 0.8, false))
    map.set(SOUND.CLOSE, createAudio('close.mp3', 3, 0.8, false))
    map.set(SOUND.FALL, createAudio('fall.mp3', 1.5, 0.6, false))
    map.set(SOUND.NEW_OBJ, createAudio('new_obj.mp3', 1.5, 0.6, false))
    map.set(SOUND.PORTAL, createAudio('portal.mp3', 1.5, 0.8, false))
    map.set(SOUND.NEW_LEVEL, createAudio('new_level.mp3', 1, 0.4, false))
    map.set(SOUND.BANG, createAudio('bang.mp3', 1, 0.8, false))
    map.set(SOUND.SHOT, createAudio('fire.mp3', 1, 0.6, false))

    inst.audio = map
}

function createAudio(src, playbackRate, volume, loop) {
    let audio = new Audio();
    audio.src = 'src/sound/' + src;
    audio.playbackRate = playbackRate
    audio.volume = volume
    audio.loop = loop;
    return audio
}