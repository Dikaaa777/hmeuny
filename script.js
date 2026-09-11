/* =========================================================
   HME FT UNY — SCRIPT.JS
   Kabinet Tridaya Cakrawardhana
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector("#menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");
    const revealElements = document.querySelectorAll(".reveal");
    const divisionCards = document.querySelectorAll(".division-card");


    /* =====================================================
       NAVBAR — SCROLL EFFECT
    ===================================================== */

    const handleNavbarScroll = () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll, {
        passive: true
    });

    handleNavbarScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMenu = () => {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        if (!navMenu || !menuToggle) return;

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    };

    if (menuToggle) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (!navbar || !navMenu) return;

        const clickedInsideNavbar = navbar.contains(event.target);

        if (!clickedInsideNavbar) {
            closeMenu();
        }
    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 180;

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );
        });
    };

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }


    /* =====================================================
       DIVISION CARDS
    ===================================================== */

    divisionCards.forEach((card) => {
        card.addEventListener("click", () => {
            const divisionNumber = card.dataset.division;

            if (!divisionNumber) return;

            /*
             * Untuk sementara kartu divisi belum membuka modal.
             * Data division tetap disimpan melalui data-division
             * sehingga fitur modal bisa ditambahkan nanti
             * tanpa mengubah struktur HTML.
             */

            console.log(`Divisi ${divisionNumber} dipilih`);
        });
    });


    /* =====================================================
       KEYBOARD — ESCAPE
    ===================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    /* =====================================================
       SMOOTH SCROLL FALLBACK
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});