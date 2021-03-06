const uptopBtn = document.querySelector('.up-to-top')

// Up to top
window.onscroll = () => {
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        uptopBtn.style.display = 'block'
    }
    else {
        uptopBtn.style.display = 'none'
    }
}

// Animation scroll
let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()



// Active link
const activeLinks = document.querySelectorAll('.header-navbar-item-link')

activeLinks.forEach(function(item,index) {
    item.onclick = function() {
        document.querySelector('.header-navbar-item-link.active').classList.remove('active')
        this.classList.add('active')
    }
})

