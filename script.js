document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initFormHandler();
});

/**
 * Background Animation - Simple Particle System
 */
function initParticles() {
    const container = document.getElementById('canvas-container');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    let width, height, particles;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interaction
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                this.x += dx * 0.02;
                this.y += dy * 0.02;
            }

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        const count = Math.floor((width * height) / 10000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
}

/**
 * Mailchimp Form Integration
 * To use: Replace the URL in the 'action' attribute of the form in index.html
 * with your Mailchimp 'post-json' URL.
 */
function initFormHandler() {
    const form = document.getElementById('mailchimp-form');
    const messageContainer = document.getElementById('message-container');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';

        // NOTE: In a real scenario, you would use the Mailchimp post-json URL with JSONP.
        // Since we don't have the user's specific URL, we will simulate the success.
        // The user can replace this with actual Mailchimp integration logic.

        setTimeout(() => {
            // Simulated success
            showMessage('Obrigado por se inscrever! Fique atento ao seu e-mail.', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;

            // If the user has a real URL, they would do something like:
            // submitMailchimpForm(form);
        }, 1000);
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(msg, type) {
        messageContainer.textContent = msg;
        messageContainer.className = type;
        
        setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = '';
        }, 5000);
    }
}

/**
 * Actual Mailchimp JSONP submission (Optional implementation)
 * To use this, you'd need the specific URL from Mailchimp
 */
function submitMailchimpForm(form) {
    const url = form.action.replace('/post?', '/post-json?') + '&c=callback';
    const script = document.createElement('script');
    
    // This is a simplified example of how JSONP works for Mailchimp
    window.callback = (data) => {
        const messageContainer = document.getElementById('message-container');
        if (data.result === 'success') {
            messageContainer.textContent = 'Sucesso! Verifique seu e-mail.';
            messageContainer.className = 'success';
            form.reset();
        } else {
            messageContainer.textContent = data.msg || 'Erro ao se inscrever.';
            messageContainer.className = 'error';
        }
        document.body.removeChild(script);
        delete window.callback;
    };

    script.src = url + '&' + new URLSearchParams(new FormData(form)).toString();
    document.body.appendChild(script);
}
