function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}





let currentImageIndex = 0;

function cycleImages() {
    // Get all images within mobile-project-details
    const images = document.querySelectorAll('.mobile-project-details .mobile-project-image');

    // Remove 'active' from all images
    images.forEach(image => image.classList.remove('active'));

    // Increment index and reset if at the end
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Set the next image to active
    images[currentImageIndex].classList.add('active');
}




// Testing connection (you can remove this once confirmed working)

