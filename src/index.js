import GameEngine from "./core/GameEngine";
import resizeCanvas, {initCanvas} from "./constants";

window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');

    const canvasElement = document.getElementById('stateCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
    }
    const loader = document.getElementById('loader');

    if (initCanvas(canvasElement)) {
        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
        if (loader) {
            loader.style.display = 'none';
        }
        resizeCanvas();
        const game = new GameEngine();
        await game.preview();

        window.addEventListener('resize', resizeCanvas);
    }
});