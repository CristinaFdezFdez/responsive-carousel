"use strict";

document.addEventListener('DOMContentLoaded', () => {

  const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

    // Manejador de navegación con teclado
    document.addEventListener('keydown', handleKeyboardNavigation);

    function handleKeyboardNavigation(event) {
      if (event.key === 'ArrowLeft') {
        swiper.slidePrev(); 
      } else if (event.key === 'ArrowRight') {
        swiper.slideNext(); 
      }
    }

  function fetchImages() {
    const apiUrl = 'https://picsum.photos/v2/list?page=1&limit=1000';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const slides = data.map(image => {
          return `
            <div class="swiper-slide">
              <div class="picture">
                <img src="${image.download_url}" alt="Imagen de carrusel">
              </div>
            </div>
          `;
        }).join('');
        document.querySelector('.swiper-wrapper').innerHTML = slides;
        swiper.update(); 
      })
      .catch(error => console.error('Error fetching images:', error));
  }

  fetchImages();
});
