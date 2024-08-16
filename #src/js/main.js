const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.menu-mobile'); 
const overlay = document.querySelector(".overlay")
let tablet = 991.98
let mob = 767.98
let animSpd = 400
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop
}
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh()
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//tabSwitch
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
  switchBlock.forEach(item => {
    tabSwitch(item.querySelectorAll("[data-nav]"),item.querySelectorAll("[data-block]"))
  })
}

//searchFormSuccess
function searchFormSuccess(form) {
  form.querySelector("input").value = ""
  form.querySelector(".search-form__reset").classList.remove("show")
}
//search
const searchToggle = document.querySelector(".search-toggle")
const searchClose = document.querySelector(".search__close")
searchToggle.addEventListener("click", () => {
  document.querySelector(".header__search").classList.add("show")
  disableScroll()
  overlay.classList.add("show")
  setTimeout(() => {
    document.querySelector(".header__search").querySelector(".item-form input").focus();
  }, 400);
})
searchClose.addEventListener("click", () => {
  document.querySelector(".header__search").classList.remove("show")
  overlay.classList.remove("show")
  setTimeout(() => {
      enableScroll()
  }, 400);
})
overlay.addEventListener("click", () => {
  searchClose.click()
})
// search form
const searchForm = document.querySelectorAll(".search-form")
function showResetBtn(item) {
  if (item.querySelector("input").value.length > 0) {
    item.querySelector(".search-form__reset").classList.add("show")
  } else {
      item.querySelector(".search-form__reset").classList.remove("show")
  }
}
if (searchForm) {
  searchForm.forEach(item => {
    showResetBtn(item)
    item.querySelector(".item-form input").addEventListener("input",() => showResetBtn(item))
    item.addEventListener("reset", () => {
      item.querySelector(".item-form input").setAttribute("value", "")
      showResetBtn(item) 
    })
    if (item.parentNode.querySelector(".searh-p__results-empty-btn")) {
      item.parentNode.querySelector(".searh-p__results-empty-btn").addEventListener("click", () => {
        item.querySelector(".item-form input").setAttribute("value", "")
        showResetBtn(item) 
        setTimeout(() => {
          item.querySelector(".item-form input").focus();
        }, 0);
      })
    }
  })
}
//main smi swiper 5 items
let initSmiSwiper
let smiSwiper
const mainSmi = document.querySelector(".main-smi")
function mainSmiSwiper() {
  if (mainSmi) {
      if (window.innerWidth < mob && !initSmiSwiper) {
          initSmiSwiper = true;
          smiSwiper = new Swiper(mainSmi.querySelector(".swiper"), {
              slidesPerView: 3,
              spaceBetween: 20,
              observer: true,
              observeParents: true,
              speed: 800,
              breakpoints: {
                370.98: {
                  slidesPerView: 4
                }
              }
          });
      } else if (window.innerWidth > mob && initSmiSwiper) {
          initSmiSwiper = false;
          smiSwiper.destroy(true, true);
      }
  }
}
mainSmiSwiper()
window.addEventListener("resize", mainSmiSwiper);
//cat swiper
const mainCatSwiper = document.querySelectorAll(".main-cat__swiper");
if (mainCatSwiper.length > 0) {
    mainCatSwiper.forEach(item => {
      let itemSwiper = new Swiper(item.querySelector(".swiper"), {
        slidesPerView: 2,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        scrollbar: {
            el: item.querySelector(".swiper-scrollbar"),
            draggable: true,
        },
        breakpoints: {
          1200.98: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          767.98: {
            slidesPerView: 4,
            spaceBetween: 10
          }
        },
        speed: 800,
      });
    })
}
//fixed header
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
  if (scrollPos() > 1) {
      header.classList.add("scroll")
      if (header.classList.contains("header--main")) {
        header.classList.remove("header--light")
      }
      if ((scrollPos() > lastScroll && scrollPos() > 150 && !header.classList.contains("unshow"))) {
          header.classList.add("unshow")
      } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
          header.classList.remove("unshow")
      }
  } else {
      header.classList.remove("scroll")
      header.classList.remove("unshow")
      if (header.classList.contains("header--main")) {
        header.classList.add("header--light")
      }
  }
  lastScroll = scrollPos()
})
//menu
const menuItem = document.querySelectorAll(".menu__item")
if (menuItem.length > 0) {
  menuItem.forEach(item => {
    item.addEventListener("mouseenter", () => {
      if (item.classList.contains("has-subnav")) {
        menuItem.forEach(el => el.classList.remove("hover"))
        item.classList.add("hover")
        header.classList.add("hover")
        if (header.classList.contains("header--main")) {
          header.classList.remove("header--light")
        }
      }
    })
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover")
      header.classList.remove("hover")
      if (!header.classList.contains("scroll") && header.classList.contains("header--main")) {
        header.classList.add("header--light")
      }
    })
  })
}
//about
const aboutDirLbl = document.querySelectorAll(".about-dir__lbl")
const aboutDirTxt = document.querySelector(".about-dir__txt")
function aboutTxtPos(item) {
  let top = item.getBoundingClientRect().top
  let left = item.getBoundingClientRect().left
  let leftPos = left - aboutDirTxt.clientWidth / 2 + item.getBoundingClientRect().width / 2
  let rightPos = left + aboutDirTxt.clientWidth / 2 + item.getBoundingClientRect().width / 2
  if (leftPos < 0 && rightPos < window.innerWidth) {
    aboutDirTxt.style.left = 10 + "px"
  } else if (leftPos > 0 && rightPos > window.innerWidth) {
    aboutDirTxt.style.left = "auto"
    aboutDirTxt.style.right = 10 + "px"
  } else {
    aboutDirTxt.style.left = leftPos + "px"
     aboutDirTxt.style.right = "auto"
  }
  aboutDirTxt.style.top = top + item.getBoundingClientRect().height + 10 + "px"
}
function unshowAboutDirTxt(item) {
  item.querySelector(".about-dir__lbl--plus").style.visibility = "visible"
  item.querySelector(".about-dir__lbl--plus").style.opacity = 1
  item.querySelector(".about-dir__lbl--minus").style.opacity = 0
  item.querySelector(".about-dir__lbl--minus").style.visibility = "hidden"
  aboutDirTxt.innerHTML = ""
  aboutDirTxt.classList.remove("show")
}
if (aboutDirTxt && aboutDirLbl.length > 0) {
  aboutDirLbl.forEach(item => {
    item.addEventListener("mouseenter", () => {
      let txt = item.getAttribute("data-info")
      item.querySelector(".about-dir__lbl--plus").style.visibility = "hidden"
      item.querySelector(".about-dir__lbl--plus").style.opacity = 0
      item.querySelector(".about-dir__lbl--minus").style.opacity = 1
      item.querySelector(".about-dir__lbl--minus").style.visibility = "visible"
      aboutDirTxt.innerHTML = `<span>${txt}</span>`
      aboutDirTxt.classList.add("show")
      aboutTxtPos(item)
    })
    item.addEventListener("mouseleave", () => unshowAboutDirTxt(item))
    item.addEventListener("click", () => aboutTxtPos(item))
    window.addEventListener("resize", () => unshowAboutDirTxt(item))
    window.addEventListener("scroll", () => unshowAboutDirTxt(item))
  })
}
//store
const storeSwiper = document.querySelector(".store__swipers")
if (storeSwiper) {
  let storeThumbs = new Swiper(storeSwiper.querySelector(".store__thumbswiper"), {
    slidesPerView: 4,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    initialSlide: storeSwiper.querySelectorAll(".store__thumbswiper .swiper-slide")[1] ? 1 : 0,
    speed: 800
  }) 
  let storeMain = new Swiper(storeSwiper.querySelector(".store__mainswiper"), {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    initialSlide: 0,
    thumbs: {
      swiper: storeThumbs,
    },
    breakpoints: {
      1200.98: {
        slidesPerView: 2,
        spaceBetween: 20,
        initialSlide: storeSwiper.querySelectorAll(".store__mainswiper .swiper-slide")[1] ? 1 : 0,
      },
      479.98: {
        slidesPerView: 2,
        spaceBetween: 10,
        initialSlide: storeSwiper.querySelectorAll(".store__mainswiper .swiper-slide")[1] ? 1 : 0,
      }
    },
    speed: 800
  }) 
}