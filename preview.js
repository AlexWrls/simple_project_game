//Отрисовка диалога
function drawSpeechBubble(ctx, x, y, width, height, tailX, tailY, text) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.arcTo(x + width, y, x + width, y + height, 20);
    ctx.arcTo(x + width, y + height, x, y + height, 20);
    ctx.arcTo(x, y + height, x, y, 20);
    ctx.arcTo(x, y, x + width, y, 20);
    ctx.closePath();

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // хвост
    ctx.beginPath();
    ctx.moveTo(x + 20, y + height);
    ctx.lineTo(tailX, tailY);
    ctx.lineTo(x + 40, y + height);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // текст
    drawText(ctx, text, x, y, width, height);
}

// текст внутри диалога
function drawText(ctx, text, x, y, width, height) {
    ctx.save();
    ctx.font = '24px "Comic Sans MS", cursive, sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = text.split('\n');
    const lineHeight = 30;
    let currentY = y + (height / 2) - ((lines.length - 1) * lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + width / 2, currentY);
        currentY += lineHeight;
    }
    ctx.restore();
}