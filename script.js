// --- 1️⃣ Liste deiner Bilder ---
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
  // Erstes Bild oben, damit Scrollrichtung korrekt ist
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

  // Body-Höhe für Scroll
  document.body.style.height = `${total * 100}vh`;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    slides.forEach((slide, i) => {
      const start = i / total;
      const end = (i + 1) / total;

      if (progress >= start && progress <= end) {
        // 🔹 lokal progress 0 → Bild komplett sichtbar, 1 → Bild komplett verschwunden
        const local = (progress - start) / (end - start);

        // Bild wird MIT der Scrollrichtung abgeschnitten
        // (von unten nach oben)
        slide.style.clipPath = `inset(${0}% 0 ${local * 100}% 0)`;
      } else if (progress > end) {
        slide.style.clipPath = "inset(0 0 100% 0)"; // komplett abgeschnitten
      } else {
        slide.style.clipPath = "inset(0 0 0 0)"; // komplett sichtbar
      }
    });
  });
}

// Mobile: scroll-snap übernimmt Fullscreen-Slides
