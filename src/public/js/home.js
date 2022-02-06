var loading = document.querySelectorAll('.loading');

document.addEventListener('DOMContentLoaded', () => {
    Array.from(loading).forEach((load) => {
        load.style.display = 'none';
    })
    store_items.style.display = 'block';
});
//handleHeader
const search = document.querySelector('.header .search');
const search_header = document.getElementById('search');
const search_delete = document.querySelector('.search__delete');
const app = document.querySelector('.app');

search_delete.addEventListener('click',()=>{
    search_header.value = '';
    search_header.focus();
})
app.addEventListener('click', (e)=>{
    if(e.target.id === 'search' ) search.style.borderColor = 'rgb(79, 164, 238)';
    else search.style.borderColor = 'rgba(0,0,0,.1)';
})

//handleClickPerson

const person = document.querySelector('.inform__search img');
const expend = document.querySelector('.inform .person');

person.addEventListener('click',function(){
    expend.classList.toggle('active');
})
//Products Selected
const store_items = document.querySelector('.store-items');


const items = JSON.parse(localStorage.getItem('items'));
const div = document.querySelectorAll('.container .container_Pr');
const addCart = document.querySelectorAll('.add_cart');
const productsAmount = document.querySelector('.products__amounts');

if(addCart){
    let imgURLCart = document.querySelector('.item_img img');
    let titleCart = document.querySelector('.description_item')
    let priceCart = document.querySelector('.price_item');
    addCart.forEach((cart) => {
        cart.addEventListener('click',function(){
        handleItemsSelected(imgURLCart,titleCart,priceCart);
        });
    })
    showItemsSelected();
    
    function showItemsSelected(){
        if(items){
            div[0].style.display='none';
            div[1].style.display='block';
            items.forEach(item => getData(item))
            productsAmount.innerHTML = items.length;
            productsAmount.classList.add('active');
            items.length ? productsAmount.classList.add('active') : productsAmount.classList.remove('active');
        }else{
            div[0].style.display='block';
            div[1].style.display='none';
            productsAmount.classList.remove('active');
        }
        return;
    }

    function handleItemsSelected(image,title,price){
        let itemsCart = JSON.parse(localStorage.getItem('items')); 
        Array.isArray(itemsCart) ? itemsCart.push({
            image: image.src,
            title: title.innerText,
            price: price.innerText
        }) : itemsCart = [{
            image: image.src,
            title: title.innerText,
            price: price.innerText
        }];
        localStorage.setItem('items',JSON.stringify(itemsCart));
        itemsCart.forEach(item => getData(item));
        return;
    }
    function getData(item){
    
        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.innerHTML = 
        `
            <img src=${item.image} alt="">
            <div class="description-item">
                <p class="title-item">${item.title}</p>
                <p class="price-item">${item.price}</p>
            </div>
        `
        store_items.appendChild(div);
    }
}

//handle items Cart
if(items){
    const totalPrice = document.querySelector('.total_price');
    let itemsCart = JSON.parse(localStorage.getItem('items'));
    const tbody =  document.querySelector('tbody');
    
    if(tbody){
        itemsCart.forEach(item => getItemsSelected(item));
    
        function getItemsSelected(item){
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const tr = document.createElement('tr');
            tr.setAttribute('class', 'show_infor');
            const divStore = document.createElement('div');
    
            td1.setAttribute('colspan', '2');
            td1.setAttribute('class', 'item_bought');
            divStore.setAttribute('class','store_items');
            divStore.innerHTML = `
                <input type="checkbox" name="checkBox" class="checkBox">
                <img src="${item.image}" alt="">
                <span>${item.title}</span>
            `
            td1.appendChild(divStore);
    
            td2.setAttribute('colspan', '2');
            td2.setAttribute('class', 'item_price');
            td2.innerHTML = `
                <span>${item.price}</span>
            `
    
            td3.setAttribute('colspan', '2')
            td3.setAttribute('class', 'amount_items');
            td3.innerHTML=`
                <div class="inDe">
                <button class="decrease">-</button><input type="text" class="amount" value="1"><button class="increase">+</button>
                </div>
            `
            td4.setAttribute('colspan', '2');
            td4.innerHTML = `
                <span class="total_price">300d</span>
            `
            td5.setAttribute('colspan', '2');
            td5.setAttribute('class', 'operation_delete');
            td5.innerText = 'xóa';
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
        }
    
        function updateItems(){
            let itemsCart = JSON.parse(localStorage.getItem('items')); 
        }
        
        const allCheckBox = tbody.querySelectorAll('input[name="checkBox"]');
        const checkAll = tbody.querySelector('.checkAll')
        const decrease = document.querySelectorAll('.decrease');
        const increase = document.querySelectorAll('.increase');
        const amountInput = document.querySelectorAll('.amount');
        const showInfor = document.querySelectorAll('.show_infor');
    
        decrease.forEach((decrease,index) => {
            decrease.addEventListener('click',(function(){
            +amountInput[index].value==1 ? decrease.disabled = true : decrease.disabled = false;
            amountInput[index].value = +amountInput[index].value-1;
        })) 
        })
        increase.forEach((increase,index) => {
            increase.addEventListener('click',(function(){
            amountInput[index].value = +amountInput[index].value+1;
        })) 
        })
        checkAll.onchange = function(e) {
            Array.from(allCheckBox).forEach(checkBox => {
                checkBox.checked = e.target.checked;
            })
        }
    
        Array.from(allCheckBox).forEach(checkBox => {
            checkBox.onchange = function(e) {
                let isChecked = allCheckBox.length ===tbody.querySelectorAll('input[name="checkBox"]:checked').length;
                checkAll.checked = isChecked;
            }
        })

        Array.from(showInfor).forEach((showInfor,index) => {
            showInfor.addEventListener('click',function(e){
                if(e.target.className === 'operation_delete'){
                    tbody.removeChild(showInfor);
                    itemsCart.splice(index,1);
                    localStorage.setItem('items',JSON.stringify(itemsCart));
                    itemsCart.length ? productsAmount.classList.add('active') : productsAmount.classList.remove('active');
                    productsAmount.innerHTML = itemsCart.length;
                }
            })
        })

    }
}


