import {baseWidth, ctx, GAME_OBJ, GRID_SIZE, SOUND, state} from "../constants";
import Ladder from "../objects/Ladder";
import Barrel from "../objects/Barrel";
import Box from "../objects/Box";
import Gun from "../effects/Gun";

export default class Inventory{
    bucket;
    mediatorBucket;
    imgBox;
    imgBarrel;
    imgLadder;
    imgGun;
    timeDisable;

    constructor(boxCount, barrelCount, ladderCount, gunCount) {
        this.timeDisable = 0
        this.imgBox = new Image();
        this.imgBarrel = new Image();
        this.imgLadder = new Image();
        this.imgGun = new Image();
        this.imgBox.src = 'resource/obj/box.png'
        this.imgBarrel.src = 'resource/obj/barrel.png'
        this.imgLadder.src = `resource/obj/ladder/1.png`
        this.imgGun.src = 'resource/obj/gun.png'
        this.bucket = new Map()
        this.bucket.set(GAME_OBJ.BOX, boxCount)
        this.bucket.set(GAME_OBJ.BARREL, barrelCount)
        this.bucket.set(GAME_OBJ.LADDER, ladderCount)
        this.bucket.set(GAME_OBJ.GUN, gunCount)
        this.mediatorBucket = new Map();
        this.mediatorBucket.set('1', GAME_OBJ.BOX)
        this.mediatorBucket.set('2', GAME_OBJ.BARREL)
        this.mediatorBucket.set('3', GAME_OBJ.LADDER)
        this.mediatorBucket.set('4', GAME_OBJ.GUN)
    }


// Получение объектов из инвентаря
    handleCreate(key) {
        if (!state.player.isMoving && this.timeDisable === 0 && (key === '1' || key === '2' || key === '3' || key === '4')) {
            state.player.isMoving = false
            this.timeDisable = 1000
            const obj = this.mediatorBucket.get(key)
            let count = this.bucket.get(obj)
            if (this.bucket.get(obj) !== 0) {
                if (obj === GAME_OBJ.BOX) {
                    state.boxes.push(new Box(state.player.x / GRID_SIZE, state.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    state.audio.get(SOUND.NEW_OBJ).playSound();
                } else if (obj === GAME_OBJ.BARREL) {
                    state.boxes.push(new Barrel(state.player.x / GRID_SIZE, state.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    state.audio.get(SOUND.NEW_OBJ).playSound();
                } else if (obj === GAME_OBJ.LADDER) {
                    state.ladders.push(new Ladder(state.player.x / GRID_SIZE, state.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    state.audio.get(SOUND.NEW_OBJ).playSound();
                } else if (obj === GAME_OBJ.GUN) {
                    state.guns.push(new Gun(state.player.x / GRID_SIZE, state.player.y / GRID_SIZE, 1, 1, 'rgb(72,183,28)'))
                    state.audio.get(SOUND.SHOT).playSound();
                }
                this.bucket.set(obj, --count)
            }
            setTimeout(() => {
                this.timeDisable = 0
                state.player.isMoving = true;
            }, this.timeDisable)
        }
    }
    // Добавление объектов в инвентарь
    addObject(obj) {
        let count = this.bucket.get(obj)
        this.bucket.set(obj, ++count)
        state.audio.get(SOUND.NEW_OBJ).playSound();
    }

    draw() {
        ctx.fillStyle = '#2f3136';
        ctx.fillRect(baseWidth - (GRID_SIZE * 4) - 20, 0, GRID_SIZE * 5, GRID_SIZE * 1.5);
        ctx.fillStyle = '#fff';
        ctx.font = '20px "Comic Sans MS", cursive, sans-serif';
        ctx.fillText(`Кл '4`, GRID_SIZE * 19, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get(GAME_OBJ.GUN)}`, GRID_SIZE * 19 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgGun, baseWidth - GRID_SIZE, 30, 40, 40)
        ctx.fillText(`Кл '3'`, GRID_SIZE * 18, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get(GAME_OBJ.LADDER)}`, GRID_SIZE * 18 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgLadder, baseWidth - GRID_SIZE * 2, 30, 40, 40)
        ctx.fillText(`Кл '2'`, GRID_SIZE * 17, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get(GAME_OBJ.BARREL)}`, GRID_SIZE * 17 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgBarrel, baseWidth - GRID_SIZE * 3, 30, 40, 40)
        ctx.fillText(`Кл '1'`, GRID_SIZE * 16, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get(GAME_OBJ.BOX)}`, GRID_SIZE * 16 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgBox, baseWidth - GRID_SIZE * 4, 30, 40, 40)
    }
}