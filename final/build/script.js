// Get all elements
const imageContainer = document.getElementById('imageContainer');
const image2 = document.getElementById('image2');
const heartBtn = document.getElementById('heartBtn');
const heartIcon = document.getElementById('heartIcon');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const sizeContainer = document.getElementById('sizeContainer');
const sizeBtn = document.getElementById('sizeBtn');
const sizeListWrapper = document.getElementById('sizeListWrapper');
const addBtn = document.getElementById('addBtn');

// State
let isFavorited = false;
let isAdded = false;
let isCardHovered = false;
let isHeartHovered = false;
let isSizeHovered = false;

// ============================================
// PRODUCT CARD INTERACTIONS
// ============================================

// Product Card Hover - Show all interactive elements
imageContainer.addEventListener('mouseenter', () => {
  isCardHovered = true;
  
  // Fade to second image (0.5s)
  image2.style.opacity = '1';
  
  // Show heart button (0.5s fade)
  heartBtn.style.opacity = '1';
  
  // Show arrows (0.5s fade)
  arrowLeft.classList.remove('product-card__arrow-btn--hidden');
  arrowRight.classList.remove('product-card__arrow-btn--hidden');
  
  // Show size/add button container (0.5s fade)
  sizeContainer.style.opacity = '1';
});

imageContainer.addEventListener('mouseleave', () => {
  isCardHovered = false;
  
  // Fade back to first image (0.5s)
  image2.style.opacity = '0';
  
  // Hide heart button (0.5s fade)
  heartBtn.style.opacity = '0';
  
  // Hide arrows (0.5s fade)
  arrowLeft.classList.add('product-card__arrow-btn--hidden');
  arrowRight.classList.add('product-card__arrow-btn--hidden');
  
  // Hide size/add button container (0.5s fade)
  sizeContainer.style.opacity = '0';
  
  // Hide size list if it's showing
  sizeListWrapper.style.display = 'none';
  sizeListWrapper.classList.remove('show');
});

// ============================================
// HEART ICON INTERACTIONS
// ============================================

// Heart Button Hover
heartBtn.addEventListener('mouseenter', () => {
  isHeartHovered = true;
  
  // Heart icon gray border fades to black (0.5s)
  heartIcon.classList.add('product-card__heart-icon--hovered');
  
  // Slideshow arrows fade out (0.5s)
  arrowLeft.classList.add('product-card__arrow-btn--hidden');
  arrowRight.classList.add('product-card__arrow-btn--hidden');
});

heartBtn.addEventListener('mouseleave', () => {
  isHeartHovered = false;
  
  // Heart icon black border fades to gray (0.5s)
  heartIcon.classList.remove('product-card__heart-icon--hovered');
  
  // Slideshow arrows fade in (0.5s) - only if card is still hovered
  if (isCardHovered) {
    arrowLeft.classList.remove('product-card__arrow-btn--hidden');
    arrowRight.classList.remove('product-card__arrow-btn--hidden');
  }
});

// Heart Button Click - Toggle favorite
heartBtn.addEventListener('click', () => {
  isFavorited = !isFavorited;
  
  if (isFavorited) {
    // Heart grows to 125% and fills with red (0.5s)
    heartIcon.classList.add('product-card__heart-icon--favorited');
  } else {
    // Heart shrinks to 100% and fills with white (0.5s)
    heartIcon.classList.remove('product-card__heart-icon--favorited');
  }
});

// ============================================
// SIZE BUTTON INTERACTIONS
// ============================================

// Size Button Hover - Show size list
sizeBtn.addEventListener('mouseenter', () => {
  isSizeHovered = true;
  // Label box fades up from the "quick add" button (0.5s)
  sizeListWrapper.style.display = 'block';
  // Force reflow for animation
  void sizeListWrapper.offsetWidth;
  sizeListWrapper.classList.add('show');
});

sizeBtn.addEventListener('mouseleave', (e) => {
  // Check if we're moving to the size list wrapper
  if (!sizeListWrapper.contains(e.relatedTarget)) {
    isSizeHovered = false;
    hideSizeList();
  }
});

// Keep size list visible when hovering over it
sizeListWrapper.addEventListener('mouseenter', () => {
  isSizeHovered = true;
});

sizeListWrapper.addEventListener('mouseleave', (e) => {
  // Check if we're moving to the size button
  if (!sizeBtn.contains(e.relatedTarget)) {
    isSizeHovered = false;
    hideSizeList();
  }
});

function hideSizeList() {
  // Label box fades out (0.5s)
  sizeListWrapper.classList.remove('show');
  setTimeout(() => {
    if (!isSizeHovered) {
      sizeListWrapper.style.display = 'none';
    }
  }, 500); // Match CSS transition time
}

// ============================================
// ADD BUTTON INTERACTIONS
// ============================================

// Add Button Click - Toggle added state
addBtn.addEventListener('click', () => {
  isAdded = !isAdded;
  
  if (isAdded) {
    // Background fills to white, text switches to black (0.5s)
    addBtn.classList.add('product-card__add-btn--active');
  } else {
    // Background reveals to black, text switches to white (0.5s)
    addBtn.classList.remove('product-card__add-btn--active');
  }
  
  // Update database (simulated)
  console.log('Database updated: Item', isAdded ? 'added to' : 'removed from', 'cart');
});

// ============================================
// ARROW BUTTON FUNCTIONALITY (Optional)
// ============================================

arrowLeft.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Previous image');
  // Add your image cycling logic here
});

arrowRight.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Next image');
  // Add your image cycling logic here
});