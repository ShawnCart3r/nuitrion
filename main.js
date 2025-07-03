document.addEventListener("DOMContentLoaded", function () {
    var splitBox = document.getElementById("splitBox");
    var sideModal = document.getElementById("sideModal");
    var sideModalText = document.getElementById("sideModalText");
    var carouselTrack = document.getElementById("carouselTrack");
    var currentSlide = 0;
    var totalSlides = 7;
    // === Modal Logic ===
    function openSplitBox(index) {
        if (splitBox) {
            splitBox.classList.add("active");
        }
    }
    function closeSplitBox() {
        if (splitBox) {
            splitBox.classList.remove("active");
        }
    }
    function openSideModal(side) {
        if (sideModal && sideModalText) {
            sideModalText.textContent =
                side === "left"
                    ? "You clicked the LEFT side. Insert your left-side content here."
                    : "You clicked the RIGHT side. Insert your right-side content here.";
            sideModal.classList.add("active");
        }
    }
    function closeSideModal() {
        if (sideModal) {
            sideModal.classList.remove("active");
        }
    }
    // === Carousel Logic ===
    function updateCarousel() {
        if (carouselTrack) {
            carouselTrack.style.transform = "translateX(-".concat(currentSlide * 100, "%)");
        }
    }
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    // === Expose globally for HTML inline onclicks ===
    window.openSplitBox = openSplitBox;
    window.closeSplitBox = closeSplitBox;
    window.openSideModal = openSideModal;
    window.closeSideModal = closeSideModal;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
});
