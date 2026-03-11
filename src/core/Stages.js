import Box from "../objects/Box";
import Player from "../objects/Player";
import {GAME_OBJ, state} from "../constants";
import Ground from "../objects/Ground";
import Inventory from "../ui/Inventory";
import Gold from "../objects/Gold";
import Ladder from "../objects/Ladder";
import Button from "../objects/Button";
import Gate from "../objects/Gate";
import Barrel from "../objects/Barrel";
import Item from "../objects/Item";
import Portal from "../objects/Portal";


export default class Stages {

    stages

    constructor() {
        this.stages = this.initLevels()
    }

    loadLevel(num) {
        state.player = null
        state.target = null
        state.boxes = []
        state.walls = []
        state.ladders = []
        state.buttons = []
        state.gates = []
        state.portals = []
        state.guns = []
        state.objects = []
        state.inventory = new Inventory(0, 0, 0, 0)
        this.stages.get(num)()
    }

    getReloadLevelText() {
        const txt = [
            'Повернуть бы время вспать!',
            'Сдаюсь. Ты подебил!',
            'Просто будь совой!',
            'Русалка утопилась!',
            'Ты не ты, когды ты холоден!',
            'Больше знаешь, крепче мстишь!',
            'Удачного дна!',
        ]
        return txt[Math.floor(Math.random() * txt.length)] + ' Попробую еще раз =)';
    }

