// Паттерн модуль слайдер

(function () {
  let carousel = document.querySelector('#carousel');
  let slides = document.querySelectorAll('.slide');
  let controls = document.querySelector('.controls');
  let pauseButton = document.querySelector('#pause');
  let prevButton = document.querySelector('#previous');
  let nextButton = document.querySelector('#next');
  let indicatorContainer = document.querySelector('.indicators');
  let indicators = document.querySelectorAll('.indicator');

  let slideCount = slides.length;
  let isPlaying = true;
  let currentSlide = 0;
  let slideInterval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;

  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  const SPACE = ' ';

  const goToSlide = n => {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');

    currentSlide = (n + slideCount) % slideCount;

    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  const nextSlide = () => goToSlide(currentSlide + 1);

  const prevSlide = () => goToSlide(currentSlide - 1);

  const pauseSlideshow = () => {
    if (isPlaying) {
      pauseButton.innerHTML = 'Play';
      isPlaying = !isPlaying;
      clearInterval(slideInterval);
    }
  };

  const playSlideshow = () => {
    pauseButton.innerHTML = 'Pause';
    isPlaying = !isPlaying;
    slideInterval = setInterval(nextSlide, 2000);
  };

  const clickPause = () => (isPlaying ? pauseSlideshow() : playSlideshow());

  const clickNext = () => {
    pauseSlideshow();
    nextSlide();
  };

  const clickPrev = () => {
    pauseSlideshow();
    prevSlide();
  };

  // Indicators

  const clickIndicator = e => {
    let target = e.target;

    if (target.classList.contains('indicator')) {
      pauseSlideshow();
      goToSlide(+target.getAttribute('data-slide-to'));
    }
  };

  const pressKey = e => {
    if (e.key === LEFT_ARROW) clickPrev();
    if (e.key === RIGHT_ARROW) clickNext();
    if (e.key === SPACE) clickPause();
  };

  // Swipes

  const swipeStart = e => (swipeStartX = e.changedTouches[0].pageX);

  const swipeEnd = e => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX > 120 && clickPrev();
    swipeStartX - swipeEndX < -120 && clickNext();
  };

  const setListeners = () => {
    pauseButton.addEventListener('click', clickPause);
    nextButton.addEventListener('click', clickNext);
    prevButton.addEventListener('click', clickPrev);
    indicatorContainer.addEventListener('click', clickIndicator);
    document.addEventListener('keydown', pressKey);
    carousel.addEventListener('touchstart', swipeStart);
    carousel.addEventListener('touchend', swipeEnd);
  };

  let init = () => {
    controls.style.display = 'block';
    indicatorContainer.style.display = 'block';
    setListeners();
    slideInterval = setInterval(nextSlide, slideInterval);
  };

  init();
})();
