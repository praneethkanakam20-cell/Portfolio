
// ==========================================
// 1. INTRO LOADER
// ==========================================

// Wait until the page is loaded, then hide loader.

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 1000);

});


// ==========================================
// 2. DARK MODE / LIGHT MODE
// ==========================================

const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

const themeText = document.getElementById("themeText");


// Check previously selected theme.

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


// Update theme button appearance.

function updateThemeButton() {

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {

        themeIcon.textContent = "☀";

        themeText.textContent = "Light Mode";

    } else {

        themeIcon.textContent = "☾";

        themeText.textContent = "Dark Mode";

    }

}

updateThemeButton();


// Switch themes when button is clicked.

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();

});


// ==========================================
// 3. HERO TYPING ANIMATION
// ==========================================

const typingText = document.getElementById("typingText");

const words = [

    "AI Developer.",
    "Web Developer.",
    "Problem Solver.",
    "Tech Enthusiast."

];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


// Type and delete letters one by one.

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent = currentWord.substring(
        0,
        characterIndex
    );


    let speed = deleting ? 50 : 100;


    // When a complete word is displayed, pause.

    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;

        speed = 1500;

    }

    // When the word is completely deleted, move to next word.

    else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 500;

    }


    setTimeout(typeEffect, speed);

}


// Start typing animation.

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {

    typingText.textContent = "AI Developer.";

} else {

    typeEffect();

}


// ==========================================
// 4. SCROLL REVEAL ANIMATION
// ==========================================

// Select every element having the reveal class.

const revealElements = document.querySelectorAll(".reveal");


// IntersectionObserver detects when an element
// enters the visible area of the screen.

const revealObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                // Stop observing after animation.

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


// Observe all reveal elements.

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


// ==========================================
// 5. SKILL BAR ANIMATION
// ==========================================

const progressBars = document.querySelectorAll(".progress-fill");


const progressObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const bar = entry.target;

                // Read the target width from HTML.

                const targetWidth = bar.getAttribute("data-width");

                // Animate the bar.

                bar.style.width = targetWidth;

                observer.unobserve(bar);

            }

        });

    },

    {
        threshold: 0.5
    }

);


// Observe all skill progress bars.

progressBars.forEach(function (bar) {

    progressObserver.observe(bar);

});


// ==========================================
// 6. ACTIVE NAVIGATION HIGHLIGHT
// ==========================================

// Get all sections and navigation links.

const sections = document.querySelectorAll("main section");

const navLinks = document.querySelectorAll(".nav-link");


const sectionObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                // Remove active class from every link.

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                });


                // Activate the matching navigation link.

                const activeLink = document.querySelector(
                    `.nav-link[href="#${currentId}"]`
                );

                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    },

    {
        rootMargin: "-35% 0px -50% 0px"
    }

);


// Observe all sections.

sections.forEach(function (section) {

    sectionObserver.observe(section);

});


// ==========================================
// 7. PROJECT CARD TILT EFFECT
// ==========================================

// Add a subtle 3D tilt effect on desktop.

const projectCards = document.querySelectorAll(".project-card");

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover && !reducedMotion) {

    projectCards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 35;

            const rotateY = (x - centerX) / 35;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });


        // Reset card when mouse leaves.

        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });

}


// ==========================================
// 8. FOOTER YEAR
// ==========================================

// Update copyright year automatically.

const footer = document.querySelector(".footer");

if (footer) {

    const year = new Date().getFullYear();

    footer.querySelector("span").textContent =
        `© ${year} PRANEETH KANAKAM`;

}
