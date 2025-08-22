class Rect {
    id;
    x;
    y;
    width;
    height;
    color;

    constructor(x, y, width, height, color) {
        this.id = Math.round(Math.random() * Math.pow(50, 10));
        console.log(this.id)
        this.x = x * GRID_SIZE;
        this.y = y * GRID_SIZE;
        this.width = width * GRID_SIZE;
        this.height = height * GRID_SIZE;
        this.color = color;
    }
}

class MoveRect extends Rect {

    isMoving;
    targetX;
    targetY;
    steps;
    moveSpeed;
    isFalling;
    onLadder;


    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.isMoving = false;
        this.targetX = x * GRID_SIZE;
        this.targetY = y * GRID_SIZE;
        this.steps = 100000;
        this.moveSpeed = 1;
        this.isFalling = false;
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
        this.steps += this.isMoving ? -1 : 0
        this.isMoving = true
        const dx = this.x - this.targetX;
        const dy = this.y - this.targetY;


        if (dy === 0 && dx === 0) {
            this.isMoving = false
            if (this.isFalling) {
                inst.audio.get('fall').play()
            }
            this.isFalling = false
            return
        }
        const dirX = dx < 1 ? this.moveSpeed : -this.moveSpeed
        const dirY = dy < 1 ? this.moveSpeed : -this.moveSpeed

        this.x += dirX
        this.y += dirY
    }

}

class Button extends MoveRect {
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
        this.imgStand.src = `src/obj/gate/btn_${this.type}.png`
        this.imgPush.src = `src/obj/gate/btn_${this.type}_push.png`
    }

    checkState() {
        if (this.active) {
            if (!this.wasActive) {
                inst.audio.get('btn').play()
                this.wasActive = true
            }
        } else {
            if (this.wasActive) {
                inst.audio.get('btn').play()
                this.wasActive = false
            }
        }
    }

    draw() {
        ctx.drawImage(this.active ? this.imgPush : this.imgStand, this.x, this.y + 25, this.width, this.height)
    }
}

class Gate extends MoveRect {
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
        this.buttons = inst.buttons.filter(btn => btn.type === type)
        this.open = this.buttons.some(btn => btn.active)
        this.wasOpen = this.buttons.some(btn => btn.active)
        this.imgClose = new Image()
        this.imgOpen = new Image()
        this.imgClose.src = `src/obj/gate/gate_${this.type}.png`
        this.imgOpen.src = `src/obj/gate/gate_open.png`
    }

    checkState() {
        this.open = this.buttons.some(btn => btn.active) || this.collision(this.x, this.y, [...inst.boxes, inst.player])
        if (this.open) {
            if (!this.wasOpen) {
                inst.audio.get('open').play()
                this.wasOpen = true
            }
        } else {
            if (this.wasOpen) {
                inst.audio.get('close').play()
                this.wasOpen = false
            }
        }
    }

    draw() {
        ctx.drawImage(this.open ? this.imgOpen : this.imgClose, this.x, this.y + 10, GRID_SIZE + 20, GRID_SIZE + 20)
    }
}


class Gold extends MoveRect {
    imgStand;
    zIndex;
    tick;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `src/obj/target1.png`
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
        const scale = Math.min(GRID_SIZE / srcWidth, GRID_SIZE / srcHeight);
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

class Ladder extends MoveRect {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `src/obj/ladder/${height}.png`
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y + 5, this.width, this.height)
    }
}

class Ground extends MoveRect {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `src/obj/ground/${width}.png`
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y, this.width + 20, this.height + 20)
    }
}

class Barrel extends MoveRect {
    imgStand;
    imgMove;
    zIndex;
    direction;
    tick;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 2
        this.direction = 0
        this.imgStand = new Image()
        this.imgMove = new Image()
        this.imgStand.src = 'src/obj/barrel.png'
        this.imgMove.src = 'src/obj/barrel_move.png'
        this.tick = 0
        setInterval(() => {
            this.tick++
            if (this.tick >= 4) {
                this.tick = 0
            }
        }, 120)
    }

    checkState() {
        if (this.direction !== 0 && !this.isMoving && !this.collision(this.x + this.direction, this.y, [...inst.walls, ...inst.boxes])) {
            this.targetX = this.x + this.direction
        } else if (!this.isMoving && this.direction !== 0) {
            inst.audio.get('fall').play()
            this.targetX = this.x
            this.direction = 0
        }
    }

    draw() {
        if (!this.isMoving) {
            ctx.drawImage(this.imgStand, this.x, this.y, GRID_SIZE + 35, GRID_SIZE + 35)
        } else {
            let frame = this.tick % 10;
            let xf = frame * 100;
            const srcWidth = 100;
            const srcHeight = 100;
            //  масштаб по меньшей стороне
            const scale = Math.min(GRID_SIZE / srcWidth, GRID_SIZE / srcHeight);
            const scaledWidth = srcWidth * scale;
            const scaledHeight = srcHeight * scale;

            ctx.drawImage(
                this.imgMove,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x), Math.floor(this.y),
                Math.floor(scaledWidth + 35), Math.floor(scaledHeight + 35),  // конечные координаты (x,y,w,h)
            );
        }
    }
}

class Box extends MoveRect {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 2
        this.imgStand = new Image()
        this.imgStand.src = 'src/obj/box.png'
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y, GRID_SIZE + 20, GRID_SIZE + 20)
    }

    checkState() {
    }
}

class Player extends MoveRect {

    imgLeft;
    imgRight;
    imgRightPush;
    imgLeftPush;
    imgStand;
    imgFalling;
    imgLadder;
    isPush;
    tick;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.isPush = false
        this.imgLeft = new Image()
        this.imgRight = new Image()
        this.imgRightPush = new Image()
        this.imgLeftPush = new Image()
        this.imgStand = new Image()
        this.imgStand = new Image()
        this.imgFalling = new Image()
        this.imgLadder = new Image()
        this.imgLeft.src = 'src/player/10-cat-left.png'
        this.imgRight.src = 'src/player/10-cat-right.png'
        this.imgRightPush.src = 'src/player/cat-right-push.png'
        this.imgLeftPush.src = 'src/player/cat-left-push.png'
        this.imgStand.src = 'src/player/cat-stand.png'
        this.imgFalling.src = 'src/player/cat-fail.png'
        this.imgLadder.src = 'src/player/cat-ladder.png'
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
        const offsetX = (GRID_SIZE - scaledWidth) / 2;
        const offsetY = (GRID_SIZE - scaledHeight) / 2;

        let frame = this.tick % 10;
        let xf = frame * 83;
        inst.keys = !this.isMoving && inst.eventKey === 'stop' ? 'stop' : inst.keys
        const left = inst.keys === 'ArrowLeft'
        const right = inst.keys === 'ArrowRight'
        const up = inst.keys === 'ArrowUp'
        const down = inst.keys === 'ArrowDown'
        if (!this.isMoving && !left && !right && !up && !down) {
            inst.audio.get('step').pause()
            ctx.drawImage(this.imgStand, this.x + offsetX, this.y + offsetY, scaledWidth + 5, scaledHeight + 5)
        } else {
            let imgLeft
            let imgRight
            if (this.isFalling) {
                inst.audio.get('step').pause()
                imgLeft = imgRight = this.imgFalling
            } else if (this.onLadder && !left && !right) {
                imgLeft = imgRight = this.imgLadder
            } else {
                imgLeft = this.isPush ? this.imgLeftPush : this.imgLeft
                imgRight = this.isPush ? this.imgRightPush : this.imgRight
            }
            ctx.drawImage(
                left ? imgLeft : imgRight,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),
                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
            );
        }
    }
}