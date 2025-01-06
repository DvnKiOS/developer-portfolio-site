// Toggle the menu open/close
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Image cycling functionality
let currentImageIndex = 0;
function cycleImages() {
  const images = document.querySelectorAll('.mobile-project-details .mobile-project-image');
  images.forEach(image => image.classList.remove('active'));
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
}

// Intersection Observer setup
const createObserver = (className, visibleClass) => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add(visibleClass);
          }
      });
  });

  const elements = document.querySelectorAll(className);
  elements.forEach((el) => observer.observe(el));
};

// Observers for specific classes
createObserver('.content', 'visible');
createObserver('.content-2', 'visible-2');

// Handle form submission and custom alert
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');

  function showAlert(message) {
      const alertBox = document.getElementById('custom-alert');
      const alertMessage = document.getElementById('alert-message');
      alertMessage.textContent = message;
      alertBox.classList.remove('hidden-alert');
  }

  window.closeAlert = function () {
      const alertBox = document.getElementById('custom-alert');
      alertBox.classList.add('hidden-alert');
  };

  form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      showAlert("Please wait...");

      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
      })
      .then(async (response) => {
          const jsonResponse = await response.json();
          if (response.status === 200) {
              showAlert("Message Sent Successfully!");
          } else {
              showAlert("Error: " + jsonResponse.message);
          }
      })
      .catch(error => {
          console.error("Error:", error);
          showAlert("Something went wrong!");
      })
      .finally(() => {
          form.reset();
      });
  });
});

// Modal handling
const modal = document.getElementById('privacyModal');
const openModalButton = document.getElementById('openModalButton');
const closeButton = document.querySelector('.close-button');

openModalButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

window.addEventListener('popstate', (e) => {
  if (e.state?.modalOpen) {
      modal.style.display = 'flex';
  } else {
      modal.style.display = 'none';
  }
});

function checkHashForModal() {
  if (window.location.hash === '#privacy-notice') {
      openModal();
  }
}

function openModal() {
  modal.style.display = 'flex';
  if (window.location.hash !== '#privacy-notice') {
      history.pushState({ modalOpen: true }, '', '#privacy-notice');
  }
}

function closeModal() {
  modal.style.display = 'none';
  history.pushState(null, '', window.location.pathname);
}

window.addEventListener('DOMContentLoaded', checkHashForModal);

// Dynamic modal loading functionality
document.getElementById('privacyButton').addEventListener('click', loadModal);

function loadModal() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modalContainer';
  document.body.appendChild(modalContainer);

  fetch('modal.html')
      .then((response) => response.text())
      .then((html) => {
          modalContainer.innerHTML = html;
          attachModalEvents();
      })
      .catch((error) => console.error('Error loading modal:', error));
}

function attachModalEvents() {
  const modal = document.getElementById('privacyModal');
  const closeButton = modal.querySelector('.close-btn');
  window.openModal = function () { modal.style.display = 'flex'; };
  window.closeModal = function () { modal.style.display = 'none'; };

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          closeModal();
      }
  });
}

// Observing content for visibility
document.querySelectorAll(".content").forEach((el) => observer.observe(el));
document.querySelectorAll(".content-2").forEach((el) => observer.observe(el));
