function initSound() {
    let map = new Map()

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

    let newLevel = new Audio();
    newLevel.src = 'src/sound/new_level.mp3';
    newLevel.playbackRate = 1
    newLevel.volume = 0.4
    map.set('newLevel', newLevel)

    let bang = new Audio();
    bang.src = 'src/sound/bang.mp3';
    bang.playbackRate = 1
    bang.volume = 0.8
    map.set('bang', bang)

    let shot = new Audio();
    shot.src = 'src/sound/fire.mp3';
    shot.playbackRate = 1
    shot.volume = 0.6
    map.set('shot', shot)

    inst.audio = map
}