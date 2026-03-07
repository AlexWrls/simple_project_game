import MoveBlock from "../entities/MoveBlock";
import {ctx} from "../constants";

export default class Ladder extends MoveBlock {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `resource/obj/ladder/${height}.png`
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y + 5, this.width, this.height)
    }
}