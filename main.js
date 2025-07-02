document.addEventListener("DOMContentLoaded", function () {
    // --- Modal Functions ---
    function openModal(id) {
        var modal = document.getElementById(id);
        if (modal)
            modal.style.display = "block";
    }
    function closeModal(id) {
        var modal = document.getElementById(id);
        if (modal)
            modal.style.display = "none";
    }
    // Close modal when clicking outside of it
    window.onclick = function (event) {
        var modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };
    // --- Carousel Functions ---
    var currentSlide = 0;
    function updateCarousel() {
        var track = document.querySelector(".carousel-track");
        var slides = document.querySelectorAll(".square");
        if (track) {
            var offset = -currentSlide * 100;
            track.style.transform = "translateX(".concat(offset, "%)");
        }
    }
    function nextSlide() {
        var slides = document.querySelectorAll(".square");
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    function prevSlide() {
        var slides = document.querySelectorAll(".square");
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    // --- Make Functions Available to HTML ---
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    // --- Swipe Support (Touch Devices Only) ---
    var track = document.querySelector(".carousel-track");
    var swipeHint = document.getElementById("swipeHint");
    var touchStartX = 0;
    var touchEndX = 0;
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
    // Only enable swipe and hint for touch-capable tablet or smaller devices
    var isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    var isTabletOrSmaller = window.innerWidth <= 1024;
    if (track && isTouchDevice && isTabletOrSmaller) {
        track.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        track.addEventListener("touchend", function (e) {
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
window.addEventListener("load", function () {
    var images = document.querySelectorAll(".box-content img, .third img, .quad img, .left img, .right img, .single-box img");
    images.forEach(function (img) {
        var applyAspectRatio = function () {
            var parent = img.parentElement;
            if (parent && img.naturalWidth && img.naturalHeight) {
                parent.style.aspectRatio = "".concat(img.naturalWidth, " / ").concat(img.naturalHeight);
            }
        };
        if (img.complete) {
            applyAspectRatio();
        }
        else {
            img.onload = applyAspectRatio;
        }
    });
});
