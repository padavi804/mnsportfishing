document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("header nav ul");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      
      // Toggle active class
      button.classList.toggle('active');
      content.classList.toggle('active');
      
      // Close other accordion items
      accordionButtons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.classList.remove('active');
          otherButton.nextElementSibling.classList.remove('active');
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Testimonials Carousel
  const tContainer = document.querySelector('.testimonial-carousel-container');
  const tSlides = document.querySelectorAll('.testimonial-slide');
  const tPrevButton = document.querySelector('.testimonial-button.prev');
  const tNextButton = document.querySelector('.testimonial-button.next');
  const tIndicators = document.querySelectorAll('.testimonial-indicator');
  let tCurrentSlide = 0;

  function updateTestimonialSlide() {
    tContainer.style.transform = `translateX(-${tCurrentSlide * 100}%)`;
    tIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === tCurrentSlide);
    });
  }

  tPrevButton.addEventListener('click', () => {
    tCurrentSlide = (tCurrentSlide - 1 + tSlides.length) % tSlides.length;
    updateTestimonialSlide();
  });

  tNextButton.addEventListener('click', () => {
    tCurrentSlide = (tCurrentSlide + 1) % tSlides.length;
    updateTestimonialSlide();
  });

  tIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      tCurrentSlide = index;
      updateTestimonialSlide();
    });
  });
});