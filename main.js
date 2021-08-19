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
  rootMargin: '-100px 0px 0px 0px',
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

// infinite scrolling
const infiniteWrap = document.querySelector('#infinite-wrap')
const infinite = document.querySelector('.detective')
let count = 1
let infiniteOptions = {
  root: null,
  rootMargin: '-200px 0px 0px 0px',
  threshold: 0
}

let infiniteScrollingObserver = new IntersectionObserver(function(entries, infiniteScrollingObserver) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + count)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // infiniteScrollingObserver.unobserve(infinite)
        let item = 
        `
        <div class="card text-left">
            <img class="left-item image" src="https://picsum.photos/id/1${ res.id }/335/335"/>
            <div class="card-body right-item text">
              <div class="card-title">${ res.title }</div>
              <div class="card-text">${ res.body }</div>
            </div>
          </div>
        `
        infiniteWrap.insertAdjacentHTML('beforeend', item)
        // infiniteWrap.insertAdjacentHTML('afterend', item)
        count++
    })
      .then(() => {
        if (count <= 2) {
          infiniteScrollingObserver.observe(infinite)
        } else {
          const end = `<div class="finish-alert" role="alert"><div class="finish-text">Finish</div></div>`
          infiniteWrap.insertAdjacentHTML('beforeend', end)
          // infiniteWrap.insertAdjacentHTML('afterend', end)
          infiniteScrollingObserver.disconnect()
        }
      })
    }
  })
}, infiniteOptions)

infiniteScrollingObserver.observe(infinite)