//handleClickCart

const Cart = document.querySelector('.inform__products-selected');
const form = document.createElement('form');
form.method='GET';
form.action = '/cart';
Cart.addEventListener('click',()=>{
    store_items.appendChild(form);
    form.submit();
})

//slider
const mySwiper = document.querySelector('.mySwiper')
if(mySwiper){
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
}

//pagination
const bntPrev = document.querySelector('.btn_prev');
const bntNext = document.querySelector('.btn_next');
const pages = Array.from(document.querySelectorAll('.pagination button'));
const a = Array.from(document.querySelectorAll('.pagination a'));

const nPage = parseInt(sessionStorage.getItem('C'));
const logOut = Array.from(document.querySelectorAll('.logout'));

if(logOut){
    logOut.forEach(out =>{
        out.addEventListener('click',function(){
            sessionStorage.setItem('C','1');
        })
    })
}
if(pages.length > 0){
    if(nPage) {
        pages[nPage].classList.add('active');
        if(nPage==1) {
            pages[0].disabled = true;
            pages[9].disabled = false;
        }
        else if(nPage==8){
            pages[0].disabled = false;
            pages[9].disabled = true;
        }
    }else{
        sessionStorage.setItem('C','1');
    }
    function handleSavePage(nPage){    
        pages[nPage].classList.add('active')
        pages.forEach((page,index)=>{
            (nPage)!=index ? page.classList.remove('active') : null;
        })
        sessionStorage.setItem('C',`${nPage}`)
        form.method = 'POST';
        form.action=`/home?page=${nPage}`
        bntNext.appendChild(form);
        form.submit();
    }
    
    a.forEach((page) => {
        page.addEventListener('click',function(){
            let len = page.href.length;
            sessionStorage.setItem('C',`${page.href[len-1]}`)
        })
    })
    
    
    bntPrev.addEventListener('click',function(){
        let nPage = parseInt(sessionStorage.getItem('C'));
            nPage-=1;
            handleSavePage(nPage);
    })
    bntNext.addEventListener('click',function(){
        let nPage = parseInt(sessionStorage.getItem('C'));
            nPage+=1;
            handleSavePage(nPage);
    })
}


const branchBar = document.querySelector('.branch__bar');
if(branchBar){
    const menus = document.querySelector('.menus');
    const menuBar = menus.querySelector('.menu_bar');
    const closeMenu = menuBar.querySelector('.close');
    const utensil = menuBar.querySelector('.utensil');
    const showItems = menuBar.querySelector('.show_items');
    
    branchBar.addEventListener('click', function(){
        menus.classList.add('active');
        menuBar.classList.add('active');
    })
    closeMenu.addEventListener('click', function(){
        menus.classList.remove('active');
        menuBar.classList.remove('active');
    })
    utensil.addEventListener('click', function(){
        showItems.classList.toggle('active');
    })
}

//item

