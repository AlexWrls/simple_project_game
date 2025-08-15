const stages = new Map();

// Первй уровень
stages.set(1, () => {
    // walls
    inst.walls.push(new Ground(3, 8, 8, 1, 'rgba(2,138,12,1)'))

    inst.player = new Player(3, 7, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(10, 7, 1, 1, 'rgba(105,209,227,1)')
});
// Второй уровень
stages.set(2, () => {
    // walls
    inst.walls.push(new Ground(1, 8, 4, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(6, 8, 5, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(13, 8, 3, 1, 'rgba(2,138,12,1)'))

    inst.walls.push(new Ground(4, 5, 2, 1, 'rgba(2,138,12,1)'))

    inst.walls.push(new Ground(5, 9, 1, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(11, 9, 2, 1, 'rgba(2,138,12,1)'))
    // ladders
    inst.ladders.push(new Ladder(3, 5, 1, 3, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(8, 6, 1, 2, 'rgba(225,225,224,1)'))

    // boxes
    inst.boxes.push(new Box(5, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(2, 7, 1, 1, 'rgba(183,113,28,1)'))

    inst.player = new Player(7, 7, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(14, 7, 1, 1, 'rgba(105,209,227,1)')
});


// Третий уровень
stages.set(3, () => {
    // walls
    inst.walls.push(new Ground(2, 8, 10, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(4, 4, 2, 1, 'rgba(2,138,12,1)'))

    // ladders
    inst.ladders.push(new Ladder(6, 4, 1, 4, 'rgba(225,225,224,1)'))

    // boxes
    inst.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(10, 7, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(5, 2, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(5, 3, 1, 1, 'rgba(183,113,28,1)'))

    inst.player = new Player(4, 7, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(11, 7, 1, 1, 'rgba(105,209,227,1)')
});

// Четвертый уровень
stages.set(4, () => {
    // walls
    inst.walls.push(new Ground(6, 3, 5, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(2, 5, 13, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(1, 8, 7, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(9, 8, 7, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(4, 13, 9, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(2, 12, 3, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(12, 12, 3, 1, 'rgba(2,138,12,1)'))
    // ladders
    inst.ladders.push(new Ladder(8, 8, 1, 5, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(8, 1, 1, 2, 'rgba(225,225,224,1)'))
    // boxes
    inst.boxes.push(new Box(2, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(3, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(13, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(14, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 10, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 11, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9,12, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(7,2, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9,2, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9,1, 1, 1, 'rgba(183,113,28,1)'))


    inst.player = new Player(8, 2, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(2, 11, 1, 1, 'rgba(105,209,227,1)')
});

// Пятый уровень
stages.set(5, () => {
    // walls
    inst.walls.push(new Ground(1, 8, 15, 1, 'rgba(2,138,12,1)'))
    // ladders
    inst.ladders.push(new Ladder(6, 4, 1, 4, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(10, 4, 1, 4, 'rgba(225,225,224,1)'))
    // boxes
    inst.boxes.push(new Box(9, 7, 1, 1, 'rgba(183,113,28,1)'))

    // buttons
    inst.buttons.push(new Button(8, 7, 1, 1, 'rgba(138,22,2,0.5)','blue'))
    inst.gates.push(new Gate(13, 7, 1, 1, 'rgb(138,22,2)','blue'))

    inst.player = new Player(4, 7, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(15, 7, 1, 1, 'rgba(105,209,227,1)')
});

// Шестой уровень
stages.set(6, () => {
    // walls
    inst.walls.push(new Ground(1, 10, 13, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(14, 11, 1, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(15, 10, 1, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(4, 7, 6, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(3, 4, 4, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(8, 4, 5, 1, 'rgba(2,138,12,1)'))
    // ladders
    inst.ladders.push(new Ladder(10, 7, 1, 3, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(7, 4, 1, 3, 'rgba(225,225,224,1)'))
    // boxes
    inst.boxes.push(new Box(3, 3, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(4, 3, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(4, 2, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 1, 1, 1, 'rgba(183,113,28,1)'))


    // buttons
    inst.buttons.push(new Button(2, 9, 1, 1, 'rgba(138,22,2,0.5)','blue'))
    inst.buttons.push(new Button(8, 9, 1, 1, 'rgba(138,22,2,0.5)','yellow'))
    //gate
    inst.gates.push(new Gate(9, 3, 1, 1, 'rgb(138,22,2)','blue'))
    inst.gates.push(new Gate(13, 9, 1, 1, 'rgb(138,22,2)','yellow'))

    inst.player = new Player(4, 9, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(15, 9, 1, 1, 'rgba(105,209,227,1)')
});

// Седьмой уровень
stages.set(7, () => {
    // walls
    inst.walls.push(new Ground(1, 10, 6, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(9, 10, 5, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(14, 11, 1, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(15, 10, 1, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(6, 2, 3, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(7, 11, 2, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(6, 2, 3, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(9, 7, 3, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(3, 2, 2, 1, 'rgba(2,138,12,1)'))

    // ladders
    inst.ladders.push(new Ladder(5, 2, 1, 7, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(12, 7, 1, 3, 'rgba(225,225,224,1)'))

    // boxes
    inst.boxes.push(new Box(12, 9, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 3, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 4, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 5, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(9, 6, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(9, 2, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(4, 1, 1, 1, 'rgba(183,113,28,1)'))


    // buttons
    inst.buttons.push(new Button(1, 9, 1, 1, 'rgba(138,22,2,0.5)','blue'))
    inst.buttons.push(new Button(14, 10, 1, 1, 'rgba(234,223,0,0.5)','yellow'))
    //gate
    inst.gates.push(new Gate(7, 1, 1, 1, 'rgb(138,22,2)','blue'))
    inst.gates.push(new Gate(3, 1, 1, 1, 'rgb(132,127,26)','yellow'))

    inst.player = new Player(9, 9, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(8, 1, 1, 1, 'rgba(105,209,227,1)')
});

// Седьмой уровень
stages.set(8, () => {
    // walls
    inst.walls.push(new Ground(1, 10, 15, 1, 'rgba(2,138,12,1)'))

    //E
    inst.boxes.push(new Barrel(3, 5, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(3, 6, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(3, 7, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(3, 8, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Barrel(3, 9, 1, 1, 'rgba(183,113,28,1)'))
    inst.walls.push(new Ground(4, 5, 2, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(4, 7, 2, 1, 'rgba(2,138,12,1)'))
    inst.walls.push(new Ground(4, 9, 2, 1, 'rgba(2,138,12,1)'))

    //N
    inst.ladders.push(new Ladder(7, 5, 1, 5, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(10, 5, 1, 5, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(8, 7, 1, 2, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(9, 5, 1, 2, 'rgba(225,225,224,1)'))

    //D
    inst.boxes.push(new Box(12, 5, 1, 1, 'rgb(136,110,0)'))
    inst.boxes.push(new Box(12, 6, 1, 1, 'rgb(136,110,0)'))
    inst.boxes.push(new Box(12, 7, 1, 1, 'rgb(136,110,0)'))
    inst.boxes.push(new Box(12, 8, 1, 1, 'rgb(136,110,0)'))
    inst.boxes.push(new Box(12, 9, 1, 1, 'rgb(136,110,0)'))
    inst.walls.push(new Ground(13, 5, 2, 1, 'rgba(2,138,12,1)'))
    inst.boxes.push(new Box(15, 6, 1, 1, 'rgba(183,113,28,1)'))
    inst.boxes.push(new Box(15, 7, 1, 1, 'rgba(183,113,28,1)'))


    inst.ladders.push(new Ladder(13, 9, 1, 1, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(14, 9, 1, 1, 'rgba(225,225,224,1)'))
    inst.ladders.push(new Ladder(15, 8, 1, 1, 'rgba(225,225,224,1)'))

    inst.player = new Player(9, 9, 1, 1, 'rgba(15,75,208,1)')
    inst.target = new Gold(8, 1, 1, 1, 'rgba(105,209,227,1)')
});