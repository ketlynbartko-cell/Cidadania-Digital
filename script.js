---

### `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MENU HAMBÚRGUER MOBILE
    // ==========================================================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
    };

    navToggle.addEventListener('click', toggleMenu);

    // Fecha o menu móvel imediatamente ao clicar em qualquer link interno
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-active');
            }
        });
    });

    // ==========================================================================
    // 2. ROLAGEM SUAVE COM OFFSET FIXO DO HEADER
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // 3. INTERATIVIDADE DO SIMULADOR DE SEGURANÇA (QUIZ)
    // ==========================================================================
    const btnBlock = document.querySelector('.id-action-block');
    const btnClick = document.querySelector('.id-action-click');
    const resultBox = document.getElementById('quiz-result');

    const showResult = (type, message) => {
        resultBox.className = `quiz-result ${type}`;
        resultBox.textContent = message;
        resultBox.setAttribute('aria-live', 'polite');
    };

    btnBlock.addEventListener('click', () => {
        showResult(
            'success', 
            'Perfeito! Você identificou os sinais: remetente com erro ortográfico (banc0), senso de urgência artificial e link suspeito. Essa é a conduta correta!'
        );
    });

    btnClick.addEventListener('click', () => {
        showResult(
            'error', 
            'Cuidado! Ao clicar, você seria redirecionado para uma página clonada projetada para roubar sua senha bancária ou baixar um vírus no seu aparelho.'
        );
    });
});
