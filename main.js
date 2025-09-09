class Rect {
    id;
    x;
    y;
    width;
    height;
    color;

    constructor(x, y, width, height, color) {
        if (this.constructor === Rect) {
            throw new Error("class Rect является абстрактным классом, от его не создаются экземпляры!!!")
        }
        if (this.draw === Rect.prototype.draw) {
            throw new Error("Метот draw2() не переопередлен!!!")
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

class MoveRect extends Rect {

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
                inst.audio.get('fall').play()
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
    tick;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.zIndex = 2
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

class Portal extends MoveRect {

    imgMove;
    type;
    isLock;
    zIndex;
    tick;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.imgMove = new Image()
        // TODO нарисовать порталы
        this.imgMove.src = `src/obj/portal/blue.png`;
        this.type = type
        this.zIndex = -99;
        this.isLock = false;
        this.tick = 0;
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
            this.imgMove,        // изображение спрайт-листа
            Math.floor(xf), 0, Math.floor(srcWidth - GRID_SIZE / 2), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
            Math.floor(this.x - GRID_SIZE / 1.2), Math.floor(this.y - GRID_SIZE / 1.5),
            Math.floor(scaledWidth + GRID_SIZE), Math.floor(scaledHeight + GRID_SIZE),  // конечные координаты (x,y,w,h)
        );
    }

    getAnotherPortal() {
        return inst.portals.filter(p => p.type === this.type && p.id !== this.id).pop();
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

class Inventory {

    bucket;
    mediatorBucket;
    imgBox;
    imgBarrel;
    imgLadder;
    imgGun;
    box = 'box'
    barrel = 'barrel'
    ladder = 'ladder'
    gun = 'gun'
    timeDisable;

    constructor(boxCount, barrelCount, ladderCount, gunCount) {
        this.timeDisable = 0
        this.imgBox = new Image();
        this.imgBarrel = new Image();
        this.imgLadder = new Image();
        this.imgGun = new Image();
        this.imgBox.src = 'src/obj/box.png'
        this.imgBarrel.src = 'src/obj/barrel.png'
        this.imgLadder.src = `src/obj/ladder/1.png`
        this.imgGun.src = 'src/obj/gun.png'
        this.bucket = new Map()
        this.bucket.set(this.box, boxCount)
        this.bucket.set(this.barrel, barrelCount)
        this.bucket.set(this.ladder, ladderCount)
        this.bucket.set(this.gun, gunCount)
        this.mediatorBucket = new Map();
        this.mediatorBucket.set('1', this.box)
        this.mediatorBucket.set('2', this.barrel)
        this.mediatorBucket.set('3', this.ladder)
        this.mediatorBucket.set('4', this.gun)
    }


// Создание объектов из инвентаря
    handleCreate(key) {
        if (!inst.player.isMoving && this.timeDisable === 0 && (key === '1' || key === '2' || key === '3' || key === '4')) {
            inst.player.isMoving = false
            this.timeDisable = 1000
            const obj = this.mediatorBucket.get(key)
            let count = this.bucket.get(obj)
            if (this.bucket.get(obj) !== 0) {
                if (obj === this.box) {
                    inst.boxes.push(new Box(inst.player.x / GRID_SIZE, inst.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    inst.audio.get('newObj').play();
                } else if (obj === this.barrel) {
                    inst.boxes.push(new Barrel(inst.player.x / GRID_SIZE, inst.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    inst.audio.get('newObj').play();
                } else if (obj === this.ladder) {
                    inst.ladders.push(new Ladder(inst.player.x / GRID_SIZE, inst.player.y / GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))
                    inst.audio.get('newObj').play();
                } else if (obj === this.gun) {
                    inst.guns.push(new Gun(inst.player.x / GRID_SIZE, inst.player.y / GRID_SIZE, 1, 1, 'rgb(72,183,28)'))
                    inst.audio.get('shot').play();
                }
                this.bucket.set(obj, --count)
            }
            setTimeout(() => {
                this.timeDisable = 0
                inst.player.isMoving = true;
            }, this.timeDisable)
        }
    }

    draw() {
        ctx.fillStyle = '#2f3136';
        ctx.fillRect(baseWidth - (GRID_SIZE * 4) - 20, 0, GRID_SIZE * 5, GRID_SIZE * 1.5);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Calibri';
        ctx.fillText(`Кл '4`, GRID_SIZE * 19, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get('gun')}`, GRID_SIZE * 19 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgGun, baseWidth - GRID_SIZE, 30, 40, 40)
        ctx.fillText(`Кл '3'`, GRID_SIZE * 18, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get('ladder')}`, GRID_SIZE * 18 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgLadder, baseWidth - GRID_SIZE * 2, 30, 40, 40)
        ctx.fillText(`Кл '2'`, GRID_SIZE * 17, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get('barrel')}`, GRID_SIZE * 17 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgBarrel, baseWidth - GRID_SIZE * 3, 30, 40, 40)
        ctx.fillText(`Кл '1'`, GRID_SIZE * 16, GRID_SIZE * 0.3);
        ctx.fillText(`${this.bucket.get('box')}`, GRID_SIZE * 16 + 14, GRID_SIZE * 1.4);
        ctx.drawImage(this.imgBox, baseWidth - GRID_SIZE * 4, 30, 40, 40)
    }
}

class Gun extends MoveRect {

    direction;
    zIndex;
    imgBang;
    imgBull;
    tick;
    bang;
    coll;

    constructor(x, y, width, height, color) {
        super(x, y, width / 2, height / 2, color);
        this.zIndex = 99
        this.imgBang = new Image();
        this.imgBull = new Image();
        this.imgBang.src = 'src/obj/bang.png'
        this.imgBull.src = 'src/obj/bul.png'
        this.moveSpeed = 3
        this.coll = false
        this.direction = inst.player.direction === 'ArrowLeft' ? -2 : 2
        this.tick = 0
        this.bang = setInterval(() => {
            this.tick++
            if (this.tick >= 4) {
                this.tick = 0
            }
        }, 30)
        inst.player.isGun = true
        setTimeout(() => {
            inst.player.isGun = false
        }, 300)
    }

    checkState() {
        this.targetX = this.x + this.direction
        if (this.collision(this.x, this.y, [...inst.walls])) {
            this.direction = 0
            inst.guns = inst.guns.filter(g => g.id !== this.id)
            inst.audio.get('newObj').play();
        }
        for (const box of [...inst.boxes]) {
            if (box.collision(box.x, box.y, [this])) {
                this.x = box.x
                this.direction = 0
                if (!this.coll) {
                    this.tick = 0
                    inst.audio.get('bang').play()
                }
                this.coll = true
                setTimeout(() => {
                    inst.guns = inst.guns.filter(g => g.id !== this.id)
                    inst.boxes = inst.boxes.filter(b => b.id !== box.id)
                    clearInterval(this.bang)
                }, 300)
            }
        }
    }

    draw() {
        if (!this.coll) {
            ctx.drawImage(this.imgBull, this.x, this.y + GRID_SIZE / 4, GRID_SIZE, GRID_SIZE / 2)
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
                this.imgBang,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight + GRID_SIZE),  // исходные координаты (x,y,w,h)
                Math.floor(this.x), Math.floor(this.y),
                Math.floor(scaledWidth * 2), Math.floor(scaledHeight * 2.5),  // конечные координаты (x,y,w,h)
            );
        }
    }
}

class Player extends MoveRect {

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
        this.imgLeft.src = 'src/player/10-cat-left.png'
        this.imgRight.src = 'src/player/10-cat-right.png'
        this.imgRightPush.src = 'src/player/cat-right-push.png'
        this.imgLeftPush.src = 'src/player/cat-left-push.png'
        this.imgLeftGun.src = 'src/player/cat-left-gun.png'
        this.imgRightGun.src = 'src/player/cat-right-gun.png'
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
        const offsetX = (GRID_SIZE - scaledWidth) / 3;
        const offsetY = (GRID_SIZE - scaledHeight) / 2;

        let frame = this.tick % 10;
        let xf = frame * 83;
        inst.keys = !this.isMoving && inst.eventKey === 'stop' ? 'stop' : inst.keys
        const left = inst.keys === 'ArrowLeft'
        const right = inst.keys === 'ArrowRight'
        const up = inst.keys === 'ArrowUp'
        const down = inst.keys === 'ArrowDown'
        // определение направления движения
        if (Math.abs(inst.player.x - inst.player.targetX) > 20) {
            inst.player.direction = inst.player.x - inst.player.targetX > 0 ? 'ArrowLeft' : 'ArrowRight';
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
                left || inst.player.x - inst.player.targetX > 0 ? imgLeft : imgRight,        // изображение спрайт-листа
                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)
                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),
                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)
            );
        }
    }
}