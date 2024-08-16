if (document.querySelector(".preloader")) {
  window.addEventListener("load", (event) => {
    setTimeout(() => {
      enableScroll()
      document.body.classList.add('loaded');
    }, 100);
  });
}
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.menu-mobile'); 
const iconMenu = document.querySelector('.icon-menu');
const modal = document.querySelectorAll(".modal")
const overlay = document.querySelector(".overlay")
const modOpenBtn = document.querySelectorAll(".mod-open-btn")
const modCloseBtn = document.querySelectorAll(".mod-close-btn")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const customSelect = document.querySelectorAll(".select-custom")
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
//smoothdrop
function smoothDrop(header, body, dur) {
  body.style.overflow = 'hidden';
  body.style.transition = `height ${dur}ms ease`;
  body.style['-webkit-transition'] = `height ${dur}ms ease`;
  if (!header.classList.contains("active")) {
      header.classList.add("open")
      body.style.display = 'block';
      let height = body.clientHeight + 'px';
      body.style.height = '0px';
      setTimeout(function () {
          body.style.height = height;
          setTimeout(() => {
              body.style.height = null
              header.classList.add("active")
          }, dur); 
      }, 0);
  } else {
      header.classList.remove("open")
      let height = body.clientHeight + 'px';
      body.style.height = height
      setTimeout(function () {
          body.style.height = "0"
          setTimeout(() => {
              body.style.display = 'none';
              body.style.height = null
              header.classList.remove("active")
          }, dur);
      }, 0);
  }
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
//fancybox default
const fancybox = Fancybox.bind('[data-fancybox]', {
  Hash: false,
  Toolbar: {
    display: ["close"]
  },
  Thumbs: false
});
//open modal
function openModal(modal) {
  let activeModal = document.querySelector(".modal.open")
  if (!activeModal && !mobMenu.classList.contains("open") ) {
      disableScroll()
  }
  if (activeModal) {
    activeModal.classList.remove("open")
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!mobMenu.classList.contains("open")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
if (modal) {
  modal.forEach((mod) => {
      mod.addEventListener("click", (e) => {
          if (
              !mod.querySelector(".modal__content").contains(e.target) ||
              mod.querySelector(".btn-close").contains(e.target)
          ) {
              closeModal(mod);
          }
      });
  });
}
// modal button on click
if (modOpenBtn) {
  modOpenBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        openModal(document.getElementById(href))
    })
  })
}
// modal close button on click
if (modCloseBtn) {
  modCloseBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        closeModal(document.getElementById(href))
    })
  })
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__options input").forEach(item => {
      item.addEventListener("change", (e) => {
        setActiveOption(select)
      });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
