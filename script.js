document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Dados Dinâmicos (Simulando conteúdo do painel admin)
    // ESTES DADOS SERIAM ATUALIZADOS VIA APP SCRIPT OU OUTRO BACKEND
    // ----------------------------------------------------
    const siteConfig = {
        contact: {
            phone: '(84) 99999-9999',
            whatsapp: '(84) 99999-9999',
            address: 'Rua Exemplo, 123 - Lagoa Nova, Natal/RN',
            email: 'contato@maycondouglas.com',
            instagram: 'https://instagram.com/drmaycondouglas', // Link real
            facebook: 'https://facebook.com/drmaycondouglas', // Link real
            googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.999999999999!2d-35.20987128526841!3d-5.803730095754593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDUxJzE1LjYiUyAzNsKwMTInMjEuNSJX!5e0!3m2!1spt-BR!2sbr!4v1678901234567!5m2!1spt-BR!2sbr' // Substitua pelo seu
        },
        galleryImages: [
            { src: 'https://via.placeholder.com/300x200/FFD700/000000?text=Sorriso+1', caption: 'Transformação Incrível' },
            { src: 'https://via.placeholder.com/300x200/000000/FFD700?text=Sorriso+2', caption: 'Facetas Naturais' },
            { src: 'https://via.placeholder.com/300x200/FFD700/000000?text=Sorriso+3', caption: 'Mudança de Vida' },
            { src: 'https://via.placeholder.com/300x200/000000/FFD700?text=Sorriso+4', caption: 'Resultado Fantástico' },
            { src: 'https://via.placeholder.com/300x200/FFD700/000000?text=Sorriso+5', caption: 'Antes e Depois Impactante' },
            { src: 'https://via.placeholder.com/300x200/000000/FFD700?text=Sorriso+6', caption: 'Sorriso Harmonioso' }
            // Adicione mais imagens aqui
        ],
        testimonials: [
            { text: 'O Dr. Maycon transformou meu sorriso! Estou muito mais confiante agora. O atendimento é impecável e o resultado superou minhas expectativas.', author: 'Ana Paula S.' },
            { text: 'As facetas de resina ficaram perfeitas, muito naturais. Recomendo o Dr. Maycon a todos que buscam um trabalho de excelência.', author: 'João Victor M.' },
            { text: 'Experiência maravilhosa do início ao fim. Profissionalismo e carinho em cada detalhe. Meu sorriso nunca esteve tão bonito!', author: 'Carla R.' }
            // Adicione mais depoimentos aqui
        ],
        announcements: [
            // { title: 'Novo horário de atendimento!', message: 'Agora atendemos também aos sábados pela manhã. Agende sua consulta!' },
            // { title: 'Promoção de Clareamento!', message: 'Descontos especiais para clareamento dental neste mês. Aproveite!' }
        ]
    };

    // Função para atualizar informações de contato
    function updateContactInfo() {
        document.getElementById('contact-phone').textContent = siteConfig.contact.phone;
        document.getElementById('contact-whatsapp').textContent = siteConfig.contact.whatsapp;
        // Atualiza links sociais
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.querySelector('a[aria-label="Instagram"]').href = siteConfig.contact.instagram;
            socialLinks.querySelector('a[aria-label="Facebook"]').href = siteConfig.contact.facebook;
        }
        // Atualiza mapa
        const mapIframe = document.querySelector('.map-container iframe');
        if (mapIframe) {
            mapIframe.src = siteConfig.contact.googleMapsEmbedUrl;
        }
    }

    // Função para carregar a galeria
    function loadGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = ''; // Limpa antes de carregar
        siteConfig.galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}">
                <p>${image.caption}</p>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Função para carregar depoimentos (carousel)
    let currentTestimonialIndex = 0;
    const testimonialCarousel = document.querySelector('.testimonial-carousel');

    function renderTestimonials() {
        testimonialCarousel.innerHTML = ''; // Limpa
        siteConfig.testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.classList.add('testimonial-item');
            testimonialItem.innerHTML = `
                <p>"${testimonial.text}"</p>
                <div class="author">- ${testimonial.author}</div>
            `;
            testimonialCarousel.appendChild(testimonialItem);
        });
        updateTestimonialDisplay();
    }

    function updateTestimonialDisplay() {
        const items = testimonialCarousel.children;
        if (items.length === 0) return;

        // Reset all to hidden
        Array.from(items).forEach(item => item.style.display = 'none');

        // Display current item
        items[currentTestimonialIndex].style.display = 'block';
    }

    function showNextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % siteConfig.testimonials.length;
        updateTestimonialDisplay();
    }

    function showPrevTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + siteConfig.testimonials.length) % siteConfig.testimonials.length;
        updateTestimonialDisplay();
    }

    // Event listeners para o carousel
    document.querySelector('.next-testimonial')?.addEventListener('click', showNextTestimonial);
    document.querySelector('.prev-testimonial')?.addEventListener('click', showPrevTestimonial);


    // ----------------------------------------------------
    // Funcionalidades do Site (Interatividade)
    // ----------------------------------------------------

    // Menu Mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('nav ul');

    mobileMenuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times'); // Ícone X
    });

    // Fechar menu mobile ao clicar em um link
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Rolagem suave para âncoras (já está no CSS com scroll-behavior: smooth)
    // Este JS seria para navegadores antigos ou para um controle mais granular
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Load More Gallery (Exemplo simples: adiciona mais conteúdo se houvesse)
    const loadMoreBtn = document.querySelector('.load-more-gallery');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            alert('Em um site real, aqui mais imagens seriam carregadas (ex: via API).');
            // siteConfig.galleryImages.push(
            //     { src: 'https://via.placeholder.com/300x200/F0F/000?text=Mais+Sorriso+7', caption: 'Novo Sorriso 7' },
            //     { src: 'https://via.placeholder.com/300x200/00F/FFF?text=Mais+Sorriso+8', caption: 'Novo Sorriso 8' }
            // );
            // loadGallery(); // Recarrega a galeria com as novas imagens
        });
    }

    // ----------------------------------------------------
    // Inicialização ao carregar a página
    // ----------------------------------------------------
    updateContactInfo();
    loadGallery();
    renderTestimonials();

    // Aviso: O formulário de contato abaixo é apenas um placeholder.
    // Em um ambiente de produção, ele precisaria de um backend (PHP, Node.js, App Script, etc.)
    // para realmente enviar os dados.
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formulário enviado! (Ainda não funcional, precisa de um backend)');
            this.reset(); // Limpa o formulário
        });
    }

});