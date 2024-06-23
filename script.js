const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let currentTool = 'brush';

const startDrawing = (e) => {
    drawing = true;
    draw(e);
};

const stopDrawing = () => {
    drawing = false;
    ctx.beginPath();
};

const draw = (e) => {
    if (!drawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (currentTool === 'brush') {
        ctx.strokeStyle = brushColor;
    } else if (currentTool === 'rubber') {
        ctx.strokeStyle = '#FFFFFF';
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

document.querySelector('[data-action="brush"]').addEventListener('click', () => {
    currentTool = 'brush';
});

document.querySelector('[data-action="rubber"]').addEventListener('click', () => {
    currentTool = 'rubber';
});

document.querySelector('.input__color').addEventListener('input', (e) => {
    brushColor = e.target.value;
});

document.querySelectorAll('.button__size').forEach(button => {
    button.addEventListener('click', (e) => {
        brushSize = e.currentTarget.getAttribute('data-size');
    });
});

document.querySelector('.button__clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
