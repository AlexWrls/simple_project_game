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
    active;
    type;
    zIndex;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.type = type
        this.active = false
        this.imgStand = new Image()
    }

    checkState() {
        if (this.active) {
            this.imgStand.src = `src/obj/gate/btn_${this.type}_push.png`
        } else {
            this.imgStand.src = `src/obj/gate/btn_${this.type}.png`
        }
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y + 25, this.width, this.height)
    }
}

class Gate extends MoveRect {
    imgStand;
    open;
    buttons;
    zIndex;
    type;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.zIndex = 10
        this.type = type
        this.buttons = inst.buttons.filter(btn => btn.type === type)
        this.open = this.buttons.some(btn => btn.active)
        this.imgStand = new Image()
    }

    checkState() {
        this.open = this.buttons.some(btn => btn.active) || this.collision(this.x, this.y, [...inst.boxes, inst.player])
        if (this.open) {
            this.imgStand.src = `src/obj/gate/gate_open.png`
        } else {
            this.imgStand.src = `src/obj/gate/gate_${this.type}.png`
        }
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x, this.y + 10, GRID_SIZE + 20, GRID_SIZE + 20)
    }
}


class Gold extends MoveRect {
    imgStand;
    zIndex;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 1
        this.imgStand = new Image()
        this.imgStand.src = `src/obj/target.png`
    }

    draw() {
        ctx.drawImage(this.imgStand, this.x + 20, this.y + 25, GRID_SIZE - 10, GRID_SIZE - 10)
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
        //  масштаб по меньшей стороне
        ctx.drawImage(this.imgStand, this.x, this.y, this.width + 20, this.height + 20)
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
        //  масштаб по меньшей стороне
        ctx.drawImage(this.imgStand, this.x, this.y, GRID_SIZE + 20, GRID_SIZE + 20)
    }
}

class Player extends MoveRect {

    imgLeft;
    imgRight;
    imgRightPush;
    imgLeftPush;
    imgStand;
    imgFalling;
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
        this.imgLeft.src = 'src/player/10-cat-left.png'
        this.imgRight.src = 'src/player/10-cat-right.png'
        this.imgRightPush.src = 'src/player/cat-right-push.png'
        this.imgLeftPush.src = 'src/player/cat-left-push.png'
        this.imgStand.src = 'src/player/cat-stand.png'
        this.imgFalling.src = 'src/player/cat-fail.png'
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
        if (!this.isMoving && !left && !right) {
            ctx.drawImage(this.imgStand, this.x + offsetX, this.y + offsetY, scaledWidth + 5, scaledHeight + 5)
        } else {
            let imgLeft
            let imgRight
            if (this.isFalling) {
                imgLeft = imgRight = this.imgFalling
            } else {
                imgLeft = this.isPush ? this.imgLeftPush : this.imgLeft
                imgRight = this.isPush ? this.imgRightPush : this.imgRight
            }
            ctx.drawImage(
                this.targetX <= this.x && left ? imgLeft : imgRight,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),
                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
            );
        }
    }
}