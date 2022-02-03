// object la` method

function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            getParent(inputElement, options.formGroup).classList.add('invalid');
        } else {
            errorElement.innerHTML = "";
            getParent(inputElement, options.formGroup).classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);

    if (formElement) {

        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;


            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);

                if(!isValid) {
                    isFormValid = false;
                }
            });
            
            
            if(isFormValid){
                formElement.submit();
            }
        }
        options.rules.forEach((rule) => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector)
                    errorElement.innerHTML = "";
                    getParent(inputElement, options.formGroup).classList.remove('invalid');
                }
            }

        });
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Nhập lại email'
        }
    };
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`|| 'Nhập lại password'
        }
    };
}

Validator.isConfirmed = function (selector, getConfirValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirValue() ? undefined : message || 'password k hop le'
        }
    };
}


Validator({
    form: '#form-1',
    errorSelector: '.form-message',
    formGroup: '.form-group',
    rules: [
        Validator.isRequired('#fullname'),
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', () => {
            return document.querySelector('#form-1 #password').value;
        }, 'password nhap lai khong chinh xac')
    ]
});