import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, SOUND, state} from "../constants";

export default class Barrel extends MoveBlock {
    imgStand;
    imgMove;
    zIndex;
    tick;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 2
        this.imgStand = new Image()
        this.imgMove = new Image()
        this.imgStand.src = 'resource/obj/barrel.png'
        this.imgMove.src = 'resource/obj/barrel_move.png'
        this.tick = 0
        setInterval(() => {
            this.tick++
            if (this.tick >= 4) {
                this.tick = 0
            }
        }, 120)
    }

    checkState() {
        if (this.direction !== 0 && !this.isMoving && !this.collision(this.x + this.direction, this.y, [...state.walls, ...state.boxes])) {
            this.targetX = this.x + this.direction
        } else if (!this.isMoving && this.direction !== 0) {
            state.audio.get(SOUND.FALL).playSound()
            this.targetX = this.x
            this.direction = 0
        }
    }

    draw() {
        if (!this.isMoving) {
            ctx.drawImage(this.imgStand, this.x, this.y, GRID_SIZE + 35, GRID_SIZE + 35)
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
                this.imgMove,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x), Math.floor(this.y),
                Math.floor(scaledWidth + 35), Math.floor(scaledHeight + 35),  // конечные координаты (x,y,w,h)
            );
        }
    }
}