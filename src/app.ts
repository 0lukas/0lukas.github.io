const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
canvas.style.backgroundColor = '#1a1a1a';

class Blob {
    private x: number;
    private y: number;
    private radius: number;
    private angle: number;
    private speed: number;
    private color: string;
    private side: 'left' | 'right';

    constructor(color: string, side: 'left' | 'right') {
        this.radius = Math.min(canvas.width, canvas.height) * 0.7;
        this.side = side;
        this.x = this.side === 'left' ? this.radius * 0.5 : canvas.width - this.radius * 0.5;
        this.y = Math.random() * canvas.height;
        this.angle = Math.PI / 2;
        this.speed = 0.5;
        this.color = color;
    }

    draw(): void {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color.replace('1)', '0.15)'));
        gradient.addColorStop(0.6, this.color.replace('1)', '0.05)'));
        gradient.addColorStop(1, this.color.replace('1)', '0)'));

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    update(): void {
        this.y += Math.sin(this.angle) * this.speed;
        this.x += Math.cos(this.angle) * this.speed * 0.2;

        if (this.y < this.radius * 0.1 || this.y > canvas.height - this.radius * 0.1) {
            this.angle = -this.angle;
        }

        if (this.side === 'left') {
            this.x = Math.max(this.x, this.radius * 0.5);
            this.x = Math.min(this.x, canvas.width * 0.4);
        } else {
            this.x = Math.max(this.x, canvas.width * 0.6);
            this.x = Math.min(this.x, canvas.width - this.radius * 0.5);
        }

        this.angle += (Math.random() - 0.5) * 0.02;

        this.draw();
    }

    resize(): void {
        this.radius = Math.min(canvas.width, canvas.height) * 0.7;
        this.x = this.side === 'left' ? this.radius * 0.5 : canvas.width - this.radius * 0.5;
        this.y = Math.min(Math.max(this.y, this.radius * 0.1), canvas.height - this.radius * 0.1);
    }
}

const blueBlob = new Blob('rgba(65, 105, 225, 1)', 'left');
const redBlob = new Blob('rgba(255, 0, 0, 1)', 'right');

function animate(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blueBlob.update();
    redBlob.update();
    requestAnimationFrame(animate);
}

animate();

const emojiContainer = document.createElement('div');
emojiContainer.style.position = 'fixed';
emojiContainer.style.top = '50%';
emojiContainer.style.left = '50%';
emojiContainer.style.transform = 'translate(-50%, -50%)';
emojiContainer.style.fontSize = '64px';
emojiContainer.style.zIndex = '1';
emojiContainer.textContent = '🤨';
document.body.appendChild(emojiContainer);

function resizeHandler() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blueBlob.resize();
    redBlob.resize();
}

window.addEventListener('resize', resizeHandler);