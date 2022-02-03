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
        getData(itemsCart);
        localStorage.setItem('items',JSON.stringify(itemsCart));
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

//handle items Cart


