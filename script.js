const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// iOS-sichere Viewport-Höhe
function getViewportHeight() {
  return window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
}

let viewportHeight = getViewportHeight();

// Update bei Rotation / Resize (wichtig für iOS)
window.addEventListener('resize', () => {
  viewportHeight = getViewportHeight();
});

// Haupt-Update-Loop (kein Scroll-Event → smoother)
function update() {
  const scrollY = window.scrollY;

  // Maximale Scroll-Distanz: 1 Viewport pro Bild
  const maxScroll = viewportHeight * (totalSlides - 1);

  // Clamp → verhindert Overshoot durch iOS Momentum
  const clampedScroll = Math.max(0, Math.min(scrollY, maxScroll));

  // Globaler Fortschritt (z. B. 1.3 = Bild 1 → 2, 30%)
  const progress = clampedScroll / viewportHeight;

  slides.forEach((slide, index) => {
    // Lokaler Fortschritt pro Slide (0 → 1)
    const localProgress = Math.min(
      1,
      Math.max(0, progress - index)
    );

    // Von UNTEN nach OBEN abschneiden
    slide.style.clipPath = `inset(0 0 ${ (1 - localProgress) * 100 }% 0)`;
  });

  requestAnimationFrame(update);
}

// Start
update();
