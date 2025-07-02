document.addEventListener("DOMContentLoaded", () => {
  // --- Modal Functions ---
  function openModal(id: string): void {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
  }

  function closeModal(id: string): void {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
  }

  // Close modal when clicking outside of it
  window.onclick = function (event: MouseEvent): void {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target === modal) {
        (modal as HTMLElement).style.display = "none";
      }
    });
  };

  // --- Carousel Functions ---
  let currentSlide = 0;

  function updateCarousel(): void {
    const track = document.querySelector(".carousel-track") as HTMLElement;
    const slides = document.querySelectorAll(".square");
    if (track) {
      const offset = -currentSlide * 100;
      track.style.transform = `translateX(${offset}%)`;
    }
  }

  function nextSlide(): void {
    const slides = document.querySelectorAll(".square");
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide(): void {
    const slides = document.querySelectorAll(".square");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // --- Make Functions Available to HTML ---
  (window as any).openModal = openModal;
  (window as any).closeModal = closeModal;
  (window as any).nextSlide = nextSlide;
  (window as any).prevSlide = prevSlide;

  // --- Swipe Support (Touch Devices Only) ---
  const track = document.querySelector(".carousel-track") as HTMLElement | null;
  const swipeHint = document.getElementById("swipeHint") as HTMLElement | null;
  let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipe(): void {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }

  // Only enable swipe and hint for touch-capable tablet or smaller devices
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isTabletOrSmaller = window.innerWidth <= 1024;

  if (track && isTouchDevice && isTabletOrSmaller) {
    track.addEventListener("touchstart", (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener("touchend", (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    // Show swipe hint text
    if (swipeHint) {
      swipeHint.classList.add("show");
    }
  }
});

// --- Aspect Ratio Utility for Images ---
window.addEventListener("load", () => {
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(
    ".box-content img, .third img, .quad img, .left img, .right img, .single-box img"
  );

  images.forEach((img: HTMLImageElement) => {
    const applyAspectRatio = () => {
      const parent = img.parentElement as HTMLElement | null;
      if (parent && img.naturalWidth && img.naturalHeight) {
        parent.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
    };

    if (img.complete) {
      applyAspectRatio();
    } else {
      img.onload = applyAspectRatio;
    }
  });
});