// add class 
const header = document.querySelector('header')
const sectionOne = document.querySelector('.home-intro')
const faders = document.querySelectorAll('.fade-in')
const sliders = document.querySelectorAll('.slide-in')

const sectionOneOptions = {
  rootMargin: '-100px 0px 0px 0px' 
}

const fadeOptions = {
  threshold: 0,
  rootMargin: '0px 0px -200px 0px' 
}

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
  entries.forEach(entry => {
    console.log(entry)
    if (!entry.isIntersecting) {
      header.classList.add('nav-scrolled')
    } else {
      header.classList.remove('nav-scrolled')
    }
  })
}, sectionOneOptions)

sectionOneObserver.observe(sectionOne)

const appearObserver = new IntersectionObserver(function (entries, appearObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return
    } else {
      entry.target.classList.add('appear')
      appearObserver.unobserve(entry.target)
    }
  })
}, fadeOptions)

faders.forEach(fader => {
  appearObserver.observe(fader)
})

sliders.forEach(slider => {
  appearObserver.observe(slider)
})

// lazy load
const lazyImg = document.querySelectorAll('.lazy')
const lazyOptions = {
  rootMargin: '0px',
  root: null,
  threshold: 0
}

const lazyImgObserver = new IntersectionObserver(function (entries, lazyImgObserver) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target)
      entry.target.src = entry.target.dataset.src
      lazyImgObserver.unobserve(entry.target)
    }
  })
}, lazyOptions)

lazyImg.forEach(image => {
  lazyImgObserver.observe(image)
})

