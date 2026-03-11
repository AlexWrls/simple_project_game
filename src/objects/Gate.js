import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, SOUND, state} from "../constants";

export default class Gate extends MoveBlock {
    imgClose;
    imgOpen;
    open;
    wasOpen;
    buttons;
    zIndex;
    type;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.type = type
        this.buttons = state.buttons.filter(btn => btn.type === type)
        this.open = this.buttons.some(btn => btn.active)
        this.wasOpen = this.buttons.some(btn => btn.active)
        this.imgClose = new Image()
        this.imgOpen = new Image()
        this.imgClose.src = `resource/obj/gate/gate_${this.type}.png`
        this.imgOpen.src = `resource/obj/gate/gate_open.png`
    }

    checkState() {
        this.open = this.buttons.some(btn => btn.active) || this.collision(this.x, this.y, [...state.boxes, state.player])
        if (this.open) {
            if (!this.wasOpen) {
                state.audio.get(SOUND.OPEN).playSound()
                this.wasOpen = true
            }
        } else {
            if (this.wasOpen) {
                state.audio.get(SOUND.CLOSE).playSound()
                this.wasOpen = false
            }
        }
    }

    draw() {
        ctx.drawImage(this.open ? this.imgOpen : this.imgClose, this.x, this.y + 10, GRID_SIZE + 20, GRID_SIZE + 20)
    }
}