    initLevels() {
        const stages = new Map();

        // Первй уровень
        stages.set(1, () => {
            state.stageDescription = 'Я легко втираюсь в доверие'
            // walls
            state.walls.push(new Ground(3, 8, 8, 1, 'rgba(2,138,12,1)'))
            // inventory
            state.inventory = new Inventory(5, 5, 5, 5)

            state.player = new Player(3, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(10, 7, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });
// Второй уровень
        stages.set(2, () => {
            state.stageDescription = 'Собака, если ее позвать, прибежит, кот — примет к сведению.'
            // walls
            state.walls.push(new Ground(1, 8, 4, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(6, 8, 5, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(13, 8, 3, 1, 'rgba(2,138,12,1)'))

            state.walls.push(new Ground(4, 5, 2, 1, 'rgba(2,138,12,1)'))

            state.walls.push(new Ground(5, 9, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(11, 9, 2, 1, 'rgba(2,138,12,1)'))
            // ladders
            state.ladders.push(new Ladder(3, 5, 1, 3, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(8, 6, 1, 2, 'rgba(225,225,224,1)'))

            // boxes
            state.boxes.push(new Box(5, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(2, 7, 1, 1, 'rgba(183,113,28,1)'))

            state.player = new Player(7, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(14, 7, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });


// Третий уровень
        stages.set(3, () => {
            state.stageDescription = 'Жизненный опыт показывает, что провинившиеся коты хорошо\n понимают азбуку Морзе. Только стучать надо тапком по морде.'
            // walls
            state.walls.push(new Ground(2, 8, 10, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 4, 2, 1, 'rgba(2,138,12,1)'))

            // ladders
            state.ladders.push(new Ladder(6, 4, 1, 4, 'rgba(225,225,224,1)'))

            // boxes
            state.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(10, 7, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(5, 2, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(5, 3, 1, 1, 'rgba(183,113,28,1)'))

            state.player = new Player(4, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(11, 7, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Четвертый уровень
        stages.set(4, () => {
            state.stageDescription = 'А ты чего кошечку не заводишь? \nКто тебе на старости лет стакан воды со стола опрокинет?'
            // walls
            state.walls.push(new Ground(6, 3, 5, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(2, 5, 13, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(1, 8, 7, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(9, 8, 7, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 13, 9, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(2, 12, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(12, 12, 3, 1, 'rgba(2,138,12,1)'))
            // ladders
            state.ladders.push(new Ladder(8, 8, 1, 5, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(8, 1, 1, 2, 'rgba(225,225,224,1)'))
            // boxes
            state.boxes.push(new Box(2, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(3, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(13, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(14, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 10, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 11, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 12, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(7, 2, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 2, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 1, 1, 1, 'rgba(183,113,28,1)'))


            state.player = new Player(8, 2, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(2, 11, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Пятый уровень
        stages.set(5, () => {
            state.stageDescription = 'Кошки — одни из немногих животных, которые убивают просто\n ради удовольствия. Моя ради удовольствия убила мою мебель.'
            // walls
            state.walls.push(new Ground(1, 8, 15, 1, 'rgba(2,138,12,1)'))
            // ladders
            state.ladders.push(new Ladder(6, 4, 1, 4, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(10, 4, 1, 4, 'rgba(225,225,224,1)'))
            // boxes
            state.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))

            // buttons
            state.buttons.push(new Button(8, 7, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))
            state.gates.push(new Gate(13, 7, 1, 1, 'rgb(138,22,2)', 'blue'))

            state.player = new Player(4, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(15, 7, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Шестой уровень
        stages.set(6, () => {
            state.stageDescription = 'Подлокотник — это место для подлого кота.'
            // walls
            state.walls.push(new Ground(1, 10, 13, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(14, 11, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(15, 10, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 7, 6, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(3, 4, 4, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(8, 4, 5, 1, 'rgba(2,138,12,1)'))
            // ladders
            state.ladders.push(new Ladder(10, 7, 1, 3, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(7, 4, 1, 3, 'rgba(225,225,224,1)'))
            // boxes
            state.boxes.push(new Box(3, 3, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(4, 3, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(4, 2, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 1, 1, 1, 'rgba(183,113,28,1)'))


            // buttons
            state.buttons.push(new Button(2, 9, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))
            state.buttons.push(new Button(8, 9, 1, 1, 'rgba(138,22,2,0.5)', 'yellow'))
            //gate
            state.gates.push(new Gate(9, 3, 1, 1, 'rgb(138,22,2)', 'blue'))
            state.gates.push(new Gate(13, 9, 1, 1, 'rgb(138,22,2)', 'yellow'))

            state.player = new Player(4, 9, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(15, 9, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Седьмой уровень
        stages.set(7, () => {
            state.stageDescription = 'Все коты умеют летать. Летают коты сверху вниз.'
            // walls
            state.walls.push(new Ground(1, 10, 6, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(9, 10, 5, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(14, 11, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(15, 10, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(6, 2, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(7, 11, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(6, 2, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(9, 7, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(3, 2, 2, 1, 'rgba(2,138,12,1)'))

            // ladders
            state.ladders.push(new Ladder(5, 2, 1, 7, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(12, 7, 1, 3, 'rgba(225,225,224,1)'))

            // boxes
            state.boxes.push(new Box(12, 9, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 3, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 5, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(9, 6, 1, 1, 'rgba(183,113,28,1)'))

            state.boxes.push(new Barrel(4, 1, 1, 1, 'rgba(183,113,28,1)'))
            // objects
            state.objects.push(new Item(15, 9, 'rgb(164,105,227)', GAME_OBJ.BOX))
            // buttons
            state.buttons.push(new Button(1, 9, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))
            state.buttons.push(new Button(14, 10, 1, 1, 'rgba(234,223,0,0.5)', 'yellow'))
            //gate
            state.gates.push(new Gate(7, 1, 1, 1, 'rgb(138,22,2)', 'blue'))
            state.gates.push(new Gate(3, 1, 1, 1, 'rgb(132,127,26)', 'yellow'))

            state.player = new Player(9, 9, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(8, 1, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Восьмой уровень
        stages.set(8, () => {
            state.stageDescription = 'Однажды мне домой хомяка в клетке принесли. \nТак у меня появился телевизор.'
            // walls
            state.walls.push(new Ground(7, 7, 6, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(1, 12, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(3, 13, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 12, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(5, 13, 1, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(6, 14, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(8, 13, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(10, 12, 9, 1, 'rgba(2,138,12,1)'))
            // boxes
            state.boxes.push(new Barrel(6, 0, 1, 1, 'rgba(183,113,28,1)'))
            // objects
            state.objects.push(new Item(10, 6, 'rgb(164,105,227)', GAME_OBJ.BARREL))
            state.objects.push(new Item(9, 6, 'rgb(164,105,227)', GAME_OBJ.BARREL))
            // ladders
            state.ladders.push(new Ladder(13, 7, 1, 5, 'rgba(225,225,224,1)'))
            // buttons
            state.buttons.push(new Button(7, 13, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))
            state.buttons.push(new Button(15, 11, 1, 1, 'rgba(138,22,2,0.5)', 'yellow'))
            state.buttons.push(new Button(9, 12, 1, 1, 'rgba(138,22,2,0.5)', 'red'))
            //gate
            state.gates.push(new Gate(3, 12, 1, 1, 'rgb(138,22,2)', 'blue'))
            state.gates.push(new Gate(10, 11, 1, 1, 'rgb(132,127,26)', 'yellow'))
            state.gates.push(new Gate(6, 2, 1, 1, 'rgb(132,127,26)', 'red'))

            state.player = new Player(13, 11, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(1, 11, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Девятый уровень
        stages.set(9, () => {
            state.stageDescription = 'Кот — это такое животное, которое на простой вопрос «Куда?»,\n автоматически меняет направление движения в пространстве.'
            // walls
            state.walls.push(new Ground(3, 8, 5, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(10, 8, 5, 1, 'rgba(2,138,12,1)'))
            //portals
            state.portals.push(new Portal(10, 7, 1, 1, '#69d1e3', 'blue'))
            state.portals.push(new Portal(7, 7, 1, 1, '#69d1e3', 'blue'))

            state.player = new Player(13, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(3, 7, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Десятый уровень
        stages.set(10, () => {
            state.stageDescription = 'Главным отличием между животными и людьми то, что животные\n не держат дома людей. Хотя коты уверены в обратном.'
            // walls
            state.walls.push(new Ground(1, 8, 8, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(10, 8, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(13, 9, 4, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(17, 8, 1, 1, 'rgba(2,138,12,1)'))

            state.walls.push(new Ground(4, 5, 5, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(10, 5, 3, 1, 'rgba(2,138,12,1)'))

            state.walls.push(new Ground(1, 12, 12, 1, 'rgba(2,138,12,1)'))

            // boxes
            state.boxes.push(new Barrel(12, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Barrel(7, 7, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(8, 4, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(8, 10, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(8, 11, 1, 1, 'rgba(183,113,28,1)'))

            // ladders
            state.ladders.push(new Ladder(9, 4, 1, 8, 'rgba(225,225,224,1)'))
            // buttons
            state.buttons.push(new Button(5, 11, 1, 1, 'rgba(138,22,2,0.5)', 'red'))
            state.buttons.push(new Button(4, 7, 1, 1, 'rgba(138,22,2,0.5)', 'red'))
            //gate
            state.gates.push(new Gate(2, 11, 1, 1, 'rgb(132,127,26)', 'red'))

            //portals
            state.portals.push(new Portal(1, 7, 1, 1, '#69d1e3', 'blue'))
            state.portals.push(new Portal(17, 7, 1, 1, '#69d1e3', 'blue'))

            state.portals.push(new Portal(12, 11, 1, 1, '#69d1e3', 'red'))
            state.portals.push(new Portal(5, 4, 1, 1, '#69d1e3', 'red'))

            state.player = new Player(11, 7, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(1, 11, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Последний уровень
        stages.set(11, () => {

            state.stageDescription = 'Кастрированный кот Маркиз категорически \nне согласен с утверждением:\n «Все, что нас не убивает, делает нас сильнее»'
            // objects
            state.objects.push(new Item(3, 1, 'rgb(164,105,227)', GAME_OBJ.GUN))
            state.objects.push(new Item(4, 1, 'rgb(164,105,227)', GAME_OBJ.GUN))
            state.objects.push(new Item(5, 1, 'rgb(164,105,227)', GAME_OBJ.GUN))
            // walls
            state.walls.push(new Ground(2, 2, 6, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(3, 6, 8, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(2, 10, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(5, 11, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(7, 10, 4, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(15, 4, 3, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(13, 14, 3, 1, 'rgba(2,138,12,1)'))
            //Ladder
            state.ladders.push(new Ladder(8, 2, 1, 4, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(2, 6, 1, 4, 'rgba(225,225,224,1)'))
            //Box
            state.boxes.push(new Box(6, 1, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(7, 1, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(16, 2, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(14, 12, 1, 1, 'rgb(136,110,0)'))

            // buttons
            state.buttons.push(new Button(16, 3, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))
            state.buttons.push(new Button(14, 13, 1, 1, 'rgba(138,22,2,0.5)', 'red'))
            //gate
            state.gates.push(new Gate(5, 10, 1, 1, 'rgb(138,22,2)', 'blue'))
            state.gates.push(new Gate(6, 10, 1, 1, 'rgb(138,22,2)', 'red'))
            //portals
            state.portals.push(new Portal(15, 9, 1, 1, '#69d1e3', 'blue'))
            state.portals.push(new Portal(3, 13, 1, 1, '#69d1e3', 'blue'))

            state.player = new Player(2, 1, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(9, 9, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });

// Последний уровень
        stages.set(12, () => {

            state.stageDescription = 'Продолжение следует...'
            // inventory
            state.inventory = new Inventory(99, 99, 0, 99)
            // walls
            state.walls.push(new Ground(1, 10, 15, 1, 'rgba(2,138,12,1)'))

            //E
            state.boxes.push(new Barrel(3, 5, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Barrel(3, 6, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Barrel(3, 7, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Barrel(3, 8, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Barrel(3, 9, 1, 1, 'rgba(183,113,28,1)'))
            state.walls.push(new Ground(4, 5, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 7, 2, 1, 'rgba(2,138,12,1)'))
            state.walls.push(new Ground(4, 9, 2, 1, 'rgba(2,138,12,1)'))

            //N
            state.ladders.push(new Ladder(7, 5, 1, 5, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(10, 5, 1, 5, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(8, 7, 1, 2, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(9, 5, 1, 2, 'rgba(225,225,224,1)'))

            //D
            state.boxes.push(new Box(12, 5, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(12, 6, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(12, 7, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(12, 8, 1, 1, 'rgb(136,110,0)'))
            state.boxes.push(new Box(12, 9, 1, 1, 'rgb(136,110,0)'))
            state.walls.push(new Ground(13, 5, 2, 1, 'rgba(2,138,12,1)'))
            state.boxes.push(new Box(15, 6, 1, 1, 'rgba(183,113,28,1)'))
            state.boxes.push(new Box(15, 7, 1, 1, 'rgba(183,113,28,1)'))


            state.ladders.push(new Ladder(13, 9, 1, 1, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(14, 9, 1, 1, 'rgba(225,225,224,1)'))
            state.ladders.push(new Ladder(15, 8, 1, 1, 'rgba(225,225,224,1)'))

            state.player = new Player(9, 9, 1, 1, 'rgba(15,75,208,1)')
            state.target = new Gold(8, 1, 'rgba(105,209,227,1)', GAME_OBJ.GOLD)
        });
        return stages
    }


}