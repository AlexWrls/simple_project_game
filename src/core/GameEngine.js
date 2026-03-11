import Stages from './Stages.js';
import {background, baseHeight, baseWidth, canvas, cat, ctx, game_debug, GRID_SIZE, SOUND, state} from "../constants";
import SoundEffect from "./SoundEffect";
import drawSpeechBubble from "../effects/DrawSpeechBubble";

export default class GameEngine {

    stages

    constructor() {
        state.audio = this.initSound()
        this.stages = new Stages();
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        this.preview(undefined,undefined);
    }

    initSound() {
        let map = new Map()

        map.set(SOUND.BACKGROUND, new SoundEffect('back_sound.mp3', 1, 0.3, 1));
        map.set(SOUND.STEP, new SoundEffect('step.mp3', 1.5, 0.4, 1));
        map.set(SOUND.BTN, new SoundEffect('btn.mp3', 1, 1, 5));
        map.set(SOUND.OPEN, new SoundEffect('open.mp3', 3, 0.8, 5));
        map.set(SOUND.CLOSE, new SoundEffect('close.mp3', 3, 0.8, 5));
        map.set(SOUND.FALL, new SoundEffect('fall.mp3', 1.5, 0.6, 5));
        map.set(SOUND.NEW_OBJ, new SoundEffect('new_obj.mp3', 1.5, 0.6, 5));
        map.set(SOUND.PORTAL, new SoundEffect('portal.mp3', 1.5, 0.8, 5));
        map.set(SOUND.NEW_LEVEL, new SoundEffect('new_level.mp3', 1, 0.4, 5));
        map.set(SOUND.RELOAD_LEVEL, new SoundEffect('reload_level.mp3', 1, 1, 1));
        map.set(SOUND.BANG, new SoundEffect('bang.mp3', 1, 0.8, 5));
        map.set(SOUND.SHOT, new SoundEffect('fire.mp3', 1, 0.6, 5));

        return map
    }

    preview(step,reloadText) {
        // document.getElementById('loader').style.display = 'block';
        state.audio.get(SOUND.BACKGROUND).pauseSound()
        clearInterval(state.time)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.stages.loadLevel(state.stage)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#02850c';
        ctx.font = '40px Calibri';
        ctx.fillText(`Уровень ${state.stage}`, 100, 300);
        ctx.fillStyle = '#caccc1';
        ctx.font = '30px Calibri';
        // ctx.fillText(`== ${state.stageDescription} ==`, 400 - (state.stageDescription.length * 3), 400);
        ctx.font = '30px Calibri';
        ctx.fillStyle = '#69d1e3';
        ctx.fillText(`Для начала уровня жми 'Enter' или 'Space'`, 100, 650);
        ctx.fillText(`Переключение уровней: клавиша 'Z'- назад, клавиша 'X' - вперед`, 100, 700);
        ctx.drawImage(cat, 350, 500, 92, 110)
        if (reloadText !== undefined) {
            drawSpeechBubble(ctx, 150, 350, 800, 110, 250, 500, this.stages.getReloadLevelText());
        } else {
            drawSpeechBubble(ctx, 150, 350, 800, 110, 250, 500, state.stageDescription);
        }
        if (step !== undefined) {
            ctx.fillText(`Уровень ${state.stage - 1} пройден за ${step} шагов`, 100, 100);
        }
    }

    initial() {
        this.preview()
        state.audio.get(SOUND.BACKGROUND).setLoop(true)
        state.audio.get(SOUND.BACKGROUND).playSound()
        state.audio.get(SOUND.STEP).setLoop(true)
        state.time = setInterval(() => {
            this.main()
        }, 8)
    }


    main(timestamp) {
        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!game_debug) {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }
        // Расчет FPS
        if (state.lastTime) {
            state.fps = Math.round(1000 / (timestamp - state.lastTime));
        }


