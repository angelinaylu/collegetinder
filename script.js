// Photo carousel: tap left/right halves, or swipe on touch screens.
const slides = document.getElementById("slides");
const progress = document.getElementById("progress");
const total = slides.children.length;
let index = 0;

// one segment bar per photo
for (let i = 0; i < total; i++) {
  progress.appendChild(document.createElement("span"));
}

function show(i) {
  index = Math.max(0, Math.min(total - 1, i));
  slides.style.transform = `translateX(-${index * 100}%)`;
  [...progress.children].forEach((bar, n) => bar.classList.toggle("active", n === index));
}

document.querySelector(".tap-zone.left").addEventListener("click", () => show(index - 1));
document.querySelector(".tap-zone.right").addEventListener("click", () => show(index + 1));

// swipe support
let startX = null;
const carousel = document.getElementById("carousel");
carousel.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
carousel.addEventListener("touchend", e => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
  startX = null;
});

show(0);
