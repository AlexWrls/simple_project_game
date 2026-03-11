import MoveBlock from "../entities/MoveBlock";
import {ctx, SOUND, state} from "../constants";

export default class Button extends MoveBlock {
    imgStand;
    imgPush;
    active;
    wasActive;
    type;
    zIndex;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.type = type
        this.active = false
        this.wasActive = false
        this.imgStand = new Image()
        this.imgPush = new Image()
        this.imgStand.src = `resource/obj/gate/btn_${this.type}.png`
        this.imgPush.src = `resource/obj/gate/btn_${this.type}_push.png`
    }

    checkState() {
        if (this.active) {
            if (!this.wasActive) {
               state.audio.get(SOUND.BTN).playSound()
                this.wasActive = true
            }
        } else {
            if (this.wasActive) {
               state.audio.get(SOUND.BTN).playSound()
                this.wasActive = false
            }
        }
    }

    draw() {
        ctx.drawImage(this.active ? this.imgPush : this.imgStand, this.x, this.y + 25, this.width, this.height)
    }
}