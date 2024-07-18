/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// draws individual particles
class Particle {
    constructor(effect) {
        this.effect = effect;
        ctx.strokeStyle = `oklch(100% 0 0)`;
        this.radius = Math.random() * 30 + 5;
        // keep every circle within the canvas
        this.x =
            this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y =
            this.radius +
            Math.random() * (this.effect.height - this.radius * 2);
        // velocity on horizontal axis
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.fillStyle = `oklch(70% 0.1 ${this.x * 0.8})`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    update() {
        this.x += this.vx;
        // make balls bounce off the side
        // if we are outside the bounds of the canvas, flip the x velocity
        if (this.x > this.effect.width - this.radius || this.x < this.radius)
            this.vx *= -1;

        this.y += this.vy;
        if (this.y > this.effect.width - this.radius || this.y < this.radius)
            this.vy *= -1;
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            // "this" refers to the effect class
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach((particle) => {
            particle.draw(context);
            particle.update();
        });
    }
}

const effect = new Effect(canvas);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();
