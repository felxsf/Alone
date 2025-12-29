/**
 * Cyberpunk Background Effect
 * Creates a responsive canvas with connecting particles
 */
const bgCanvas = document.createElement('canvas');
bgCanvas.id = 'bg-effect';
document.body.prepend(bgCanvas);

const ctx = bgCanvas.getContext('2d');
let width, height;
let particles = [];

// Configuration
const config = {
    particleCount: 60,
    connectionDistance: 150,
    mouseDistance: 200,
    color: '0, 240, 255', // Cyan RGB
    speed: 0.5
};

// Resize handler
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    bgCanvas.width = width;
    bgCanvas.height = height;
    initParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(${config.color}, 0.5)`;
        ctx.fillRect(this.x, this.y, this.size, this.size); // Square particles for tech look
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(config.particleCount, (width * height) / 15000); // Responsive count
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

// Mouse interaction
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${config.color}, ${1 - dist / config.connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Connect to mouse
        if (mouse.x) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.mouseDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${config.color}, ${1 - dist / config.mouseDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
                
                // Slight attraction
                // p.x -= dx * 0.01;
                // p.y -= dy * 0.01;
            }
        }
    });

    requestAnimationFrame(animate);
}

// Init
window.addEventListener('resize', resize);
resize();
animate();
