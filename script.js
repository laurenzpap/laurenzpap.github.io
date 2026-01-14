const images = [
  "images/01.jpg",
  "images/02.jpg",
  "images/03.jpg"
];

const gallery = document.getElementById("gallery");

images.forEach(src => {
  const section = document.createElement("section");
  section.className = "slide";

  const img = document.createElement("img");
  img.src = src;

  section.appendChild(img);
  gallery.appendChild(section);
});

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
        const local = (progress - start) / (end - start);
        slide.style.clipPath = `inset(0 0 ${ (1 - local) * 100 }% 0)`;
      } else if (progress > end) {
        slide.style.clipPath = "inset(100% 0 0 0)";
      } else {
        slide.style.clipPath = "inset(0 0 0 0)";
      }
    });
  });
}
