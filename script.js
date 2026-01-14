// --- 1️⃣ Bilderliste ---
const images = [
  "images/01.jpg",
  "images/02.jpg",
  "images/03.jpg"
];

// --- 2️⃣ Galerie erstellen ---
const gallery = document.getElementById("gallery");

images.forEach((src, index) => {
  const section = document.createElement("section");
  section.className = "slide";
  // erstes Bild unten, letztes oben
  section.style.zIndex = images.length - index;

  const img = document.createElement("img");
  img.src = src;

  section.appendChild(img);
  gallery.appendChild(section);
});

// --- 3️⃣ Desktop-Check ---
const isDesktop = window.matchMedia("(min-width: 768px)").matches;

if (isDesktop) {
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;

  document.body.style.height = `${total * 100}vh`;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    slides.forEach((slide, i) => {
      const start = i / total;
      const end = (i + 1) / total;

      if (progress >= start && progress <= end) {
        // --- lokale Progress berechnen (0 -> unten, 1 -> oben)
        const local = (progress - start) / (end - start);
        // Bild von unten nach oben abschneiden
        slide.style.clipPath = `inset(${local * 100}% 0 0 0)`;
      } else if (progress > end) {
        slide.style.clipPath = "inset(100% 0 0 0)"; // vollständig abgeschnitten
      } else {
        slide.style.clipPath = "inset(0 0 0 0)"; // komplett sichtbar
      }
    });
  });
}

// Mobile: scroll-snap übernimmt die Fullscreen-Logik
