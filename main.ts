document.addEventListener("DOMContentLoaded", () => {
  const splitBox = document.getElementById("splitBox") as HTMLElement | null;
  const sideModal = document.getElementById("sideModal") as HTMLElement | null;
  const sideModalText = document.getElementById("sideModalText") as HTMLElement | null;
  const carouselTrack = document.getElementById("carouselTrack") as HTMLElement | null;

  let currentSlide = 0;
  const totalSlides = 7;

  // === Modal Logic ===
  function openSplitBox(index: number): void {
    if (splitBox) {
      splitBox.classList.add("active");
    }
  }

  function closeSplitBox(): void {
    if (splitBox) {
      splitBox.classList.remove("active");
    }
  }

  function openSideModal(side: "left" | "right"): void {
    if (sideModal && sideModalText) {
      sideModalText.textContent =
        side === "left"
          ? "You clicked the LEFT side. Insert your left-side content here."
          : "You clicked the RIGHT side. Insert your right-side content here.";
      sideModal.classList.add("active");
    }
  }

  function closeSideModal(): void {
    if (sideModal) {
      sideModal.classList.remove("active");
    }
  }

  // === Carousel Logic ===
  function updateCarousel(): void {
    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

 function nextSlide(): void {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide(): void {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

  // === Expose globally for HTML inline onclicks ===
  (window as any).openSplitBox = openSplitBox;
  (window as any).closeSplitBox = closeSplitBox;
  (window as any).openSideModal = openSideModal;
  (window as any).closeSideModal = closeSideModal;
  (window as any).nextSlide = nextSlide;
  (window as any).prevSlide = prevSlide;
});