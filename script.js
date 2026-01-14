// --- 1️⃣ Liste deiner Bilder ---
// Passe hier die Dateinamen an (01.jpg, 02.jpg, ...)
const images = [
  "images/01.jpg",
  "images/02.jpg",
  "images/03.jpg"
];

// --- 2️⃣ Galerie erstellen ---
const gallery = document.getElementById("gallery");

images.forEach(src => {
  const section = document.createElement("section");
  section.className = "slide";

  const img = document.createElement("img");
  img.src = src;

  section.appendChild(img);
  gallery.appendChild(section);
});

// --- 3️⃣ Prüfen, ob Desktop ---
// Desktop = min-width 768px
const isDesktop = window.matchMedia("(min-width: 768px)").matches;

if (isDesktop) {
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;

  // Body-Höhe anpassen für Scroll
  document.body.style.height = `${total * 100}vh`;

  // Scroll-Event
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    slides.forEach((slide, i) => {
      const start = i / total;
      const end = (i + 1) / total;

      if (progress >= start && progress <= end) {
        const local = 1 - (progress - start) / (end - start);
        // 🔹 Hier: Bild wird von unten nach oben abgeschnitten
        slide.style.clipPath = `inset(0 0 ${ (1 - local) * 100 }% 0)`;
      } else if (progress > end) {
        // Nach dem Scroll komplett angezeigt (oben + unten sichtbar)
        slide.style.clipPath = "inset(0 0 0 0)";
      } else {
        // Vor dem Scroll komplett abgeschnitten (unten alles verborgen)
        slide.style.clipPath = "inset(0 0 100% 0)";
      }
    });
  });
}

// --- 4️⃣ Mobile: keine extra Logik nötig ---
// CSS scroll-snap sorgt für Fullscreen-Slides
