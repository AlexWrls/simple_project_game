export const GRID_SIZE = 60;

export let canvas = null;
export let ctx = null;
export let state = null;


export function initCanvas(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
    state = {
        stage: 1,
        stageDescription: '',
        time: null,
        fps: 0,
        player: null,
        walls: [],
        sands: [],
        ladders: [],
        boxes: [],
        buttons: [],
        gates: [],
        portals: [],
        guns: [],
        objects: [],
        target: null,
        keys: null,
        eventKey: null,
        audio: [],
        inventory: null
    }
    return true;
}

export const game_debug = false;
export const baseWidth = 1200;
export const baseHeight = 1000;

export const SOUND = Object.freeze({
    BACKGROUND: 'BACKGROUND',
    STEP: 'STEP',
    BTN: 'BTN',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    FALL: 'FALL',
    NEW_OBJ: 'NEW_OBJ',
    PORTAL: 'PORTAL',
    NEW_LEVEL: 'NEW_LEVEL',
    RELOAD_LEVEL: 'RELOAD_LEVEL',
    BANG: 'BANG',
    SHOT: 'SHOT',
})

export const GAME_OBJ = Object.freeze({
    BOX: 'resource/obj/game_object/box_obj.png',
    BARREL: 'resource/obj/game_object/barrel_obj.png',
    LADDER: 'LADDER',
    GUN: 'resource/obj/game_object/gun_obj.png',
    GOLD: 'resource/obj/target1.png',
})

export const background = new Image();
background.src = 'resource/cover.png'

export const cat = new Image();
cat.src = 'resource/player/cat-stand.png'


export default function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const scale = Math.min(containerWidth / baseWidth, containerHeight / baseHeight);

    canvas.width = baseWidth;
    canvas.height = baseHeight;

    canvas.style.width = `${baseWidth * scale}px`;
    canvas.style.height = `${baseHeight * scale}px`;
}