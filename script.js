document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para links de navegação
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - (document.querySelector('header').offsetHeight), // Ajusta para a altura do cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel de Depoimentos
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    if (carousel && prevBtn && nextBtn) {
        const totalItems = carousel.children.length;

        const showTestimonial = (index) => {
            if (index >= totalItems) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalItems - 1;
            } else {
                currentIndex = index;
            }
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });

        // Opcional: Auto-play do carrossel
        // setInterval(() => {
        //     showTestimonial(currentIndex + 1);
        // }, 5000); // Muda a cada 5 segundos
    }

    // Validação de Formulário de Contato (exemplo simples)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            // Simulação de validação
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                formMessage.textContent = 'Por favor, insira um email válido.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Simulação de envio bem-sucedido
            // Em um ambiente real, você enviaria estes dados para um servidor (via Fetch API, AJAX, etc.)
            formMessage.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset(); // Limpa o formulário

            // Oculta a mensagem após alguns segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Animação de entrada para elementos (ex: ao rolar a página) - Exemplo básico
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section h2, .service-item, .testimonial-item, .about-content, .contact-item, .contact-form, .map-container');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (elementTop < viewportHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    };

    // Aplica um estilo inicial para a animação
    const animatableElements = document.querySelectorAll('section h2, .service-item, .testimonial-item, .about-content, .contact-item, .contact-form, .map-container');
    animatableElements.forEach(element => {
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Chama na carga inicial para elementos visíveis
});
