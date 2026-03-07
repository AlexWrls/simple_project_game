import GameEngine from "./core/GameEngine";
import resizeCanvas, {initCanvas} from "./constants";


window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    const canvasElement = document.getElementById('stateCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
    }

    initCanvas(canvasElement);

    const game = new GameEngine();
    window.game = game; // для отладки
    game.initial();

    window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

});

