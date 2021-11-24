function Validator(options) {

    var selectorRules = {}

    function validate(inputElement, rule, errorElement) {
        var errorMessage;

        // Lấy các rule của selector
        var rules = selectorRules[rule.selector]

        // Lặp qua từng rule (check)
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form)

    if (formElement){
        formElement.onsubmit = function (e) {
            e.preventDefault()
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                validate(inputElement, rule, errorElement)
                if (inputElement.value !== "" ){
                    console.log(inputElement.value)
                }
            })
        }

        // Lặp và lắng nghe sự kiện
        options.rules.forEach((rule) => {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule, errorElement)
                }
                
                inputElement.oninput = () => {
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message|| 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Trường này phải có tối thiểu ${min} kí tự `
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}