document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.getElementById("carouselTrack") as HTMLElement;
  const sideModal = document.getElementById("sideModal") as HTMLElement;
  const sideModalText = document.getElementById("sideModalText") as HTMLElement;
  const totalSlides = 7;
  let currentSlide = 0;

  // === Carousel Controls ===
  (window as any).nextSlide = (): void => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  };

  (window as any).prevSlide = (): void => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

 function updateCarousel(): void {
  const boxWidth = 280; // width of one carousel-box
  const offset = currentSlide * boxWidth;
  carouselTrack.style.transform = `translateX(-${offset}px)`;
}

  // === Open Split Modal ===
  (window as any).openSplitBox = (index: number): void => {
    const modal = document.getElementById(`splitBox${index}`) as HTMLElement | null;
    if (modal) modal.classList.add("active");
  };

  // === Close Split Modal ===
  (window as any).closeAllSplitBoxes = (): void => {
  const modals = document.querySelectorAll(".split-box-modal");
  modals.forEach((modal) => {
    (modal as HTMLElement).classList.remove("active");
  });

  // Also close third modals and side modal if needed
  const thirdModals = document.querySelectorAll(".third-modal");
  thirdModals.forEach((modal) => {
    (modal as HTMLElement).classList.remove("active");
  });

  const sideModal = document.getElementById("sideModal");
  if (sideModal) sideModal.classList.remove("active");
};


  // === Open Side Modal + Launch 3rd Modal ===
  (window as any).openSideModal = (side: "left" | "right", index: number): void => {
    if (sideModal && sideModalText) {
      const label = side.toUpperCase();
      sideModalText.textContent = `You selected: ${label} option in Box #${index}`;
      sideModal.classList.add("active");
    }

    const thirdModalId = `thirdModal-${index}-${side}`;
    const thirdModal = document.getElementById(thirdModalId) as HTMLElement | null;
    if (thirdModal) thirdModal.classList.add("active");
  };

  // === Close Side Modal ===
  (window as any).closeSideModal = (): void => {
    if (sideModal) sideModal.classList.remove("active");
  };

  // === Close Third-Level Modal ===
  (window as any).closeThirdModal = (id: string): void => {
    const modal = document.getElementById(id) as HTMLElement | null;
    if (modal) modal.classList.remove("active");
  };
});

function toggleDropdown(el: HTMLElement): void {
  const content = el.nextElementSibling as HTMLElement | null;

  if (content) {
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }
}