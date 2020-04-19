let slideItems = document.querySelectorAll('.slide');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicator');
let currentSlide = 0;
let carouselInterval = 2000;

const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';

// activate controls, if javascript is enabled
indContainer.style.display = 'block'; // flex
document.querySelector('.controls').style.display = 'block'; // block

// carousel basic engine
let gotoNSlide = n => {
  slideItems[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slideItems.length) % slideItems.length;
  slideItems[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
};

let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

// controls
let playbackStatus = true;
let pausePlayBtn = document.querySelector('#pause-play-btn');
let nextBtn = document.querySelector('#next-btn');
let prevBtn = document.querySelector('#prev-btn');
let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlideShow = () => {
  if (playbackStatus) {
    pausePlayBtn.innerHTML = FA_PLAY;
    playbackStatus = !playbackStatus;
    clearInterval(slideInterval);
  }
};

let playSlideShow = () => {
  pausePlayBtn.innerHTML = FA_PAUSE;
  playbackStatus = !playbackStatus;
  slideInterval = setInterval(gotoNextSlide, carouselInterval);
};

let clickPausePlayBtn = () =>
  playbackStatus ? pauseSlideShow() : playSlideShow();

let clickNextBtn = () => {
  pauseSlideShow();
  gotoNextSlide();
};

let clickPrevBtn = () => {
  pauseSlideShow();
  gotoPrevSlide();
};

pausePlayBtn.addEventListener('click', clickPausePlayBtn);
nextBtn.addEventListener('click', clickNextBtn);
prevBtn.addEventListener('click', clickPrevBtn);

// indicators
const clickIndicatorBtn = e => {
  let target = e.target;

  if (target.classList.contains('indicator')) {
    pauseSlideShow();
    gotoNSlide(+target.getAttribute('data-slide-to'));
  }
};

// use delegation to optimize the event handler
indContainer.addEventListener('click', clickIndicatorBtn);

// set keyboard controls
let pressKeyControl = e => {
  if (e.key === LEFT_ARROW) clickPrevBtn();
  if (e.key === RIGHT_ARROW) clickNextBtn();
  if (e.key === SPACE) clickPausePlayBtn();
};

document.addEventListener('keydown', pressKeyControl);

// add swipe support
let carousel = document.querySelector('.carousel');
let swipeStartX = null;
let swipeEndX = null;

let swipeStart = e => {
  swipeStartX = e.changedTouches[0].pageX;
};

let swipeEnd = e => {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX > 100 && clickPrevBtn();
  swipeStartX - swipeEndX < -100 && clickNextBtn();
};

carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);
