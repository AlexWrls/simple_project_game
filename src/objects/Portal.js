import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, state} from "../constants";

export default class Portal extends MoveBlock {
    imgMove;
    type;
    isLock;
    zIndex;
    tick;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.imgMove = new Image()
        // TODO нарисовать порталы
        this.imgMove.src = `resource/obj/portal/blue.png`;
        this.type = type
        this.zIndex = -99;
        this.isLock = false;
        this.tick = 0;
        setInterval(() => {
            this.tick++
            if (this.tick >= 4) {
                this.tick = 0
            }
        }, 120)
    }


    draw() {
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
            Math.floor(xf), 0, Math.floor(srcWidth - GRID_SIZE / 2), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
            Math.floor(this.x - GRID_SIZE / 1.2), Math.floor(this.y - GRID_SIZE / 1.5),
            Math.floor(scaledWidth + GRID_SIZE), Math.floor(scaledHeight + GRID_SIZE),  // конечные координаты (x,y,w,h)
        );
    }

    getAnotherPortal() {
        return state.portals.filter(p => p.type === this.type && p.id !== this.id).pop();
    }
}