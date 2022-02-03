const back = document.querySelector('.back');
const headerProfile = document.querySelector('.header_profile');
const form = document.createElement('form');
back.addEventListener('click', () => {
    form.method = 'GET';
    form.action = '/home';
    headerProfile.appendChild(form)
    form.submit();
});

//handle inform user
const formDiv = document.querySelector('.inform_second__yourself p');
const ul = document.querySelector('.inform_second__yourself ul');
const bill = document.querySelector('.inform_second .invoice')
const as = document.querySelectorAll('.inform_second__yourself ul a')

as.forEach(a => {
    a.addEventListener('click', () => {
        preventDefault();
        a.classList.toggle('active');

    })
})

formDiv.addEventListener('click', () => {
    ul.classList.toggle('active');
})

bill.addEventListener('click', () => {
    ul.classList.remove('active')
})

//handle profile

const sd = document.querySelectorAll('.sd span');
const showDiv =Array.from(document.querySelectorAll('.sd'));
const repairName = document.querySelector('.repair_name');
const repairEmail = document.querySelector('.repair_email');
const closeP = Array.from(document.querySelectorAll('.P'));
const inputImg = document.querySelector('#input_img');
const inputRadios = Array.from(document.querySelectorAll('input[name="gender"]')); 

function inputName(data){
    data.addEventListener('click', () => {
        showDiv[0].classList.toggle('repaired');
        repairName.classList.toggle('active');
    })
}
function inputEmail(data){
    data.addEventListener('click', () => {
        showDiv[1].classList.toggle('repaired');
        repairEmail.classList.toggle('active');
    })
}

Array.from(sd).forEach((span,index)=>{
    return index===0 ? inputName(span) : inputEmail(span);
})

closeP.forEach((span,index)=>{
    return index===0 ? inputName(span) : inputEmail(span);
})

inputRadios.forEach((radio,index) => {
    radio.addEventListener('click', function() {
        this.checked = this.value===this.id;
    })
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000*31));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

if(inputImg){
    inputImg.onchange = function (e){
        let file = e.target.files[0];
        let img = document.querySelector('._mPsi__image img');
        if(!file) return ;
        img.src = URL.createObjectURL(file);
        setCookie('_iMs',img.src,151);
    }
}

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
                const formSubmit = document.querySelector('.form-submit');
                const successUpdated = document.querySelector('.profile_updated');
                formSubmit.addEventListener('click',()=>{
                    successUpdated.classList.add('active');
                })
                setTimeout(() => {
                    successUpdated.classList.remove('active');
                },2000)
                setTimeout(() => {
                    successUpdated.classList.remove('active');
                    formElement.submit();
                },3000)
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

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`|| 'Nhập lại password'
        }
    };
}


Validator({
    form: '#form-1',
    errorSelector: '.form-message',
    formGroup: '.form-group',
    rules: [
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.minLength('#password_confirmation', 6),
    ]
});