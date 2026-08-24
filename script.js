"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".main-nav a");


    /*
     * MENU MOBILE
     */

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });


    /*
     * FECHAR MENU AO CLICAR EM UM LINK
     */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });


    /*
     * SCROLL SUAVE COM COMPENSAÇÃO DO HEADER
     */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /*
     * ANIMAÇÃO DE ENTRADA DOS CARDS
     */

    const animatedElements = document.querySelectorAll(
        ".info-card, .protection-item, .doubt-section, .final-alert"
    );


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });


    /*
     * CLASSE VISÍVEL
     */

    const animationStyle = document.createElement("style");

    animationStyle.textContent = `
        .info-card.visible,
        .protection-item.visible,
        .doubt-section.visible,
        .final-alert.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(animationStyle);


    /*
     * FECHAR MENU AO REDIMENSIONAR PARA DESKTOP
     */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 650) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });

});