// set active select option
function setActiveOption(select) {
  select.querySelector(".select-custom__selected").classList.add("checked")
  if (select.querySelector(".item-radio")) {
    let activeInpTxt = select.querySelector("input:checked").nextElementSibling.innerHTML
    select.querySelector(".select-custom__selected span").innerHTML = activeInpTxt
  }
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
//setSuccessTxt
function setSuccessTxt(title = false, btnTxt = false) {
  successModal.querySelector("h3").textContent = title ? title : "Заявка успешно отправлена"
  successModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
}
//setErrorTxt
function setErrorTxt(title = false, btnTxt = false) {
  errorModal.querySelector("h3").textContent = title ? title : "Что-то пошло не так"
  errorModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
}
// openSuccessMod
function openSuccessMod(title = false, btnTxt = false) {
  setSuccessTxt(title = false, btnTxt = false)
  openModal(successModal)
}
// openErrorMod
function openErrorMod(title = false, btnTxt = false) {
  setErrorTxt(title = false, btnTxt = false)
  openModal(errorModal)
}
// formSuccess
function formSuccess(form, title = false, btnTxt = false) {
  form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
      if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
          inp.value = ""
      }
      if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
          inp.checked = false
      }
  })
  if (form.querySelector("textarea")) {
      form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__items")) {
      form.querySelector(".file-form__items").innerHTML = ""
  }
  openSuccessMod(title = false, btnTxt = false)
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
const itemFormPass = document.querySelectorAll(".item-form--password")
if (itemFormPass) {
  itemFormPass.forEach(item => {
    item.querySelector(".item-form__eye").addEventListener("click", () => {
      item.classList.toggle("show-password")
      if (item.classList.contains("show-password")) {
        item.querySelector("input").type = "text"
      } else {
        item.querySelector("input").type = "password"
      }
    })
  })
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
//file-form
function addFile(files, item) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.size >  10 * 1024 * 1024) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      item.querySelector(".item-form__error").textContent = "Файл должен быть менее 10 МБ"
      return
    } else if (!fileTypes.includes(file.type)) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      item.querySelector(".item-form__error").textContent = 'Разрешённые форматы: png,jpg,jpeg,gif,bmp,pdf,txt,rtf,doc,docx,xls,xlsx,ppt,pptx,odt,ods,odp'
      return
    } else {
      item.classList.remove("error")
      item.querySelector(".item-form__error").textContent = "" 
      if (!item.parentNode.classList.contains("edu-profile")) {
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => {
            item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">
            <div class="file-form__name">${file.name}</div>
            <div class="file-form__del">${sprite("close")}</div>
           </div>
          `)
        }
        reader.onerror = () => {
          console.log(reader.error);
        }
      } else {
        item.parentNode.submit()
      }  
    }
  }
}
let fileTypes = [
  "image/png", "image/jpeg","image/gif", "image/bmp", 
  "text/plain", 
  "application/rtf", 
  "application/vnd.ms-powerpoint", 
  "application/vnd.oasis.opendocument.presentation", 
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.spreadsheet", 
  "application/msword", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
  "application/pdf", 
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.oasis.opendocument.text"
]
let dragEl
if (document.querySelector(".file-form")) {
  document.querySelectorAll(".file-form").forEach(item => {
    item.querySelector("input").addEventListener("change", e => { 
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      }  
      let files = e.target.files;
      addFile(files, item)
    })
    //delete file
    item.addEventListener("click", e => {
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__del").forEach((del, idx) => {
          if (del.contains(e.target)) {
              const dt = new DataTransfer()
              const input = item.querySelector("input")
              const { files } = input
              for (let i = 0; i < files.length; i++) {
                  let file = files[i]
                  if (i !== idx) {
                    dt.items.add(file)
                  }      
              }
              input.files = dt.files
              setTimeout(() => {
                del.parentNode.remove()
             }, 0);
          }
        }) 
      }
    })
    if (item.parentNode.classList.contains("edu-profile")) {
      dragEl = item.querySelector(".edu-profile__add")
    } else {
      dragEl = item
    }
    dragEl.addEventListener("dragenter", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("dragover", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("dragleave", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("drop", function(e) {
      e.preventDefault();
      const dt = new DataTransfer()
      dt.items.add(e.dataTransfer.files[0])
      let files = Array.from(dt.files)
      item.querySelector("input").files = dt.files
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      addFile(files, item)
    });
  })
}
// showLbl
function showLbl(el) {
  overlay.classList.add("show")
  document.querySelectorAll(".js-lbl").forEach(item => item.classList.remove("show"))
  el.classList.add("show")
  if (lblTimeout) {
    clearTimeout(lblTimeout)
  } 
  lblTimeout = setTimeout(function () {
    overlay.classList.remove("show")
    el.classList.remove("show")
  }, 3500);
}
//js-fav
function favOnClick() {
  const jsFav = document.querySelectorAll(".js-fav") 
  if (jsFav) {
    jsFav.forEach(item => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
          item.classList.remove("active")
          showLbl(document.querySelector(".js-remove-fav"))
        } else {
          item.classList.add("active")
          showLbl(document.querySelector(".js-add-fav"))
        }
      })
    })
  }
}
//quantity
function disabledMinBtn(item, count) {
  if (count <= 1) {
    item.querySelector(".js-minus").classList.add("disabled")
  } else {
    item.querySelector(".js-minus").classList.remove("disabled")
  }
}
function setQuantity() {
  const quantity = document.querySelectorAll(".quantity")
  if (quantity) {
    quantity.forEach(item => {
        const inp = item.querySelector(".quantity__count input")
        disabledMinBtn(item, inp.value)
        item.querySelector(".js-minus").addEventListener("click", () => {
          if (inp.value > 1) {
            inp.value--
            clearTimeout(lblTimeout)
            showLbl(document.querySelector(".js-add-cart"))
          } else {
            item.parentNode.classList.remove("in-card")
            clearTimeout(lblTimeout)
            showLbl(document.querySelector(".js-remove-cart"))
          }
          disabledMinBtn(item, inp.value)
          addToCart()
        })
        item.querySelector(".js-plus").addEventListener("click", () => {
          inp.value++
          clearTimeout(lblTimeout)
          showLbl(document.querySelector(".js-add-cart"))
          disabledMinBtn(item, inp.value)
          addToCart()
        })
    })
  }
}
setQuantity()
//init range slider
function initSliders() {
  let rangeSliders = filter.querySelectorAll(".range-filter")
  rangeSliders.forEach(item => {
    let rangeStart = item.querySelector(".range-filter__start")
    let rangeEnd = item.querySelector(".range-filter__end")
    let rangeSlider = item.querySelector(".range-filter__slider")
    let start = +item.getAttribute("data-start")
    let end = +item.getAttribute("data-end")
    let min = +item.getAttribute("data-min")
    let max = +item.getAttribute("data-max")
    noUiSlider.create(rangeSlider, {
      start: [start, end],
      connect: true,
      range: {
        'min': min,
        'max': max
      }
    });
    rangeStart.addEventListener("focus", () => {
      rangeStart.value = rangeStart.value.replaceAll(' ', '')
      rangeStart.setAttribute("type", "number")
    });
    rangeEnd.addEventListener("focus", () => {
      rangeEnd.value = rangeEnd.value.replaceAll(' ', '')
      rangeEnd.setAttribute("type", "number")
    });
    rangeStart.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([rangeStart.value, null])
    });
    rangeEnd.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([null, rangeEnd.value])
    });
    let rangeValues = [rangeStart, rangeEnd];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeStart.setAttribute("type", "text")
      rangeEnd.setAttribute("type", "text")
      rangeValues[handle].value = String(parseInt(values[handle])).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim();
    });
    rangeSlider.noUiSlider.on('change', function (values, handle) {
      //submit filtra
    });
  })
}
//filter-form
const filter = document.querySelector(".cat-top__filter")
if (filter) {
  initSliders()
}
// allItemsCheck
function allCheckBtn(allItemsCheck,checkItems) {
  allItemsCheck.addEventListener("change",() => {
    checkItems.forEach(item => {
      if (allItemsCheck.checked) {
        item.checked = true
        item.setAttribute("checked", true)
      } else {
        item.checked = false
        item.removeAttribute("checked")
      }
    })
  })
  checkItems.forEach(item => {
    item.addEventListener("change",() => {
      if (Array.from(checkItems).every(item => item.checked )) {
        allItemsCheck.checked = true
        allItemsCheck.setAttribute("checked", true)
      } else {
        allItemsCheck.checked = false
        allItemsCheck.removeAttribute("checked")
      }
    })
  })
}
// extra text
const readMore = document.querySelectorAll(".read-more")
if (readMore) {
    function showMoreBtn() {
      readMore.forEach(item => {
        item.classList.remove("active")
        item.classList.add("more-hidden")
        let height = item.querySelector(".read-more__content").clientHeight
        item.classList.remove("more-hidden")
        let fullHeight = item.querySelector(".read-more__content").clientHeight
        item.classList.add("more-hidden")
        if (fullHeight > height ) {
            item.classList.add("btn-show")
        } else {
            item.classList.remove("btn-show")
        }
      })
    }
    showMoreBtn()
    window.addEventListener("resize",showMoreBtn)
    readMore.forEach(item => {
      let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
      let closeTxt = item.querySelector(".read-more__btn").getAttribute("data-close")
      item.querySelector(".read-more__btn").addEventListener("click", () => {
        if (!item.classList.contains("active")) {
          item.classList.add("active")
          let height = item.querySelector(".read-more__content").clientHeight + "px"
          item.classList.remove("more-hidden")        
          let fullHeight = item.querySelector(".read-more__content").clientHeight + "px"
          item.querySelector(".read-more__content").style.height = height; 
          setTimeout(function () {
            item.querySelector(".read-more__content").style.height = fullHeight
            item.querySelector(".read-more__btn span").textContent = closeTxt           
            setTimeout(() => {
                  item.querySelector(".read-more__content").style.height = null
            }, 500); 
          }, 0);
      } else {
          item.classList.remove("active")
          let fullHeight = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.add("more-hidden")
          let height = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.remove("more-hidden")
          item.querySelector(".read-more__content").style.height = fullHeight   
          setTimeout(function () {
              item.querySelector(".read-more__content").style.height = height
              item.querySelector(".read-more__btn span").textContent = openTxt
              setTimeout(() => {
                item.classList.add("more-hidden")
                item.querySelector(".read-more__content").style.height = null
              }, 500);
          }, 0);
      }
      })
    })
}
//animate statistics numbers
let statItem = document.querySelectorAll(".animate-numb");
if (statItem.length > 0) {
    statItem.forEach((item) => {
        let callback = function (entries, observer) {
            entries.forEach((observe) => {
                if (observe.isIntersecting) {
                    let content = item.textContent;
                    let nmb = item.getAttribute("data-numb");
                    $(item)
                        .prop("number", nmb)
                        .animateNumber(
                            {
                                number: content,
                                numberStep: function (now, tween) {
                                    var formatted = now
                                        .toFixed(0)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                                    $(tween.elem).text(formatted);
                                },
                            },
                            {
                                easing: "swing",
                                duration: 1500,
                            }
                        );
                    observer.unobserve(item);
                }
            });
        };

        let observer = new IntersectionObserver(callback);
        observer.observe(item);
    });
}
//main smi swiper 5 items
let initSmiSwiper
let smiSwiper
const mainSmi = document.querySelector(".main-smi")
function mainSmiSwiper() {
  if (mainSmi) {
      if (window.innerWidth < tablet && !initSmiSwiper) {
          initSmiSwiper = true;
          smiSwiper = new Swiper(mainSmi.querySelector(".swiper"), {
              slidesPerView: 5,
              spaceBetween: 20,
              observer: true,
              observeParents: true,
              speed: 800,
          });
      } else if (window.innerWidth > tablet && initSmiSwiper) {
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
        slidesPerView: 4,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        scrollbar: {
            el: item.querySelector(".swiper-scrollbar"),
            draggable: true,
        },
        breakpoints: {},
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
  aboutDirTxt.style.left = left - aboutDirTxt.clientWidth / 2  < 0 ? 10 : left - aboutDirTxt.clientWidth / 2 + item.getBoundingClientRect().width / 2 + "px"
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
    speed: 800
  }) 
  let storeMain = new Swiper(storeSwiper.querySelector(".store__mainswiper"), {
    slidesPerView: 2,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    thumbs: {
      swiper: storeThumbs,
    },
    speed: 800
  }) 
}