'use strict';

///////////////////////////////////////
const header = document.querySelector('header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

// SMoooth scrolling functionality

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Modern Approach
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Smooth Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link') && id.length > 1) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TAB COMPONENT

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // Remove all the active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );

  // Activate Tab that clicked
  clicked.classList.add('operations__tab--active');

  // Show/Hide Content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// Using Bind method to pass extra "Arguments"
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation Bar: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);

observer.observe(header);

// Reveal Sections as Scrolled up
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// Lazy Loading Images: Using Intersection Observation API
const imgTargets = document.querySelectorAll('.features__img');

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px ',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider Component
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlides = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class ="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Functions
  // Activate DOT css to the current slide
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const gotoSlide = slide => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX( ${100 * (i - slide)}%)`;
    });
  };

  // Next Slide
  const nextSlide = function () {
    if (currSlide === maxSlides - 1) currSlide = 0;
    else currSlide++;

    gotoSlide(currSlide);
    activateDot(currSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    gotoSlide(currSlide);
    activateDot(currSlide);
  };

  const init = () => {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      activateDot(slide);
      gotoSlide(slide);
    }
  });
};
slider();
