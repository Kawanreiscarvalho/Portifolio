// Menu Mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            
            // Ativar animações na seção
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
    
    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Remover ícone do menu e navbar quando clicar em um link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Texto digitado
const typed = new Typed('.typing-text', {
    strings: ['Desenvolvedor Frontend', 'Desenvolvedor Backend', 'Designer UI/UX'],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// Filtro de Projetos
const filterButtons = document.querySelectorAll('.filter-buttons .btn');
const projectBoxes = document.querySelectorAll('.project-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectBoxes.forEach(box => {
            if (filterValue === 'all' || box.getAttribute('data-item') === filterValue) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// Animação de Rolagem
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

// Formulário de Contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve no email ${email}.`);
    
    // Limpar formulário
    contactForm.reset();
});

// Efeito de Máquina de Escrever
class Typed {
    constructor(el, options) {
        this.el = document.querySelector(el);
        this.options = options;
        this.text = '';
        this.isDeleting = false;
        this.loopNum = 0;
        this.tick();
    }
    
    tick() {
        const i = this.loopNum % this.options.strings.length;
        const fullTxt = this.options.strings[i];
        
        if (this.isDeleting) {
            this.text = fullTxt.substring(0, this.text.length - 1);
        } else {
            this.text = fullTxt.substring(0, this.text.length + 1);
        }
        
        this.el.innerHTML = this.text;
        
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) {
            delta /= 2;
        }
        
        if (!this.isDeleting && this.text === fullTxt) {
            delta = this.options.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(() => this.tick(), delta);
    }
}