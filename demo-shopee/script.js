const sub = document.getElementById('subtraction')
const add = document.getElementById('addition')
const number = document.querySelector('.number')
const button = document.getElementById('add-to-cart')
const cartList = document.querySelector('.header__cart-list')
const cartView = document.querySelector('.header__cart-notice')
const cartUL = document.querySelector('.header__cart-list-item')
const cartHead = document.querySelector('.header__cart-heading')
const priceItem = document.querySelector('.app__container-price span')


sub.addEventListener('click', function() {
    if (number.innerText > 0) {
        number.innerText = number.innerText - 1
    }

})

add.addEventListener('click', function() {
    var convertToNum = Number(number.innerText);
    number.innerText = convertToNum + 1
})



button.addEventListener('click', function() {
    const convertNum = Number(number.innerText);
    const convertCart = Number(cartView.innerText);

    if (number.innerText > 0) {
        
        cartView.innerText = convertCart + convertNum
        
        cartList.classList.remove('header__cart-list--no-cart')
        cartHead.classList.remove('hidden-item')
        cartUL.classList.remove('hidden-item')
        number.innerText = 0
        
        cartUL.innerHTML =  `<li class="header__cart-item">
                                <img src="https://cf.shopee.vn/file/1def1afe001506787b7d811fb7116011" alt="" class="header__cart-img">
                                <div class="header__cart-item-info">
                                    <div class="header__cart-item-head">
                                        <h5 class="header__cart-item-name">Tai nghe True Wireless Amoi F9 PRO Bluetooth 5.0 | Bản Quốc Tế | Cảm Ứng | Chống Nước</h5>
                                        <div class="header__cart-item-price-wrap">
                                            <span class="header__cart-item-price">${priceItem.innerText}</span>
                                            <span class="header__cart-item-multiply">x</span>
                                            <span class="header__cart-item-qnt">${convertNum + convertCart}</span>
                                        </div>
                                    </div>
                                    <div class="header__cart-item-body">
                                        <span class="header__cart-item-description">
                                            Phân loại: Bạc
                                        </span>
                                        <span class="header__cart-item-remove" >Xóa</span>
                                    </div>
                                </div>
                            </li>`     
                
    }
})

cartUL.onclick = function (e) {
    const removeBtn = e.target
    const qnt = document.querySelector('.header__cart-item-qnt')
    if (removeBtn.innerText === 'Xóa') {
        cartList.classList.add('header__cart-list--no-cart')
        cartHead.classList.add('hidden-item')
        cartUL.classList.add('hidden-item')
        cartView.innerText = cartView.innerText - qnt.innerText
    }
    
  }


