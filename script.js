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
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.fillStyle = `oklch(70% 0.1 ${this.x * 0.5})`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
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
        });
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {}
