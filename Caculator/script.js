    'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $('.input')
const number = $$('.numbers div')
const operator = $$('.operators div')
const result = $('#result')

const app = {
    
    handleEvent: function() {

        // Nhấn vào vào number hiện lên input
        number.forEach((item,index) => {
            item.onclick = function() {
                input.innerText = input.innerText + item.innerText
            }
        });


        //  Nhấn để chọn phép tính
        operator.forEach((item,index) => {
            const currentOperator
            item.onclick = function (e) {
                if (input.innerText.length >= 1) {
                    currentOperator = input.innerText += e.target.innerText
                    console.log(currentOperator)
                }
                
            }
        })
    },

    init: function () {
        this.handleEvent()
    }
}

app.init()