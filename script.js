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
                    showAlert("Message Sent Successfully!");
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


// Get modal elements
const modal = document.getElementById('privacyModal');
const openModalButton = document.getElementById('openModalButton');
const closeButton = document.querySelector('.close-button');

// Open modal when button is clicked
openModalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close modal when the "X" button is clicked
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Open the modal based on the hash in the URL
function checkHashForModal() {
  if (window.location.hash === '#privacy-notice') {
      openModal();
  }
}

// Function to open the modal
function openModal() {
  const modal = document.getElementById('privacyModal');
  modal.style.display = 'flex';
  // Optional: Prevent re-adding the hash if it's already there
  if (window.location.hash !== '#privacy-notice') {
      history.pushState({ modalOpen: true }, '', '#privacy-notice');
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('privacyModal');
  modal.style.display = 'none';
  // Remove the hash when closing the modal
  history.pushState(null, '', window.location.pathname);
}

// Close modal on "Escape" key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
      closeModal();
  }
});

// Handle back/forward browser navigation
window.addEventListener('popstate', (e) => {
  const modal = document.getElementById('privacyModal');
  if (e.state?.modalOpen) {
      modal.style.display = 'flex';
  } else {
      modal.style.display = 'none';
  }
});

// Check for the hash on page load
window.addEventListener('DOMContentLoaded', checkHashForModal);



// Add event listener to the button to call openPrivacyModal on click
document.getElementById('privacyButton').addEventListener('click', openPrivacyModal);
// Function to load the modal dynamically
function loadModal() {
  const modalContainer = document.createElement('div'); // Container for modal
  modalContainer.id = 'modalContainer';
  document.body.appendChild(modalContainer);

  fetch('modal.html')
      .then((response) => response.text())
      .then((html) => {
          modalContainer.innerHTML = html;
          attachModalEvents(); // Attach event listeners for modal
      })
      .catch((error) => console.error('Error loading modal:', error));
}

// Function to attach modal open/close functionality
function attachModalEvents() {
  const modal = document.getElementById('privacyModal');
  const closeButton = modal.querySelector('.close-btn');

  // Open modal
  window.openModal = function () {
      modal.style.display = 'flex';
  };

  // Close modal
  window.closeModal = function () {
      modal.style.display = 'none';
  };

  // Close modal on outside click
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          closeModal();
      }
  });
}

// Initialize modal on page load
document.addEventListener('DOMContentLoaded', loadModal);

// document.querySelectorAll("content").forEach((el) => observer.observe(el));

// Testing connection (you can remove this once confirmed working)

