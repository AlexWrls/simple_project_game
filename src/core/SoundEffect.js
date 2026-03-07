export default class SoundEffect {

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
            audio.src = 'resource/sound/' + audioSrc;
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

