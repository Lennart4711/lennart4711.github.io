// Get DOM elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

let startX = 0;
let currentIndex = 0;

// Show newest photos first
imageFiles.reverse()
// Populate the gallery using the imageFiles array (provided via Liquid)
// imageFiles.forEach((src, index) => {
//   const img = document.createElement('img');
//   img.src = src;
//   img.alt = "Photo " + (index + 1);
//   img.dataset.index = index;
//   gallery.appendChild(img);
// });

function loadImageSequentially(index) {
  if (index >= imageFiles.length) return; // Stop when no more images

  // Create a new image element
  const img = new Image();
  img.src = imageFiles[index];
  img.alt = "Photo " + (index + 1);
  
  // When the image has loaded, append it to the gallery and load the next one
  img.onload = () => {
    gallery.appendChild(img);
    loadImageSequentially(index + 1);
  };
  
  // Optional: handle error loading image
  img.onerror = () => {
    console.error("Error loading image:", imageFiles[index]);
    loadImageSequentially(index + 1);
  };
}

loadImageSequentially(0);

// Open modal when an image is clicked
gallery.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'IMG') {
    currentIndex = parseInt(e.target.dataset.index, 10);
    openModal(currentIndex);
  }
});

function openModal(index) {
  modal.style.display = 'flex';
  modalImg.src = imageFiles[index];
}

function closeModal() {
  modal.style.display = 'none';
}

function showNext() {
  currentIndex = (currentIndex + 1) % imageFiles.length;
  modalImg.src = imageFiles[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  modalImg.src = imageFiles[currentIndex];
}

// Event listeners
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  showNext();
});
modalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrev();
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

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

// Swipe gesture support
modal.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  let diffX = startX - endX;
  
  if (diffX > 50) {
    showNext(); // Swipe left
  } else if (diffX < -50) {
    showPrev(); // Swipe right
  }
});
