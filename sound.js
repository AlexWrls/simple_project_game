const SOUND = Object.freeze({
    BACKGROUND: 'BACKGROUND',
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

class SoundEffect {

    playbackRate;
    volume;
    loop;
    audioPool;
    currentIndex;
    maxOverlap;
    mute;

    constructor(audioSrc, playbackRate, volume, maxOverlap) {
        this.playbackRate = playbackRate;
        this.volume = volume;
        this.loop = false;
        this.mute = false;
        this.audioPool = []
        this.maxOverlap = maxOverlap
        for (let i = 0; i < this.maxOverlap; i++) {
            let audio = new Audio();
            audio.src = 'src/sound/' + audioSrc;
            audio.playbackRate = playbackRate
            audio.volume = volume
            audio.loop = false;
            this.audioPool.push(audio)
        }
        this.currentIndex = 0;
    }

    playSound() {  //воспроизвести
        const audio = this.audioPool[this.currentIndex];
        audio.play().catch(error => {
            console.error("Ошибка воспроизведения:", error);
        });
        this.currentIndex = (this.currentIndex + 1) % this.maxOverlap;
    }

    setLoop(value) { //зацикливание (true/false)
        for (const audio of this.audioPool) {
            audio.loop = value
        }
    }

    pauseSound() { //пауза
        for (const audio of this.audioPool) {
            audio.pause()
        }
    }

    muteSound() {
        if (!this.mute) {
            for (const audio of this.audioPool) {
                audio.volume = 0;
            }
            this.mute = true;
        } else {
            for (const audio of this.audioPool) {
                audio.volume = this.volume
            }
            this.mute = false;
        }
    }
}

function initSound() {
    let map = new Map()

    map.set(SOUND.BACKGROUND, new SoundEffect('back_sound.mp3', 1, 0.3, 1));
    map.set(SOUND.STEP, new SoundEffect('step.mp3', 1.5, 0.4, 1));
    map.set(SOUND.BTN, new SoundEffect('btn.mp3', 1, 1, 5));
    map.set(SOUND.OPEN, new SoundEffect('open.mp3', 3, 0.8, 5));
    map.set(SOUND.CLOSE, new SoundEffect('close.mp3', 3, 0.8, 5));
    map.set(SOUND.FALL, new SoundEffect('fall.mp3', 1.5, 0.6, 5));
    map.set(SOUND.NEW_OBJ, new SoundEffect('new_obj.mp3', 1.5, 0.6, 5));
    map.set(SOUND.PORTAL, new SoundEffect('portal.mp3', 1.5, 0.8, 5));
    map.set(SOUND.NEW_LEVEL, new SoundEffect('new_level.mp3', 1, 0.4, 5));
    map.set(SOUND.BANG, new SoundEffect('bang.mp3', 1, 0.8, 5));
    map.set(SOUND.SHOT, new SoundEffect('fire.mp3', 1, 0.6, 5));

    inst.audio = map
}