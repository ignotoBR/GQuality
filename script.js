function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "icones/menu.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "icones/close.png";
    }
}


/*PRIMEIRA PÁGINA*/
let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index -1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

setInterval(next, 10000);
/*FIM PRIMEIRA PÁGINA*/


const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
    if (event.type === "touchstart") event.preventDefault();
    event.stopPropagation();
    nav.classList.toggle("active");
    handleClickOutside(menu, () => {
        nav.classList.remove("active");
        setAria();
    });
    setAria();
}

function handleClickOutside(targetElement, callback) {
    const html = document.documentElement;
    function handleHTMLClick(event) {
        if (!targetElement.contains(event.target)) {
            targetElement.removeAttribute("data-target");
            html.removeEventListener("click",handleHTMLClick);
            html.removeEventListener("touchstart",handleHTMLClick);
            callback();
        }
    }
    if (!targetElement.hasAttribute("data-target")) {
        html.addEventListener("click", handleHTMLClick);
        html.addEventListener("touchstart", handleHTMLClick);
        targetElement.setAttribute("data-target", "");
    }
}

function setAria() {
    constisActive = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", isActive);
    if (isActive) {
        btnMenu.setAttribute("aria-label", "Fechar Menu");
    } else {
        btnMenu.setAttribute("aria-label", "Abrir Menu");
    }

}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);


/*Transição Nav-Bar*/
var el = document.getElementById('menu'); // elemento alvo
var numPx = '550'; // Quantidade de pixels a contar do TOP até definir a cor

window.addEventListener('scroll', function() {
    if (window.scrollY > numPx) {
    	el.classList.add('mudaCor'); // adiciona classe "mudaCor"
    } else {
      el.classList.remove('mudaCor'); // remove classe "mudaCor"
    }
});









const galleryImages = document.querySelectorAll('.gallery-image');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.querySelector('.modal-image');
const closeModal = document.querySelector('.close');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentImageIndex = 0;

function openModal(imageIndex) {
  modalImage.src = galleryImages[imageIndex].src;
  modalOverlay.style.display = 'flex';
  currentImageIndex = imageIndex;
  updateNavigationButtons();
}

function closeModalHandler() {
  modalOverlay.style.display = 'none';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex].src;
  updateNavigationButtons();
}

function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex].src;
  updateNavigationButtons();
}

function updateNavigationButtons() {
  nextButton.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'block';
  prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
}

galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    openModal(index);
  });
});

closeModal.addEventListener('click', closeModalHandler);

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModalHandler();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModalHandler();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'ArrowLeft') {
    previousImage();
  }
});

nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', previousImage);

