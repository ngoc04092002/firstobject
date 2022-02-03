const btn = document.querySelector('.btn');
const left = document.querySelector('.left');
const form = document.createElement('form');
const letter = document.querySelector('.letter');

form.method = 'GET';

btn.addEventListener('click', () => {
    form.action = '/login';
    letter.appendChild(form);
    form.submit();
})
left.addEventListener('click', () => {
    form.action = '/buyer/forgot_password';
    letter.appendChild(form);
    form.submit();
})