        //------ Основное перемещение -------------
        state.player.gravity = !state.player.collision(state.player.x, state.player.y, [...state.ladders])
            && !state.player.collision(state.player.x, state.player.y + GRID_SIZE, [...state.walls, ...state.boxes, ...state.ladders])
        if (state.player.gravity) {
            state.player.targetY = state.player.y + GRID_SIZE;
            state.player.isFalling = true;
            state.player.isMoving = true;
        }
        state.player.move()
        for (const box of state.boxes) {
            box.checkState()
            box.gravity = !box.collision(box.x, box.y + GRID_SIZE, [...state.walls, ...state.boxes, ...state.ladders, state.player])
            if (box.gravity) {
                box.targetY = box.y + GRID_SIZE;
                box.isFalling = true;
                box.isMoving = true;
            }
            box.move()
        }
        //------ /Кнопки - Ворота-------------
        for (const button of state.buttons) {
            button.checkState()
            button.active = state.boxes.some(box => box.collision(box.targetX, box.targetY, [button])) ||
                state.player.collision(state.player.targetX, state.player.targetY, [button])
        }
        for (const gate of state.gates) {
            gate.checkState()
            if (!gate.open && !state.walls.includes(gate)) {
                state.walls.push(gate)
            }
            if (gate.open && state.walls.includes(gate)) {
                state.walls = state.walls.filter(wall => !wall.open)
            }
        }
        //------ /Выстрелы -------------
        for (const gun of [...state.guns]) {
            gun.checkState()
            gun.move()
        }
        //------ /Объекты -------------
        for (const obj of [...state.objects]) {
            if (state.player.collision(state.player.x, state.player.y, [obj])) {
                state.inventory.addObject(obj.imgStandSrc)
                state.objects = state.objects.filter(i => i.id !== obj.id)
            }
        }
        //------ Порталы/ -------------
        for (const portal of [...state.portals]) {
            const outPortal = portal.getAnotherPortal();
            if (!state.player.isMoving && portal.collision(portal.x, portal.y, [state.player])) {
                state.audio.get(SOUND.PORTAL).playSound()
                const dirX = state.player.direction === 'ArrowLeft' ? -GRID_SIZE : GRID_SIZE;
                if (!this.handlePlayerMove(outPortal.x, outPortal.y, outPortal.x + dirX)) {
                    state.player.x = portal.x;
                    state.player.targetX = portal.x - dirX;
                    state.player.y = state.player.targetY = portal.y;
                    state.player.isPush = false;
                    state.player.isMoving = true;
                }
            }
            for (const obj of [...state.boxes]) {
                const dirX = obj.x - state.player.targetX > 1 ? GRID_SIZE : -GRID_SIZE;
                if (!obj.isMoving && portal.collision(portal.x, portal.y, [obj])) {
                    state.audio.get(SOUND.PORTAL).playSound()
                    const objX = obj.x
                    const objY = obj.y
                    obj.x = outPortal.x
                    obj.targetX = outPortal.x + dirX
                    obj.y = obj.targetY = outPortal.y;
                    if (obj.collision(obj.targetX, obj.y, [...state.boxes])) {
                        obj.direction = 0
                        obj.x = objX
                        obj.targetX = portal.x - dirX
                        obj.y = obj.targetY = objY
                        if (obj.collision(obj.targetX, obj.y, [state.player])) {
                            state.player.targetX = state.player.targetX - dirX;
                            state.player.isPush = false;
                            state.player.isMoving = true;
                        }
                    }
                }
            }
            for (const obj of [...state.guns]) {
                const dirX = obj.x - state.player.targetX > 1 ? GRID_SIZE : -GRID_SIZE;
                if (portal.collision(portal.x, portal.y, [obj])) {
                    state.audio.get(SOUND.PORTAL).playSound()
                    obj.x = outPortal.x + dirX
                    obj.targetX = outPortal.x + dirX
                    obj.y = obj.targetY = outPortal.y;
                }
            }
        }

        //------ Кнопки - Ворота/ -------------

        // state.buttons.forEach(e => console.log(e.type + "|" + e.active))
        // state.gates.forEach(e => console.log(e.type + "|" + e.open))
        //-------------------

        if (game_debug) {
            for (const obj of [...state.guns, ...state.portals, ...state.walls, ...state.ladders, ...state.boxes, ...state.buttons, state.target, ...state.objects, state.player]) {
                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                ctx.fillText(`${obj.id}`, obj.x, obj.y);
            }
            //сетка
            for (let i = 0; i < canvas.width; i += GRID_SIZE) {
                for (let j = 0; j < canvas.height; j += GRID_SIZE) {
                    ctx.fillStyle = '#e1e1e0';
                    ctx.font = '12px Calibri';
                    ctx.fillText(`x:${i / GRID_SIZE} y:${j / GRID_SIZE}`, i + 3, j + 25);
                    ctx.strokeRect(i, j, GRID_SIZE, GRID_SIZE);
                }
            }
        } else {
            const drawObj = [...state.portals, state.target, ...state.walls, ...state.boxes, ...state.gates, ...state.buttons]
                .sort((a, b) => a.targetX - b.targetX || b.targetY - a.targetY || b.zIndex - a.zIndex)
            // drawObj.forEach(i=>console.log(i.x))
            for (const obj of [...state.ladders, ...drawObj, ...state.objects, ...state.guns]) {
                obj.draw()
            }
            state.player.draw()
        }

