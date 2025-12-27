document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mc-embedded-subscribe-form');
    const emailInput = document.getElementById('mce-EMAIL');
    const responseMessage = document.getElementById('mce-responses');
    const errorMsg = document.getElementById('mce-error-response');
    const successMsg = document.getElementById('mce-success-response');

    // Simple email validation
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    form.addEventListener('submit', (e) => {
        // Since we are using standard Mailchimp action, it will redirect by default unless we use AJAX
        // For simplicity and reliability without external libs, we let it submit if valid.
        
        if (!validateEmail(emailInput.value)) {
            e.preventDefault();
            errorMsg.textContent = 'Por favor, insira um e-mail válido.';
            errorMsg.style.display = 'block';
            successMsg.style.display = 'none';
            emailInput.classList.add('error');
        } else {
            // Success - let it submit to Mailchimp
            errorMsg.style.display = 'none';
            emailInput.classList.remove('error');
        }
    });

    // Subtle parallax effect on background
    const bg = document.querySelector('.background-animation');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            bg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
    }

    // Reveal elements on scroll (optional improvement)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
