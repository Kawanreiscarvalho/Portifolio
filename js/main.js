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

// Scroll Sections
let sections = document.querySelectorAll('section');
let navLinksAll = document.querySelectorAll('header nav a');

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

// Filtro de Projetos - CORRIGIDO E FUNCIONAL
document.addEventListener('DOMContentLoaded', function() {
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
});

// Adicionar CSS para animação de fade
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
`;
document.head.appendChild(style);

// Formulário de Contato
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio do formulário
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        
        if (name && email) {
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve no email ${email}.`);
            
            // Limpar formulário
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

console.log('Portfólio carregado com sucesso! 🚀');