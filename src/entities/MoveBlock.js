import {GRID_SIZE, SOUND, state} from "../constants";
import Block from "./Block";

export default class MoveBlock extends Block {

    isMoving;
    targetX;
    targetY;
    steps;
    moveSpeed;
    isFalling;
    direction;
    onLadder;


    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.isMoving = false;
        this.targetX = x * GRID_SIZE;
        this.targetY = y * GRID_SIZE;
        this.steps = 0;
        this.moveSpeed = 1;
        this.isFalling = false;
        this.direction = 0;
        this.onLadder = false;
    }

    collision(x, y, objs) {
        for (const obj of objs) {
            if (this.id === obj.id) {
                continue
            }
            if (x < obj.targetX + obj.width &&
                this.width + x > obj.targetX &&
                y < obj.targetY + obj.height &&
                this.height + y > obj.targetY) {
                return true
            }
        }
        return false
    }

    move() {
        this.isMoving = true
        const dx = this.x - this.targetX;
        const dy = this.y - this.targetY;


        if (dy === 0 && dx === 0) {
            this.isMoving = false
            if (this.isFalling) {
               state.audio.get(SOUND.FALL).playSound()
            }
            this.isFalling = false
            return
        }
        this.steps += 1
        const dirX = dx < 1 ? this.moveSpeed : -this.moveSpeed
        const dirY = dy < 1 ? this.moveSpeed : -this.moveSpeed

        this.x += dirX
        this.y += dirY
    }

}
