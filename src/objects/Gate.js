import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, SOUND, state} from "../constants";

export default class Gate extends MoveBlock {
    imgClose;
    imgOpen;
    imgColor;
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
        this.imgColor = new Image()
        this.imgClose.src = `resource/obj/gate/gate_common_close.png`
        this.imgOpen.src = `resource/obj/gate/gate_common_open.png`
        this.imgColor.src = `resource/obj/gate/gate_${type}.png`
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
        ctx.drawImage(this.imgColor, this.x, this.y - 10, GRID_SIZE + 40, GRID_SIZE + 40)
    }

    drawCommon() {
        if (this.open) {
            ctx.drawImage(this.imgOpen, this.x, this.y - 10, GRID_SIZE + 40, GRID_SIZE + 40)
        } else {
            ctx.drawImage(this.imgClose, this.x, this.y - 10, GRID_SIZE + 40, GRID_SIZE + 40)
        }
    }
}