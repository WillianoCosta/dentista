document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para links de navegação
    document.querySelectorAll('nav ul.nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Fecha o menu hambúrguer se estiver aberto
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger-menu');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }


            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - (document.querySelector('header').offsetHeight),
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
        // Clonar os primeiros e últimos itens para rolagem contínua (infinito)
        const items = Array.from(carousel.children);
        const firstItem = items[0].cloneNode(true);
        const lastItem = items[items.length - 1].cloneNode(true);

        carousel.appendChild(firstItem);
        carousel.insertBefore(lastItem, items[0]);

        // Ajustar o índice inicial para o primeiro item "real"
        currentIndex = 1; // Começa no primeiro item real (índice 1 por causa do clone inicial)
        carousel.style.transition = 'none'; // Desabilita a transição para o ajuste inicial
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out'; // Habilita a transição novamente
        }, 50);

        const showTestimonial = (index) => {
            carousel.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        };

        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });

        carousel.addEventListener('transitionend', () => {
            // Se chegou ao clone do último item, volta para o item real correspondente
            if (currentIndex === 0) {
                carousel.style.transition = 'none';
                currentIndex = items.length;
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }
            // Se chegou ao clone do primeiro item, volta para o item real correspondente
            if (currentIndex === items.length + 1) {
                carousel.style.transition = 'none';
                currentIndex = 1;
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }
        });

        // Auto-play do carrossel
        let autoPlayInterval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000); // Muda a cada 5 segundos

        // Pausa o autoplay ao interagir com os botões
        prevBtn.addEventListener('mouseover', () => clearInterval(autoPlayInterval));
        nextBtn.addEventListener('mouseover', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseover', () => clearInterval(autoPlayInterval));

        prevBtn.addEventListener('mouseleave', () => { autoPlayInterval = setInterval(() => { showTestimonial(currentIndex + 1); }, 5000); });
        nextBtn.addEventListener('mouseleave', () => { autoPlayInterval = setInterval(() => { showTestimonial(currentIndex + 1); }, 5000); });
        carousel.addEventListener('mouseleave', () => { autoPlayInterval = setInterval(() => { showTestimonial(currentIndex + 1); }, 5000); });
    }

    // Validação de Formulário de Contato (exemplo simples)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

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

            formMessage.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Animação de entrada para elementos (ex: ao rolar a página)
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

    const animatableElements = document.querySelectorAll('section h2, .service-item, .testimonial-item, .about-content, .contact-item, .contact-form, .map-container');
    animatableElements.forEach(element => {
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Lógica do Menu Hambúrguer
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times'); // Muda para X
        });
    }
});
