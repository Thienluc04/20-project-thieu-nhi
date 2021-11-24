const navBlogs = document.querySelectorAll('.blog-nav-item')
const panes = document.querySelectorAll('.blog-text')
const btnTicket = document.querySelectorAll('#btnTicket')
const navsMenu = document.querySelectorAll('.header-navbar-item')
const formOverlay = document.querySelector('.form-overlay')
const formTicket = document.querySelector('.ticket')
const html = document.querySelector('html')
const btnClose = document.querySelector('.ticket__closeBtn')
const modal = document.querySelector('.modal')
const cancelBtn = document.querySelector('.cancelBtn')

navBlogs.forEach(function(item, index) {
    const pane = panes[index]
    
    item.onclick = function () {
        document.querySelector('.blog-nav-item.active').classList.remove('active')
        document.querySelector('.blog-text.active').classList.remove('active')

        this.classList.add('active')
        pane.classList.add('active')
    }
})

navsMenu.forEach((item,index) =>{
    item.onclick = function () {
        document.querySelector('.header-navbar-item.active').classList.remove('active')
        this.classList.add('active')
        if(this === document.querySelector('.header-navbar-item.drop')){
            document.querySelector('.navbar__dropdown').classList.toggle('show')
        }
            
    }
})

btnTicket.forEach((item,index) => {
    item.onclick = function() {
        formTicket.classList.add('show')
        formOverlay.classList.add('show')
        html.classList.add('overflow-hidden')
        modal.classList.add('show')
    }
})

btnClose.onclick = function() {
    formTicket.classList.remove('show')
    formOverlay.classList.remove('show')
    html.classList.remove('overflow-hidden')
}

cancelBtn.onclick = function() {
    formTicket.classList.remove('show')
    formOverlay.classList.remove('show')
    html.classList.remove('overflow-hidden')
}

formOverlay.onclick = function() {
    formTicket.classList.remove('show')
    formOverlay.classList.remove('show')
    html.classList.remove('overflow-hidden')
}