import MoveBlock from "../entities/MoveBlock";
import {ctx, GRID_SIZE, SOUND, state} from "../constants";


export default class Player extends MoveBlock {
    imgLeft;
    imgRight;
    imgRightPush;
    imgLeftPush;
    imgLeftGun;
    imgRightGun;
    imgStand;
    imgFalling;
    imgLadder;
    isPush;
    isGun;
    tick;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.isPush = false
        this.isGun = false
        this.imgLeft = new Image()
        this.imgRight = new Image()
        this.imgRightPush = new Image()
        this.imgLeftPush = new Image()
        this.imgLeftGun = new Image()
        this.imgRightGun = new Image()
        this.imgStand = new Image()
        this.imgFalling = new Image()
        this.imgLadder = new Image()
        this.imgLeft.src = 'resource/player/10-cat-left.png'
        this.imgRight.src = 'resource/player/10-cat-right.png'
        this.imgRightPush.src = 'resource/player/cat-right-push.png'
        this.imgLeftPush.src = 'resource/player/cat-left-push.png'
        this.imgLeftGun.src = 'resource/player/cat-left-gun.png'
        this.imgRightGun.src = 'resource/player/cat-right-gun.png'
        this.imgStand.src = 'resource/player/cat-stand.png'
        this.imgFalling.src = 'resource/player/cat-fail.png'
        this.imgLadder.src = 'resource/player/cat-ladder.png'
        this.tick = 0
        setInterval(() => {
            this.tick++
            if (this.tick >= 10) {
                this.tick = 0
            }
        }, 60)
    }

    draw() {
        const srcWidth = 85;
        const srcHeight = 110;

        //  масштаб по меньшей стороне
        const scale = Math.min(GRID_SIZE / srcWidth, GRID_SIZE / srcHeight);
        const scaledWidth = 40 + srcWidth * scale;
        const scaledHeight = 40 + srcHeight * scale;

        // центрирование
        const offsetX = (GRID_SIZE - scaledWidth) / 3;
        const offsetY = (GRID_SIZE - scaledHeight) / 2;

        let frame = this.tick % 10;
        let xf = frame * 83;
        state.keys = !this.isMoving && state.eventKey === 'stop' ? 'stop' : state.keys
        const left = state.keys === 'ArrowLeft'
        const right = state.keys === 'ArrowRight'
        const up = state.keys === 'ArrowUp'
        const down = state.keys === 'ArrowDown'
        // определение направления движения
        if (Math.abs(state.player.x - state.player.targetX) > 20) {
            state.player.direction = state.player.x - state.player.targetX > 0 ? 'ArrowLeft' : 'ArrowRight';
        }
        if (this.isGun) {
            this.tick = 0
            this.isMoving = false
            ctx.drawImage(
                this.direction === 'ArrowLeft' ? this.imgLeftGun : this.imgRightGun,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),
                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
            );
        } else if (!this.isMoving && !left && !right && !up && !down) {
            state.audio.get(SOUND.STEP).pauseSound()
            ctx.drawImage(this.imgStand, this.x + offsetX, this.y + offsetY, scaledWidth + 5, scaledHeight + 5)
        } else {
            let imgLeft
            let imgRight
            if (this.isFalling) {
                state.audio.get(SOUND.STEP).pauseSound()
                imgLeft = imgRight = this.imgFalling
            } else if (this.onLadder && !left && !right) {
                imgLeft = imgRight = this.imgLadder
            } else {
                imgLeft = this.isPush ? this.imgLeftPush : this.imgLeft
                imgRight = this.isPush ? this.imgRightPush : this.imgRight
            }
            ctx.drawImage(
                left || state.player.x - state.player.targetX > 0 ? imgLeft : imgRight,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),
                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
            );
        }
    }
}
