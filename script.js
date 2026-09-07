// =========================================================
// BACKGROUND MUSIC
// =========================================================

const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
    bgMusic.volume = 0.35;

    let musicStarted = false;

    function startMusic() {
        if (musicStarted) return;

        bgMusic.play()
            .then(() => {
                musicStarted = true;
                console.log("🎵 Background music started");
            })
            .catch((error) => {
                console.log("Music blocked:", error);
            });
    }

    document.addEventListener("pointerdown", startMusic, {
        once: true,
        passive: true
    });

    document.addEventListener("keydown", startMusic, {
        once: true
    });
}


// =========================================================
// NAVIGATION
// =========================================================

const nav = document.querySelector("#nav");
const menuToggle = document.querySelector(".menu-toggle");
const topBtn = document.querySelector("#topBtn");
const toast = document.querySelector("#toast");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});


// =========================================================
// SCROLL
// =========================================================

window.addEventListener("scroll", () => {

    if (topBtn) {
        topBtn.classList.toggle("show", window.scrollY > 500);
    }

    const sections = document.querySelectorAll("main section[id]");
    let current = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    document.querySelectorAll("#nav a").forEach(a => {
        a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${current}`
        );
    });
});


// =========================================================
// BACK TO TOP
// =========================================================

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// =========================================================
// HERO BUTTON
// =========================================================

const heroButton = document.querySelector(".hero .btn");

if (heroButton) {
    heroButton.addEventListener("click", () => {
        showToast("🙏 Ganpati Bappa Morya!");
    });
}


// =========================================================
// FLOATING PETALS
// =========================================================

const petalContainer = document.querySelector("#petals");
const symbols = ["🌸", "🌺", "🌼", "❀"];

function createPetal() {

    if (!petalContainer) return;

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        (10 + Math.random() * 12) + "px";

    petal.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    petal.style.setProperty(
        "--drift",
        `${-80 + Math.random() * 160}px`
    );

    petalContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 13000);
}

setInterval(createPetal, 900);

for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 250);
}


// =========================================================
// TOAST
// =========================================================

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}