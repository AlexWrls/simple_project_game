import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, state} from "../constants";


export default class Box extends MoveBlock {
    imgStand;
    zIndex;
    isSands;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.isSands = false;
        this.zIndex = 2
        this.imgStand = new Image()
        this.imgStand.src = 'resource/obj/box.png'
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y, GRID_SIZE + 20, GRID_SIZE + 20)
    }

    checkState() {
        if (this.collision(this.x, this.y, [...state.sands])) {
            this.isSands = true;
        }
    }
}