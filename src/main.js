import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import products from './products.json';
console.log(products);

async function fetchSlideTemplate() {
  const response = await fetch('/slide.html');
  return response.text();
}

async function loadSlides() {
  const template = await fetchSlideTemplate();
  const slidesContainer = document.querySelector('.swiper-wrapper');
  console.log('Template HTML:', template);

  products.forEach(product => {
    let slideHTML = template
      .replace(/{{link}}/g, product.link)
      .replace(/{{image}}/g, product.image)
      .replace(/{{name}}/g, product.name)
      .replace(/{{original_price}}/g, product.original_price ? product.original_price.toFixed(2) : 'N/A')
      .replace(/{{discounted_price}}/g, product.discounted_price ? product.discounted_price.toFixed(2) : ' ');

    slidesContainer.insertAdjacentHTML('beforeend', slideHTML);
  });
}

loadSlides().then(() => {
  const swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
