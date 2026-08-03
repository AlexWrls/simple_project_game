import GameEngine from "./core/GameEngine";
import resizeCanvas, {initCanvas} from "./constants";

window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');

    const canvasElement = document.getElementById('stateCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
    }

    if (initCanvas(canvasElement)) {
        window.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        await new Promise(resolve => setTimeout(resolve, 500));
        const game = new GameEngine();
        await game.preview()
    }
});

