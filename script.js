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
  // Z-Index: erstes Bild oben
  section.style.zIndex = images.length - index;

  const img = document.createElement("img");
  img.src = src;
  section.appendChild(img);

  gallery.appendChild(section);
});

// --- 3️⃣ Scroll-Effekt (Desktop + Mobile) ---
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
      // local = 0 → Bild komplett sichtbar
      // local = 1 → Bild komplett abgeschnitten
      const local = (progress - start) / (end - start);
      // Bild von unten nach oben abschneiden
      slide.style.clipPath = `inset(0 0 ${local * 100}% 0)`;
    } else if (progress > end) {
      // Bild vollständig abgeschnitten
      slide.style.clipPath = "inset(0 0 100% 0)";
    } else {
      // Bild komplett sichtbar
      slide.style.clipPath = "inset(0 0 0 0)";
    }
  });
});
