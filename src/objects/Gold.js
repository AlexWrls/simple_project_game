import MoveBlock from "../entities/MoveBlock";
import {ctx, GAME_OBJ, GRID_SIZE} from "../constants";

export default class Gold extends MoveBlock {
    imgStand;
    imgStandSrc;
    zIndex;
    tick;

    constructor(x, y, color, imgStandSrc) {
        super(x, y, 1, 1, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStandSrc = imgStandSrc
        this.imgStand.src = imgStandSrc
        this.tick = 0
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
        const size = GAME_OBJ.GOLD === this.imgStandSrc ? GRID_SIZE : GRID_SIZE * 0.8
        const scale = Math.min(size / srcWidth, size / srcHeight);
        const scaledWidth = srcWidth * scale;
        const scaledHeight = srcHeight * scale;

        ctx.drawImage(
            this.imgStand,        // изображение спрайт-листа
            Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
            Math.floor(this.x), Math.floor(this.y),
            Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
        );
    }
}