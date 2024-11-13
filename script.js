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

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add(visible)
//         }
//     })
// })
// JavaScript using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  

  const observerTwo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-2");
      }
    });
  });
  
  document.querySelectorAll(".content").forEach((el) => observer.observe(el));
  document.querySelectorAll(".content-2").forEach((el) => observer.observe(el));

// JavaScript for handling form submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form'); 

    // Function to show the custom alert with a specific message
    function showAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.textContent = message; // Set the alert message
        alertBox.classList.remove('hidden-alert'); // Show the alert
    }

    // Function to hide the custom alert
    window.closeAlert = function () { // Making it a global function to ensure it can be called from HTML
        const alertBox = document.getElementById('custom-alert');
        alertBox.classList.add('hidden-alert'); // Hide the alert
    }

    // Attach form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        showAlert("Please wait..."); // Optional loading message

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    showAlert("Form submitted successfully");
                } else {
                    showAlert("Error: " + json.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showAlert("Something went wrong!");
            })
            .finally(() => {
                form.reset(); // Reset the form
            });
    });
});



// document.querySelectorAll("content").forEach((el) => observer.observe(el));

// Testing connection (you can remove this once confirmed working)

