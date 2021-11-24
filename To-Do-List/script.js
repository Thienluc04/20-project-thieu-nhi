const $  = document.querySelector.bind(document)
const $$  = document.querySelectorAll.bind(document)

const input = $('#myInput')
const item = $$('li')
const listItem = $('#myUL')

// Thêm nút Close cho từng item 
for (let i = 0; i < item.length; i++) {
    let span = document.createElement('span')
    let text = document.createTextNode('\u00D7')
    span.className = 'close'
    span.appendChild(text)
    item[i].appendChild(span)
}

// Nhấn vào nút Close để xóa item
let close = document.querySelectorAll('.close')
for (let i =0; i < close.length; i++) {
    close[i].onclick = function() {
        this.parentElement.style.display = 'none'
    }
}

// Nhấn vào item để hiển thị là đã làm việc đó
for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function() {
        this.classList.toggle('checked')
    })
}

function newElement() {
    let li = document.createElement('li')
    let t = document.createTextNode(input.value)
    let span = document.createElement('span')
    let text = document.createTextNode('\u00D7')
    if (input.value === "") {
        alert('Đừng để trống bạn eei!')
    }else {
        input.value = ""
        li.appendChild(t)
        listItem.appendChild(li)
        span.className = 'close'
        span.appendChild(text)
        li.appendChild(span)
        span.onclick = function() {
            this.parentElement.style.display = 'none'
        }
        li.addEventListener('click', function() {
            this.classList.toggle('checked')
        })
        input.focus()
    }
}
