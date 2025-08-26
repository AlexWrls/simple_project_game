function initSound() {
    let map = new Map()

    let backSound = new Audio();
    backSound.src = 'src/sound/back_sound.mp3';
    backSound.volume = 0.4
    backSound.loop = true;
    if (!game_debug){
        map.set('back', backSound)
    }

    let stepSound = new Audio();
    stepSound.src = 'src/sound/step.mp3';
    stepSound.playbackRate = 1.5
    stepSound.volume = 0.4
    stepSound.loop = true;
    map.set('step', stepSound)

    let btnSound = new Audio();
    btnSound.src = 'src/sound/btn.mp3';
    btnSound.playbackRate = 1
    btnSound.volume = 1
    map.set('btn', btnSound)

    let openGate = new Audio();
    openGate.src = 'src/sound/open.mp3';
    openGate.playbackRate = 3
    openGate.volume = 0.8
    map.set('open', openGate)

    let closeGate = new Audio();
    closeGate.src = 'src/sound/close.mp3';
    closeGate.playbackRate = 3
    closeGate.volume = 0.8
    map.set('close', closeGate)

    let fall = new Audio();
    fall.src = 'src/sound/fall.mp3';
    fall.playbackRate = 1.5
    fall.volume = 0.6
    map.set('fall', fall)

    let newObj = new Audio();
    newObj.src = 'src/sound/new_obj.mp3';
    newObj.playbackRate = 1.5
    newObj.volume = 0.6
    map.set('newObj', newObj)

    let portal = new Audio();
    portal.src = 'src/sound/portal.mp3';
    portal.playbackRate = 1.5
    portal.volume = 0.8
    map.set('portal', portal)

    inst.audio = map
}