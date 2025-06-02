let slideIndex = 1;
let autoSlideTimeout;

// Manual next/prev
function plusSlides(n) {
  clearTimeout(autoSlideTimeout); // stop auto when user interacts
  showSlides((slideIndex += n));
  startAutoSlide();
}

// Manual thumbnail click
function currentSlide(n) {
  clearTimeout(autoSlideTimeout);
  showSlides((slideIndex = n));
  startAutoSlide();
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');
}

function startAutoSlide() {
  autoSlideTimeout = setTimeout(() => {
    slideIndex++;
    showSlides(slideIndex);
    startAutoSlide();
  }, 10000); // every 10 seconds
}
// Start the slideshow
showSlides(slideIndex);
startAutoSlide();