        // Отрисовка информации
        ctx.fillStyle = '#fff';
        ctx.font = '20px "Comic Sans MS", cursive, sans-serif';
        ctx.fillText(`Для начала уровня заново жми 'Enter'`, 10, baseHeight - 20);
        ctx.fillText(`Переключение уровней 'Z'- назад, 'X' - вперед`, 10, baseHeight - 40);
        ctx.fillText(`Отключение музыки  'M'- mute sound`, 10, baseHeight - 60);
        ctx.font = '24px "Comic Sans MS", cursive, sans-serif';
        ctx.fillText(`Шаги: ${Math.round(state.player.steps / GRID_SIZE)}`, baseWidth - GRID_SIZE * 2, baseHeight - GRID_SIZE / 2);
        state.inventory.draw()
        state.lastTime = timestamp;
        //Проверка прохождения
        if (state.player.x === state.target.x && state.player.y === state.target.y) {
            state.audio.get(SOUND.STEP).setLoop(false)
            state.audio.get(SOUND.NEW_LEVEL).playSound()
            state.stage++
            this.preview(Math.round(state.player.steps / GRID_SIZE))
        }
        //Проверка ухода за границу
        if (state.player.x > canvas.width || state.player.y > canvas.height) {
            state.audio.get(SOUND.STEP).setLoop(false)
            state.audio.get(SOUND.RELOAD_LEVEL).playSound()
            this.preview(undefined,true)
        }
    }


    handleKeyDown(event) {
        event.preventDefault();
        this.handlePlayerInput(event.key);
    }

    handleKeyUp(event) {
        event.preventDefault();
        state.eventKey = 'stop'
    }

    handlePlayerInput = (key) => {
        if (key === 'Enter' || key === ' ') {
            this.initial();
        }
        if (key === 'z' || key === 'я') {
            if (state.stage > 1) state.stage--;
            this.preview();
        }
        if (key === 'x' || key === 'ч') {
            if (state.stage < 12) state.stage++;
            this.preview();
        }
        if (key === 'm' || key === 'ь') {
            state.audio.get(SOUND.BACKGROUND).muteSound();
        }

        // Если игрок уже движется
        if (state.player.isMoving || state.player.gravity) {
            return;
        }
        state.inventory.handleCreate(key)
        state.eventKey = key;
        state.keys = key;

        let targetY = key === 'ArrowDown' ? state.player.y + GRID_SIZE : state.player.y - GRID_SIZE;
        let targetX = key === 'ArrowRight' ? state.player.x + GRID_SIZE : state.player.x - GRID_SIZE;

        // Логика движения по лестнице
        state.player.onLadder = state.player.collision(state.player.x, state.player.y, [...state.ladders]) ||
            (key === 'ArrowDown' && state.player.collision(state.player.x, state.player.y + GRID_SIZE, [...state.ladders]));

        if (state.player.onLadder && !state.player.isMoving && !state.player.collision(state.player.x, targetY, [...state.walls]) && ['ArrowUp', 'ArrowDown'].includes(key)) {
            state.player.isPush = false;
            state.player.targetY = targetY;
            state.player.isMoving = true;

            // Логика горизонтального движения
        } else if (['ArrowLeft', 'ArrowRight'].includes(key)) {
            this.handlePlayerMove(state.player.x, state.player.y, targetX)
        }
    };

    //Проверяет перемещение игрока, устанавливает координаты в случае успеха
    // return true - перемещение возможно / false - иначе
    handlePlayerMove(x, y, targetX) {
        console.log("x=" + x + "   targetX=" + targetX)
        state.player.x = x
        state.player.y = y
        let isCollisionBox = false;
        state.audio.get(SOUND.STEP).playSound();

        if (!state.player.isMoving && !state.player.collision(targetX, state.player.y, [...state.walls])) {
            for (const box of [...state.boxes]) {
                if (!box.isMoving && !box.gravity && state.player.collision(targetX, state.player.y, [box])) {
                    console.log(state.player.direction)
                    const dirX = state.player.x - targetX > 0 ? -GRID_SIZE : GRID_SIZE;
                    const boxTargetX = box.x + dirX;
                    state.player.isPush = true;
                    isCollisionBox = true;
                    if (!box.collision(boxTargetX, box.y, [...state.boxes, ...state.walls])) {
                        box.targetX = boxTargetX;
                        box.direction = dirX;
                        box.isMoving = true;
                        state.player.targetX = targetX;
                        state.player.targetY = y;
                        state.player.isMoving = true;
                        return true
                    }
                }
            }
            if (!isCollisionBox) {
                state.player.isPush = false;
                state.player.targetX = targetX;
                state.player.targetY = y;
                state.player.isMoving = true;
                return true
            }
        }
        return false
    }
}