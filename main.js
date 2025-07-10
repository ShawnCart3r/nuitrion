document.addEventListener("DOMContentLoaded", function () {
    var carouselTrack = document.getElementById("carouselTrack");
    var sideModal = document.getElementById("sideModal");
    var sideModalText = document.getElementById("sideModalText");
    var totalSlides = 9;
    var currentSlide = 0;
    // === Carousel Controls ===
    window.nextSlide = function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };
    window.prevSlide = function () {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };
    function updateCarousel() {
        var box = document.querySelector(".carousel-box");
        var boxWidth = (box === null || box === void 0 ? void 0 : box.offsetWidth) || 280;
        var offset = currentSlide * boxWidth;
        carouselTrack.style.transform = "translateX(-".concat(offset, "px)");
    }
    // === Open Split Modal ===
    window.openSplitBox = function (index) {
        var modal = document.getElementById("splitBox".concat(index));
        if (modal)
            modal.classList.add("active");
    };
    // === Close Split Modal ===
    window.closeAllSplitBoxes = function () {
        var modals = document.querySelectorAll(".split-box-modal");
        modals.forEach(function (modal) {
            modal.classList.remove("active");
        });
        // Also close third modals and side modal if needed
        var thirdModals = document.querySelectorAll(".third-modal");
        thirdModals.forEach(function (modal) {
            modal.classList.remove("active");
        });
        var sideModal = document.getElementById("sideModal");
        if (sideModal)
            sideModal.classList.remove("active");
    };
    // === Open Side Modal + Launch 3rd Modal ===
    window.openSideModal = function (side, index) {
        if (sideModal && sideModalText) {
            var label = side.toUpperCase();
            sideModalText.textContent = "You selected: ".concat(label, " option in Box #").concat(index);
            sideModal.classList.add("active");
        }
        var thirdModalId = "thirdModal-".concat(index, "-").concat(side);
        var thirdModal = document.getElementById(thirdModalId);
        if (thirdModal)
            thirdModal.classList.add("active");
    };
    // === Close Side Modal ===
    window.closeSideModal = function () {
        if (sideModal)
            sideModal.classList.remove("active");
    };
    // === Close Third-Level Modal ===
    window.closeThirdModal = function (id) {
        var modal = document.getElementById(id);
        if (modal)
            modal.classList.remove("active");
    };
});
function toggleDropdown(el) {
    var content = el.nextElementSibling;
    if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
}
