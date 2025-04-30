document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--white)';
        }
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .attack-type, .method');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.step, .attack-type, .method').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Form submission
// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar loader
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Get form values
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor, preencha todos os campos');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }
        
        // Enviar para o servidor
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mostrar mensagem de sucesso
                const successMsg = document.createElement('div');
                successMsg.className = 'alert success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    ${data.message}
                `;
                contactForm.parentNode.insertBefore(successMsg, contactForm);
                contactForm.reset();
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            // Mostrar mensagem de erro
            const errorMsg = document.createElement('div');
            errorMsg.className = 'alert error';
            errorMsg.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                ${error.message}
            `;
            contactForm.parentNode.insertBefore(errorMsg, contactForm);
            
            // Remover mensagem após 5 segundos
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
    // Password strength simulator for demonstration
    const simulatePasswordCracking = function() {
        const passwords = [
            { password: 'senha', time: 'Instantaneamente', class: 'instant' },
            { password: '123456', time: 'Instantaneamente', class: 'instant' },
            { password: 'qwerty', time: 'Instantaneamente', class: 'instant' },
            { password: 'abc123', time: 'Menos de 1 segundo', class: 'fast' },
            { password: 'brasil', time: 'Menos de 1 segundo', class: 'fast' },
            { password: 'amor123', time: 'Menos de 1 segundo', class: 'fast' },
            { password: 'futebol', time: 'Menos de 1 segundo', class: 'fast' },
            { password: 'admin123', time: 'Menos de 1 segundo', class: 'fast' },
            { password: 'S3nh@Fraca', time: '3 horas', class: 'medium' },
            { password: 'P@ssw0rd', time: '3 horas', class: 'medium' },
            { password: 'S3nh@F0rt3!', time: '3 dias', class: 'slow' },
            { password: 'Tr0ub4dor&3', time: '3 dias', class: 'slow' },
            { password: 'CavaloBateriaCorreto', time: 'Séculos', class: 'very-slow' }
        ];
        
        const passwordList = document.createElement('div');
        passwordList.className = 'password-cracking';
        passwordList.innerHTML = '<h3>Tempo para Quebrar Senhas Comuns:</h3><ul></ul>';
        
        passwords.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.password}</strong>
                <span class="time ${item.class}">${item.time}</span>
            `;
            passwordList.querySelector('ul').appendChild(li);
        });
        
        const passwordSection = document.getElementById('password-cracking-times');
        if (passwordSection) {
            passwordSection.appendChild(passwordList);
        }
    };
    
    simulatePasswordCracking();
});