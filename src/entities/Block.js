import {GRID_SIZE} from "../constants";

export default class Block {
    id;
    x;
    y;
    width;
    height;
    color;

    constructor(x, y, width, height, color) {
        if (this.constructor === Block) {
            throw new Error("class Block является абстрактным классом, от его не создаются экземпляры!!!")
        }
        if (this.draw === Block.prototype.draw) {
            throw new Error("Метот draw() не переопередлен!!!")
        }
        this.id = Math.round(Math.random() * Math.pow(50, 10));
        this.x = x * GRID_SIZE;
        this.y = y * GRID_SIZE;
        this.width = width * GRID_SIZE;
        this.height = height * GRID_SIZE;
        this.color = color;
    }

    draw() {
    }

}