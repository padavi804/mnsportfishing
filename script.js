// Toggle the navigation menu on mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector("header nav ul");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Add a class to show the menu on mobile when the hamburger is clicked
// Toggle the 'show' class which is not defined in the CSS, but will be toggled to show the menu

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  let currentSlide = 0;
  
  function updateSlide() {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  });
  
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateSlide();
    });
  });

  const carousel = document.querySelector('.carousel');
  let startX;
  let currentX;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Touch events
  container.addEventListener('touchstart', dragStart);
  container.addEventListener('touchmove', drag);
  container.addEventListener('touchend', dragEnd);

  // Mouse events
  container.addEventListener('mousedown', dragStart);
  container.addEventListener('mousemove', drag);
  container.addEventListener('mouseup', dragEnd);
  container.addEventListener('mouseleave', dragEnd);

  function dragStart(e) {
    startX = getPositionX(e);
    isDragging = true;
    container.style.cursor = 'grabbing';
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = getPositionX(e);
    const diff = currentX - startX;
    setTransform(prevTranslate + diff);
  }

  function dragEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > 100) {
      if (movedBy < 0 && currentSlide < slides.length - 1) {
        currentSlide += 1;
      } else if (movedBy > 0 && currentSlide > 0) {
        currentSlide -= 1;
      }
    }

    setSlidePosition(currentSlide);
    container.style.cursor = 'grab';
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function setTransform(x) {
    currentTranslate = x;
    container.style.transform = `translateX(${x}px)`;
  }

  function setSlidePosition(slide) {
    currentTranslate = slide * -carousel.clientWidth;
    prevTranslate = currentTranslate;
    setTransform(currentTranslate);
    updateIndicators();
  }

  function updateIndicators() {
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
});
