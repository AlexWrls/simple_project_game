import GameEngine from "./core/GameEngine";
import resizeCanvas, {initCanvas} from "./constants";


window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    const canvasElement = document.getElementById('stateCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
    }

    if (initCanvas(canvasElement)) {
        window.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        setTimeout(() => {
            new GameEngine()
        }, 500)
    }

});

