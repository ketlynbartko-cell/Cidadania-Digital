### `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU HAMBÚRGUER (MOBILE) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            
            // Altera ícone para feedback visual de fechar
            const icon = menuToggle.querySelector('i');
            if (isOpen) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // --- 2. CONTROLE DE LINK ATIVO COM ROLAGEM (SCROLL SPY) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // ajuste fino por causa do header fixo

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Fecha o menu mobile automaticamente ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // --- 3. MODAL DE AJUDA FUNCIONAL ---
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const helpModal = document.getElementById('helpModal');

    if (btnOpenModal && helpModal && btnCloseModal) {
        btnOpenModal.addEventListener('click', () => {
            helpModal.classList.add('active');
            helpModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // impede scroll de fundo com modal aberto
        });

        const closeModal = () => {
            helpModal.classList.remove('active');
            helpModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        btnCloseModal.addEventListener('click', closeModal);
        
        // Fecha clicando no backdrop escuro
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) closeModal();
        });
    }

    // --- 4. VALIDAÇÃO NATIVA DE FORMULÁRIO ---
    const helpForm = document.getElementById('helpForm');
    
    if (helpForm) {
        helpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            const formGroups = helpForm.querySelectorAll('.form-group');

            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                
                // Validação simplificada baseada nos atributos exigidos
                if (!input.value.trim()) {
                    group.classList.add('invalid');
                    isFormValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    group.classList.add('invalid');
                    const errorText = group.querySelector('.error-message');
                    errorText.textContent = "Insira um formato de e-mail válido.";
                    isFormValid = false;
                } else {
                    group.classList.remove('invalid');
                }
            });

            if (isFormValid) {
                alert('Solicitação enviada com sucesso! Nossa equipe analisará sua dúvida.');
                helpForm.reset();
                if (helpModal) btnCloseModal.click(); // fecha o modal após envio limpo
            }
        });

        // Remove classe de erro em tempo real enquanto o usuário digita
        helpForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group.classList.contains('invalid') && input.value.trim()) {
                    group.classList.remove('invalid');
                }
            });
        });
    }

    // Função utilitária Regex para validação de e-mail comum
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});