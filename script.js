
const enterBtn = document.getElementById("enterBtn");
const backBtn = document.getElementById("backBtn");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const invitationScreen =
    document.getElementById("invitationScreen");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicToggle =
    document.getElementById("musicToggle");


// OPEN FULL INVITATION
enterBtn.addEventListener("click", function () {

    welcomeScreen.hidden = true;
    invitationScreen.hidden = false;

    invitationScreen.classList.remove("cinematic-mode");
    void invitationScreen.offsetWidth;
    invitationScreen.classList.add("cinematic-mode");

    window.scrollTo(0, 0);

    weddingMusic.play()
        .then(updateMusicButton)
        .catch(() => updateMusicButton());
});


// BACK TO WELCOME
backBtn.addEventListener("click", function () {

    invitationScreen.hidden = true;
    welcomeScreen.hidden = false;

    window.scrollTo(0, 0);
});


// ROMANTIC PARTICLES
function createRomanticParticles() {

    const particleLayer =
        document.createElement("div");

    particleLayer.className = "particle-layer";

    document.body.appendChild(particleLayer);

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            i % 3 === 0
                ? "rose-petal"
                : "gold-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * -15 + "s";

        particle.style.animationDuration =
            (8 + Math.random() * 12) + "s";

        particleLayer.appendChild(particle);
    }
}

createRomanticParticles();


// WEDDING COUNTDOWN
const weddingDate =
    new Date("2026-11-14T00:00:00+05:30");

function updateCountdown() {

    const difference =
        weddingDate.getTime() - Date.now();

    const countdownSection =
        document.querySelector(".countdown-section");

    if (difference <= 0) {
        countdownSection.innerHTML =
            "<h3>THE CELEBRATION HAS BEGUN!</h3>";
        return;
    }

    const days =
        Math.floor(difference / 86400000);

    const hours =
        Math.floor((difference / 3600000) % 24);

    const minutes =
        Math.floor((difference / 60000) % 60);

    const seconds =
        Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// MUSIC CONTROL
function updateMusicButton() {

    musicToggle.textContent =
        weddingMusic.paused
            ? "🔇 Music Off"
            : "🎵 Music On";
}

musicToggle.addEventListener("click", async function () {

    if (weddingMusic.paused) {
        try {
            await weddingMusic.play();
        } catch (error) {
            console.log("Music unavailable:", error);
        }
    } else {
        weddingMusic.pause();
    }

    updateMusicButton();
});

// LEVEL 2 - MOUSE FOLLOW 3D EFFECT

const royalCard = document.getElementById("welcomeScreen");

if (window.matchMedia("(hover: hover) and (pointer: fine)")
    .matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches) {

    royalCard.addEventListener("mousemove", function (event) {

        const rect = royalCard.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        royalCard.style.setProperty(
            "--tilt-x", rotateX + "deg"
        );

        royalCard.style.setProperty(
            "--tilt-y", rotateY + "deg"
        );
    });

    royalCard.addEventListener("mouseleave", function () {

        royalCard.style.setProperty("--tilt-x", "0deg");
        royalCard.style.setProperty("--tilt-y", "0deg");

    });
}

// LEVEL 5 - WHATSAPP INVITATION SHARING

const whatsappShare =
    document.getElementById("whatsappShare");

whatsappShare.addEventListener("click", function () {

    const message =
        "💍 You Are Cordially Invited!\n\n" +
        "Muhammad Nowshad & Azmeera\n" +
        "and\n" +
        "Muhammad Nowfal & Rinaz\n\n" +
        "📅 Saturday, 14 November 2026\n" +
        "📍 H.M Auditorium, Uppinangady\n\n" +
        "We request your presence and blessings.";

    const websiteLink =
        window.location.protocol === "https:"
            ? "\n\n" + window.location.href
            : "";

    const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(message + websiteLink);

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
});
