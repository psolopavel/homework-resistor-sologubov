let wrapper = document.querySelector('.wrapper')
const slides = document.querySelectorAll('.screen')
const PageSlider = new Swiper('.page', {
   wrapperClass: "page__wrapper",
   slideClass: 'page__screen',
   direction: 'vertical',
   slidesPerView: 'auto',
   spaceBetween: 30,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
   },
   mousewheel: {
      sensitivity: 1,
   },
   parallax: true,
   watchOverflow: true,

   speed: 800,

   observe: true,

   observeParents: true,

   observeSlideChildren: true,

   pagination: {
      el: '.page__pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: "page__bullet",
      bulletActiveClass: "page__bullet_active"
   },
   init: false,
   on: {
      init: function () {
         SetscrollType()
         wrapper.classList.add('_loaded');
      },
      resize: function () {
         SetscrollType()
      },
      'slideChange': function () {
         lichnuk()
      }
   },
});

function SetscrollType() {
   if (wrapper.classList.contains('_free')) {
      wrapper.classList.remove('_free');
      PageSlider.params.freeMode = false;
   }
   for (let index = 0; index < PageSlider.slides.length; index++) {
      const PageSlid = PageSlider.slides[index];
      const PageSlideContent = PageSlid.querySelector('.screen__content')
      if (PageSlideContent) {
         const PageContentHeight = PageSlideContent.offsetHeight;
         if (PageContentHeight > window.innerHeight) {
            wrapper.classList.add('_free');
            PageSlider.params.freeMode = {
               enabled: true,
               minimumVelocity: 0.02,
               momentum: true,
               momentumBounce: true,
               momentumBounceRatio: 1,
               momentumRatio: 1,
               momentumVelocityRatio: 1,
               sticky: false,
            }
            break;
         }
      }
   }
}
function lichnuk() {
   let slide = slides[PageSlider.realIndex]
   const numbers = slide.querySelectorAll('[data-swip-number]')
   if (numbers) {
      numbers.forEach(el => {
         const ElValue = el.getAttribute('data-swip-start')
         el.innerHTML = 0
         let j = 0
         console.log(j);
         console.log(ElValue);
         let timer = setInterval(function () {
            if (j <= ElValue - 1) {
               ++j
               el.innerHTML = j
            } else {
               clearInterval(timer)
               j = 0
            }
         }, el.getAttribute('data-swip-number'))
      });
   }
}
PageSlider.init();
