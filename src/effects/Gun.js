import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, SOUND, state} from "../constants";

export default class Gun extends MoveBlock {
    direction;
    zIndex;
    imgBang;
    imgBull;
    tick;
    bang;
    coll;

    constructor(x, y, width, height, color) {
        super(x, y, width / 2, height / 2, color);
        this.zIndex = 99
        this.imgBang = new Image();
        this.imgBull = new Image();
        this.imgBang.src = 'resource/obj/bang.png'
        this.imgBull.src = 'resource/obj/bul.png'
        this.moveSpeed = 3
        this.coll = false
        this.direction = state.player.direction === 'ArrowLeft' ? -2 : 2
        this.tick = 0
        this.bang = setInterval(() => {
            this.tick++
            if (this.tick >= 4) {
                this.tick = 0
            }
        }, 30)
        state.player.isGun = true
        setTimeout(() => {
            state.player.isGun = false
        }, 300)
    }

    checkState() {
        this.targetX = this.x + this.direction
        if (this.collision(this.x, this.y, [...state.walls])) {
            this.direction = 0
            state.guns = state.guns.filter(g => g.id !== this.id)
            state.audio.get(SOUND.NEW_OBJ).playSound();
        }
        for (const box of [...state.boxes]) {
            if (box.collision(box.x, box.y, [this])) {
                this.x = box.x
                this.direction = 0
                if (!this.coll) {
                    this.tick = 0
                    state.audio.get(SOUND.BANG).playSound()
                }
                this.coll = true
                setTimeout(() => {
                    state.guns = state.guns.filter(g => g.id !== this.id)
                    state.boxes = state.boxes.filter(b => b.id !== box.id)
                    clearInterval(this.bang)
                }, 300)
            }
        }
    }

    draw() {
        if (!this.coll) {
            ctx.drawImage(this.imgBull, this.x, this.y + GRID_SIZE / 4, GRID_SIZE, GRID_SIZE / 2)
        } else {
            let frame = this.tick % 10;
            let xf = frame * 100;
            const srcWidth = 100;
            const srcHeight = 100;
            //  масштаб по меньшей стороне
            const scale = Math.min(GRID_SIZE / srcWidth, GRID_SIZE / srcHeight);
            const scaledWidth = srcWidth * scale;
            const scaledHeight = srcHeight * scale;

            ctx.drawImage(
                this.imgBang,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight + GRID_SIZE),  // исходные координаты (x,y,w,h)
                Math.floor(this.x), Math.floor(this.y),
                Math.floor(scaledWidth * 2), Math.floor(scaledHeight * 2.5),  // конечные координаты (x,y,w,h)
            );
        }
    }
}