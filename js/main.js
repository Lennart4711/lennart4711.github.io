// Get DOM elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

// Populate the gallery using the imageFiles array (provided via Liquid)
imageFiles.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Photo " + (index + 1);
  img.dataset.index = index;
  gallery.appendChild(img);
});

let currentIndex = 0;

// Open modal when an image is clicked
gallery.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'IMG') {
    currentIndex = parseInt(e.target.dataset.index, 10);
    openModal(currentIndex);
  }
});

// Function to open the modal with the selected image
function openModal(index) {
  modal.style.display = 'flex';
  modalImg.src = imageFiles[index];
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Navigation functions for next and previous images
function showNext() {
  currentIndex = (currentIndex + 1) % imageFiles.length;
  modalImg.src = imageFiles[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  modalImg.src = imageFiles[currentIndex];
}

// Event listeners for modal controls
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  showNext();
});
modalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrev();
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Keyboard navigation: right arrow for next, left arrow for previous, escape to close
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  }
});
