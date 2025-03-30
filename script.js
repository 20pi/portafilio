document.addEventListener('DOMContentLoaded', function () {
    function copyToClipboard(element, textToCopy) {
        element.addEventListener('click', function (e) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    const followText = document.createElement('div');
                    followText.className = 'follow-text text fade-out';
                    followText.textContent = 'Copied to clipboard!';
                    document.body.appendChild(followText);

                    followText.style.left = e.clientX + 20 + 'px';
                    followText.style.top = e.clientY + 10 + 'px';

                    setTimeout(() => {
                        followText.style.opacity = 1;
                    }, 5);

                    const mouseMove = function (e) {
                        followText.style.left = e.clientX + 20 + 'px';
                        followText.style.top = e.clientY + 10 + 'px';
                    };

                    document.addEventListener('mousemove', mouseMove);

                    setTimeout(() => {
                        document.removeEventListener('mousemove', mouseMove);
                        document.body.removeChild(followText);
                    }, 900);
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
    const discord = document.getElementById('discord');
    copyToClipboard(discord, '20pi');
});

const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.25;
        this.wind = Math.random() * 0.4 - 0.25;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height) {
            this.y = Math.random() * -canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.closePath();
    }
}

const snowflakes = Array(250)
    .fill()
    .map(() => new Snowflake());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
}

animate();
