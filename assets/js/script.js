// #region Slider
// JavaScript for the image slideshow
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
  }, 1000); // every 100 seconds
}
// Start the slideshow
showSlides(slideIndex);
startAutoSlide();
// #endregion
// #region Form Submission
// Form submission "Subscripetion"
// regular expression til email
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

// Global variabel vi kan bruge til at holde styr på om der er fejl (true/false)
let formErrors = false;

function submitForm(event) {
  // PreventDefault for ikke at refreshe siden
  event.preventDefault();

  // Kør clearErrors funktionen hver gang vi "submitter" for at fjerne tidligere fejl beskeder
  clearErrors();

  // Her henter vi alle felter for lettere at kunne arbejde med dem
  let formFields = event.target;
  let fullName = formFields.fullName;
  let email = formFields.email;

  // hvis fornavn er tomt eller der kun findes et tegn i fornavn så vis en fejl besked
  if (isValueEmpty(fullName)) {
    setErrorMessage(fullName, 'Fulde Navn skal udfyldes');
  } else if (isValueLengthLessThen(fullName, 2)) {
    setErrorMessage(fullName, 'Dit Navn skal være mindst to tegn');
  }

  // hvis email value er tom eller ikke passer med email regex så vis en fejl besked
  if (isValueEmpty(email)) {
    setErrorMessage(email, 'Email skal udfyldes');
  } else if (!emailRegex.test(email.value)) {
    setErrorMessage(email, 'Den indtastede email er ikke gylding');
  }

  // Hvis der ikke er nogle errors længere så vis en besked til brugeren om at formularen er sendt
  if (formErrors === false) {
    alert('Tak - din formular er nu afsendt');
  }
}

// Funktion til at tjekke om et felts værdi er tom, efter vi har "trimmet" den for white space (mellemrum)
function isValueEmpty(field) {
  if (field.value.trim() === '') {
    return true;
  } else return false;
}

// Funktion til at tjekke om en værdis længde er noget bestemt (length)
function isValueLength(field, length) {
  console.log('length', field.value.length);
  if (field.value.length === length) {
    return true;
  } else return false;
}

// Funktion til at tjekke om en værdis længde er mindre end "length" variablen
function isValueLengthLessThen(field, length) {
  if (field.value.length < length) {
    return true;
  } else return false;
}

// Funktion til at sætte fejlbeskeder under et bestemt element (targetSibling)
// message argumentet er selve den besked der skal vises til brugeren
function setErrorMessage(targetSibling, message) {
  let errorElement = document.createElement('b');
  errorElement.classList.add('error');
  errorElement.innerText = message;
  targetSibling.after(errorElement);
  formErrors = true;
}

// Funktion til at fjerne alle fejlbeskeder
// Finder alle elementer med .error classen og sletter dem i et for-loop
function clearErrors() {
  let errors = document.querySelectorAll('.error');
  errors.forEach((error) => error.remove());
  formErrors = false;
}
// #endregion
