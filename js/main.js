// Menu Mobile - Versão Melhorada
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let body = document.querySelector('body');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navbar.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Fechar menu ao clicar em um link
let navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon && navbar) {
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        e.target !== menuIcon) {
        menuIcon.classList.remove('active');
        navbar.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
        menuIcon.classList.remove('active');
        navbar.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// ===== MODO LIGHT/DARK =====
function initThemeToggle() {
    // Criar botão do tema se não existir
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
        `;
        document.body.appendChild(themeToggle);
    }

    const themeToggle = document.querySelector('.theme-toggle');
    
    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Atualizar ícone baseado no tema atual
    updateThemeIcon(currentTheme);

    // Toggle do tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
        
        // Adicionar animação de transição suave
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });

    // Observar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    if (theme === 'light') {
        themeToggle.style.background = 'var(--main-color)';
        themeToggle.querySelector('.fa-sun').style.display = 'block';
        themeToggle.querySelector('.fa-moon').style.display = 'none';
    } else {
        themeToggle.style.background = 'var(--main-color)';
        themeToggle.querySelector('.fa-sun').style.display = 'none';
        themeToggle.querySelector('.fa-moon').style.display = 'block';
    }
}

// Scroll Sections
let sections = document.querySelectorAll('section');
let navLinksAll = document.querySelectorAll('header nav a');

function initScrollAnimations() {
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinksAll.forEach(links => {
                    links.classList.remove('active');
                    let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
                
                // Ativar animações na seção
                sec.classList.add('show-animate');
            } else {
                sec.classList.remove('show-animate');
            }
        });
        
        // Sticky Header
        let header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
        
        // Remover ícone do menu e navbar quando scrollar
        if (menuIcon && navbar && window.scrollY > 100) {
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
            body.classList.remove('menu-open');
        }
    };
}

// Filtro de Projetos - CORRIGIDO E FUNCIONAL
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const projectBoxes = document.querySelectorAll('.project-box');
    
    // Verificar se os elementos existem
    if (filterButtons.length > 0 && projectBoxes.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectBoxes.forEach(box => {
                    const itemType = box.getAttribute('data-item');
                    
                    if (filterValue === 'all' || itemType === filterValue) {
                        box.style.display = 'block';
                        // Adicionar animação de fade in
                        box.style.opacity = '0';
                        box.style.animation = 'fadeIn 0.5s ease forwards';
                        setTimeout(() => {
                            box.style.opacity = '1';
                        }, 50);
                    } else {
                        box.style.display = 'none';
                    }
                });
            });
        });
        
        // Inicializar com filtro "Todos" ativo
        const allButton = document.querySelector('.filter-buttons .btn[data-filter="all"]');
        if (allButton) {
            allButton.click();
        }
    }
}

// Adicionar CSS para animação de fade
function addAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-box {
            transition: all 0.3s ease;
        }
        
        /* Animações para o modo light/dark */
        :root {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Animações de entrada para elementos */
        .home-content,
        .home-img,
        .about-content,
        .about-img,
        .project-box,
        .info-box {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Delay para elementos específicos */
        .home-content h1 { animation-delay: 0.1s; }
        .home-content .typing-text { animation-delay: 0.3s; }
        .home-content p { animation-delay: 0.5s; }
        .btn-box { animation-delay: 0.7s; }
        .home-img { animation-delay: 0.9s; }
    `;
    document.head.appendChild(style);
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            
            if (name && email) {
                // Mostrar loading
                const submitBtn = contactForm.querySelector('.btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de envio
                setTimeout(() => {
                    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve no email ${email}.`);
                    
                    // Limpar formulário
                    contactForm.reset();
                    
                    // Restaurar botão
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Desenvolvedor Full-stack',
        'Desenvolvedor Front-end',
        'Desenvolvedor Back-end',
        'UI/UX Designer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Iniciar animação após um delay
    setTimeout(type, 1000);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initScrollAnimations();
    initProjectFilter();
    addAnimationsCSS();
    initContactForm();
    initTypingAnimation();
    
    console.log('Portfólio carregado com sucesso! 🚀');
    console.log('Modo Light/Dark ativo ✅');
    console.log('Animações carregadas ✅');
});

// Prevenir problemas de carregamento
window.addEventListener('load', function() {
    // Garantir que o tema seja aplicado corretamente
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
});