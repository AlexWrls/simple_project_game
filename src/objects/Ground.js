import MoveBlock from "../entities/MoveBlock";
import {ctx} from "../constants";

export default class Ground extends MoveBlock {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `resource/obj/ground/${width}.png`
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y, this.width + 20, this.height + 20)
    }
}