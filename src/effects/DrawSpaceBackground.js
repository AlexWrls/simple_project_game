import {canvas} from "../constants";

export default function drawSpaceBackground(ctx, options = {}) {
    const canvas = ctx.canvas;
    const w = canvas.width;
    const h = canvas.height;

    // Кеш
    if (!drawSpaceBackground.cache) {
        const count =options.starCount;
        const stars = new Array(count);

        for (let i = 0; i < count; i++) {
            stars[i] = {
                x: Math.random() * w,
                y: Math.random() * h,
                s: 0.5 + Math.random() * 1.5,
                b: 0.5 + Math.random() * 0.5,
                p: Math.random() * 6.28
            };
        }

        drawSpaceBackground.cache = {
            stars: stars,
            offset: 0,
            time: 0
        };
    }

    const cache = drawSpaceBackground.cache;
    cache.time += 0.015;
    cache.offset += (options.speed || 0.15);

    if (cache.offset > w) cache.offset = 0;

    // Фон
    ctx.fillStyle = '#0c0c1f';
    ctx.fillRect(0, 0, w, h);

    // Звезды
    const stars = cache.stars;
    const offset = cache.offset;
    const time = cache.time;

    for (let i = 0, len = stars.length; i < len; i++) {
        const star = stars[i];

        let x = star.x + offset;
        if (x > w) x -= w;

        let y = star.y + offset * 0.3;
        if (y > h) y -= h;

        const twinkle = 0.7 + 0.3 * Math.sin(time * star.p);
        const size = star.s * (0.8 + 0.2 * twinkle);
        const gray = Math.floor(150 + 100 * star.b * twinkle);

        ctx.fillStyle = `rgb(${gray},${gray},${Math.floor(gray * 0.9)})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}