let newarray = [];
let res2 = [];
let itemsperpage = 10;
let currentpage = 1;
document.getElementById("maindiv1").innerHTML += ` <div class="section1">
                                                                        <div class="sectiondiv">
                                                                            <div class="container flex">
                                                                                <div class="s1 width1">
                                                                                    <h1 class="head">E-Commerce Cart</h1>
                                                                                </div>
                                                                                <div class="searchtext width1 flex-search">
                                                                               
                                                                                     <input type="text" placeholder="search..." class="search-text" id="search-text" oninput="searchItems()">
                                                                                     
                                                                                     <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></spna>
                                                                                </div>
                                                                               
                                                                                <div class="s2 width1">
                                                                                    <div class="iconclass" >
                                                                                        <i class="fa-solid fa-cart-plus" onclick="openNav1()"></i>
                                                                                        <p class="inumber" id="inumber">0</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                        <div id="mySidenav" class="sidenav scrollbar">
                                                                            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                                                            <div id="sidepannel" class="sidepannel "></div>
                                                                        </div>
                                                                        <div id="cart-details" class="cart-details scrollbar">
                                                                            <div class="close">
                                                                                <a href="javascript:void(0)" class="closecart"  onclick="closeCartdetails()">&times;</a>
                                                                                <div id="maindiv3" class="maindiv3 "></div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        <div class="container" id="container">
                                                                            <div id="maindiv" class="maindiv"></div>
                                                                        </div>`

function renderData() {
    const page = [];



    fetch("https://dummyjson.com/products")
        .then((res) => {
            return res.json()
        })
        .then((res1) => {
            //console.log(res1.products);
            res2 = res1.products;
            //console.log(res2)
            localStorage.setItem("res1", JSON.stringify(res1.products))
            for (let i = 0; i <= Math.ceil(res2.length / itemsperpage); i++) {
                page.push(i)
            }
           // console.log(page)
            const indexoflastpage = currentpage * itemsperpage;
            const indexoffirstpage = indexoflastpage - itemsperpage;
            const currentitems = res2.slice(indexoffirstpage, indexoflastpage)
            // console.log(indexoflastpage);
            // console.log(indexoffirstpage);
            // console.log(currentitems)
            
            for (let x in currentitems) {
                let u = currentitems[x].id
                document.getElementById("maindiv").innerHTML += `<div class="maincard" id="maincard${u}">
                                                                            <div class="imagediv" id="imagediv${u}">
                                                                                <img  id="img${u}" class="image">
                                                                            </div>
                                                                            <div class="pprice">
                                                                                <p id="price${u}"></p>
                                                                                </div>
                                                                            <div class="buttondiv">
                                                                                <button id="decrement" class="increment" onclick="decrementValue(${u})">-</button>
                                                                                <p id="cardvalue${u}" class="cardvalue"> 0</p> 
                                                                                <button id="increment" class="increment" onclick="incrementValue(${u})">+</button>
                                                                               
                                                                            </div>
                                                                            <div id="addcard" class="addcard">
                                                                                <button id="addbutton" class="addbutton" onclick="AddButton(${u})">Add to Cart</button>
                                                                            </div>
                                                                        </div>`

                document.getElementById(`img${u}`).src = currentitems[x].images[0];
                document.getElementById(`price${u}`).innerHTML = "Price : " + currentitems[x].price + "$";
                localStorage.setItem(`id${currentitems[x].id}`, JSON.stringify(currentitems[x]));
                if(localStorage.getItem(`quantity${u}`) && (!(localStorage.getItem(`productquantity${u}`)))) {
                    document.getElementById(`cardvalue${u}`).innerHTML = JSON.parse(localStorage.getItem(`quantity${u}`))
                }
            }
            localStorage.setItem("currentitems",JSON.stringify(currentitems))
           
        });
}
renderData();
const Showpage1 = () => {
    currentpage = 1
    document.getElementById("maindiv").innerHTML = "";
    document.getElementById("btn2").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn2").style.color = "#1450A3"
    document.getElementById("btn3").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn3").style.color = "#1450A3"
    document.getElementById("btn1").style.backgroundColor = "#1450A3"
    document.getElementById("btn1").style.color = "#E0F4FF"
     renderData();
}
const Showpage2 = () => {
    currentpage = 2;
    document.getElementById("maindiv").innerHTML = ""
    document.getElementById("btn1").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn1").style.color = "#1450A3"
    document.getElementById("btn3").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn3").style.color = "#1450A3"
    document.getElementById("btn2").style.backgroundColor = "#1450A3"
    document.getElementById("btn2").style.color = "#E0F4FF"
     renderData();
}
const Showpage3 = () => {
    currentpage = 3;
    document.getElementById("maindiv").innerHTML = "";
    document.getElementById("btn1").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn1").style.color = "#1450A3"
    document.getElementById("btn2").style.backgroundColor = "#E0F4FF"
    document.getElementById("btn2").style.color = "#1450A3"
    document.getElementById("btn3").style.backgroundColor = "#1450A3"
    document.getElementById("btn3").style.color = "#E0F4FF"
     renderData();
}
document.getElementById("btn1").addEventListener("click", Showpage1);
document.getElementById("btn2").addEventListener("click", Showpage2);
document.getElementById("btn3").addEventListener("click", Showpage3)
let prodcutQuantity = [3, 4, 2, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 7, 8, 10, 8, 5, 9, 7, 3, 2, 5, 8, 3];
localStorage.setItem("prodcutQuantity", JSON.stringify(prodcutQuantity));
function incrementValue(u) {
    let prodcutQuantity = JSON.parse(localStorage.getItem("prodcutQuantity"))
    let number = document.getElementById(`cardvalue${u}`).innerHTML;
    let y = JSON.parse(localStorage.getItem(`id${u}`));
    if (number >= prodcutQuantity[u -1] || (JSON.parse(localStorage.getItem(`productquantity${u}`)) >= prodcutQuantity[u - 1])) {
        alert(`${y.title} sold out from`);
        event.preventDefault();
    }
    else {
        number++;
        document.getElementById(`cardvalue${u}`).innerHTML = number;
        if (localStorage.getItem(`quantity${u}`)) {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
        } else {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)))
        }
        pQuantityIncrement(u)
    }
}
function decrementValue(u) {
    let number = document.getElementById(`cardvalue${u}`).innerHTML;
    if (number == 0) {
        event.preventDefault();
    } else {
        if (number > 0) {
            number--;
        }
        document.getElementById(`cardvalue${u}`).innerHTML = number;
        if (localStorage.getItem(`quantity${u}`)) {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
        } else {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)))
        }
        pQuantityDecrement(u)
    }
}
async function AddButton(u) {
   // let prodcutQuantity = [3, 4, 2, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 7, 8, 10, 9, 8, 5, 7, 6, 4, 8, 9, 10];
    let number = document.getElementById(`cardvalue${u}`).innerHTML;
    if (number == 0) {
        event.preventDefault();
    }
    else {
        localStorage.setItem("prodcutQuantity", JSON.stringify(prodcutQuantity));
        if (localStorage.getItem('newarray')) {
            newarray = JSON.parse(localStorage.getItem('newarray'));
        }
        if (!newarray.includes(u)) {
            newarray.push(u);
            localStorage.setItem('newarray', JSON.stringify(newarray));
        }
        document.getElementById(`cardvalue${u}`).innerHTML = 0;
        openNav(u)
    }
}
function openNav(u) {
    document.getElementById("mySidenav").style.width = "400px";
    if (localStorage.getItem(`newarray`)) {
        let x = JSON.parse(localStorage.getItem(`newarray`));
        document.getElementById("sidepannel").innerHTML = " ";
        for (let l of x) {
            let y = JSON.parse(localStorage.getItem(`id${l}`));
            console.log(y)
            document.getElementById("sidepannel").innerHTML += `<div class="pannel" id="pannel${l}">
                                                                        <div id="carddivpannel${l}" class="carddiv">
                                                                        <div class="width imagecenter">       
                                                                            <img id="pimagepannel${l}" class="pimage">
                                                                        </div>
                                                                        <div class="carddetails width2" >
                                                                            <div class="titledelete">
                                                                                <p class="producttitle fsize" id="producttitlepannel${l}"></p>
                                                                                <i class="fa-solid fa-trash-can  icon" onclick="cartDelete(${l})"></i>
                                                                            </div>
                                                                            <div class="buttondiv divpad">
                                                                                <button id="decrementpannel${l}" class="increment increment1" onclick="decrementValuePannel(${l})">-</button>
                                                                                <p id="cardvaluepannel${l}" class="cardvalue pvalue fsize"></p> 
                                                                                <button id="incrementpannel${l}" class="increment increment1" onclick="incrementValuePannel(${l})">+</button>
                                                                            </div>
                                                                            <p id="cardpricepannel${l}" class="cardprice fsize"></p>
                                                                            <p class="total fsize">Total price : $<span id="totalpricepannel${l}" class="totalprice fsize"></span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>`
            document.getElementById(`pimagepannel${l}`).src = y.images[0];
            document.getElementById(`cardvaluepannel${l}`).innerHTML = JSON.parse(localStorage.getItem(`quantity${l}`));
            document.getElementById(`cardpricepannel${l}`).innerHTML = "price :  $" + (y.price).toFixed(2)
            document.getElementById(`totalpricepannel${l}`).innerHTML = (JSON.parse(localStorage.getItem(`quantity${l}`)) * y.price).toFixed(2)
            document.getElementById(`producttitlepannel${l}`).innerHTML = y.title
            //document.getElementById(`cardvalue${l}`).innerHTML = 0;
        }
        if (localStorage.getItem(`productquantity${u}`)) {
            document.getElementById(`cardvaluepannel${u}`).innerHTML = Number(JSON.parse(localStorage.getItem(`productquantity${u}`)));
        } else {
            localStorage.setItem(`productquantity${u}`, JSON.stringify(Number(document.getElementById(`cardvaluepannel${u}`).innerHTML)));
        }
        Cartvalue();
    }
}
function openNav1() {
    document.getElementById("mySidenav").style.width = "400px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}
async function decrementValuePannel(u) {
    let p = document.getElementById(`cardvaluepannel${u}`).innerHTML;
    let y = JSON.parse(localStorage.getItem(`id${u}`));
    let n = (p * y.price).toFixed(2)
    if (p <= 1) {
        document.getElementById(`carddivpannel${u}`).style.display = "none";
        let b = JSON.parse(localStorage.getItem('newarray')).indexOf(u)
        let storedArray = JSON.parse(localStorage.getItem('newarray'));
        storedArray.splice(b, 1);
        localStorage.setItem('newarray', JSON.stringify(storedArray));
    }
    p--;
    document.getElementById(`cardvaluepannel${u}`).innerHTML = p;
    document.getElementById(`totalpricepannel${u}`).innerHTML = (n - y.price).toFixed(2);
    if (localStorage.getItem(`quantity${u}`)) {
        localStorage.setItem(`quantity${u}`, JSON.stringify(Number(document.getElementById(`cardvaluepannel${u}`).innerHTML)))
    } else {
        localStorage.setItem(`quantity${u}`, JSON.stringify(Number(p)))
    }
    if (JSON.parse(localStorage.getItem("inumber")) == 0) {
        document.getElementById("inumber").innerHTML = 0;
    }
    pQuantityDecrement(u)
    Cartvalue();
}
function incrementValuePannel(u) {
    let y = JSON.parse(localStorage.getItem(`id${u}`));
    let prodcutQuantity = JSON.parse(localStorage.getItem("prodcutQuantity"))
    let p = document.getElementById(`cardvaluepannel${u}`).innerHTML;
    if (p >= prodcutQuantity[u - 1] || (JSON.parse(localStorage.getItem(`productquantity${u}`)) >= prodcutQuantity[u - 1])) {
        alert(`${y.title} is sold out `);
        event.preventDefault();
    } else {
        let x = JSON.parse(localStorage.getItem(`id${u}`));
        p++;
        document.getElementById(`cardvaluepannel${u}`).innerHTML = p;
        document.getElementById(`totalpricepannel${u}`).innerHTML = (p * x.price).toFixed(2);
        if (localStorage.getItem(`quantity${u}`)) {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(document.getElementById(`cardvaluepannel${u}`).innerHTML)))
        } else {
            localStorage.setItem(`quantity${u}`, JSON.stringify(Number(p)))
        }
        pQuantityIncrement(u)
        Cartvalue()
    }
}
function cartDelete(u) {
    document.getElementById(`carddivpannel${u}`).style.display = "none";
   // document.getElementById(`cardvalue${u}`).innerHTML = "0"
    let b = JSON.parse(localStorage.getItem('newarray')).indexOf(u)
    let storedArray = JSON.parse(localStorage.getItem('newarray'));
    storedArray.splice(b, 1);
    localStorage.setItem('newarray', JSON.stringify(storedArray));
    if (localStorage.getItem(`quantity${u}`)) {
        localStorage.removeItem(`quantity${u}`)
    }
    if (localStorage.getItem(`productquantity${u}`)) {
        localStorage.removeItem(`productquantity${u}`)
    }
    Cartvalue();
}
function Cartvalue() {
    let total = 0;
    let x = JSON.parse(localStorage.getItem(`newarray`));
    for (let g of x) {
        total += Number(JSON.parse(localStorage.getItem(`quantity${g}`)));
    }
    localStorage.setItem("inumber", JSON.stringify(total));
    document.getElementById("inumber").innerHTML = JSON.parse(localStorage.getItem("inumber"));
}
function pQuantityIncrement(u) {
    if (localStorage.getItem(`productquantity${u}`)) {
        let x = Number(JSON.parse(localStorage.getItem(`productquantity${u}`)));
        let y = Number(JSON.parse(localStorage.getItem(`quantity${u}`)));
        localStorage.setItem(`productquantity${u}`, JSON.stringify(x + 1));
        localStorage.setItem(`quantity${u}`, JSON.stringify(JSON.parse(localStorage.getItem(`productquantity${u}`))))
    }
}
function pQuantityDecrement(u) {
    if (localStorage.getItem(`productquantity${u}`)) {
        let x = Number(JSON.parse(localStorage.getItem(`productquantity${u}`)));
        let y = Number(JSON.parse(localStorage.getItem(`quantity${u}`)));
        localStorage.setItem(`productquantity${u}`, JSON.stringify(x - 1));
        localStorage.setItem(`quantity${u}`, JSON.stringify(JSON.parse(localStorage.getItem(`productquantity${u}`))))
    }
}
function searchItems() {
    document.getElementById("maindiv3").innerHTML = " ";
    let searchTerm = document.getElementById("search-text").value;
    if (searchTerm.length >= 3) {
        document.getElementById("cart-details").style.width = "600px";
        let serachingItems = JSON.parse(localStorage.getItem("currentitems"))
        //console.log(serachingItems)
                for (let x of serachingItems) {
                    if((((x.title).toLowerCase()).includes(searchTerm)) || ((x.description).toLowerCase()).includes(searchTerm) || ((x.category).toLowerCase()).includes(searchTerm) || ((x.brand).toLowerCase()).includes(searchTerm)) {
                       // console.log(x)
                        let productId = Number(x.id);
                        document.getElementById("maindiv3").innerHTML += `<div id="details-div${productId}" class="details-div">
                                                                            <div class="search-div" id="search_div${productId}">
                                                                                <div class="search-img" id="search-div${productId}">
                                                                                    <img id="search-img${productId}" class="search-image">
                                                                                </div>
                                                                                <div class="product-flex" id="product_flex${productId}">
                                                                                    <div id="product-title${productId}" class="product-title">
                                                                                        <p id="p-title${productId}" class="p-title"></p>
                                                                                    </div>
                                                                                    <div class="product-price" id="product-price${productId}">
                                                                                        <p id="seach-prodect-price${productId}" class="seach-prodect-price"></p>
                                                                                    </div>
                                                                                    <div class="product-quantity" id="product-quantity${productId}">
                                                                                        <button id="product-decrement${productId}" onclick="searchProductDecrement(${productId})" class="width25 padding12 bg-color">-</button>
                                                                                        <p id="search-product-quantity${productId}" class="search-product-quantity width25 padding6">0</p>
                                                                                        <button id="product-increment${productId}" onclick="searchProductIncrement(${productId})" class="width25 padding12 bg-color">+</button>
                                                                                    </div>
                                                                                    <div class="product-add-tocart" id="product-add-tocart${productId}">
                                                                                        <button id="search-addto-cart${productId}" onclick="seachProductToCart(${productId})" class="add-tocart-width bg-color">Add to cart</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`
                        document.getElementById(`search-img${productId}`).src = x.images[0];
                        document.getElementById(`seach-prodect-price${productId}`).innerHTML = "price : " + "$ " + x.price;
                        document.getElementById(`p-title${productId}`).innerHTML = x.title;
                }
            }
           
    } else {
        document.getElementById("maindiv3").innerHTML = " ";
        document.getElementById("cart-details").style.width = "0px";
    }
}
function searchProductIncrement(productId) {
    let prodcutQuantity = JSON.parse(localStorage.getItem("prodcutQuantity"))
    let search_quantity = document.getElementById(`search-product-quantity${productId}`).innerHTML;
    let y = JSON.parse(localStorage.getItem(`id${productId}`));
    if (search_quantity >= prodcutQuantity[productId - 1] || (JSON.parse(localStorage.getItem(`productquantity${productId}`)) >= prodcutQuantity[productId - 1])) {
        alert(`${y.title} sold out from`);
        event.preventDefault();
    }
    else {
        search_quantity++;
        document.getElementById(`search-product-quantity${productId}`).innerHTML = search_quantity;
        if (localStorage.getItem(`quantity${productId}`)) {
            localStorage.setItem(`quantity${productId}`, JSON.stringify(Number(search_quantity)));
        } else {
            localStorage.setItem(`quantity${productId}`, JSON.stringify(Number(search_quantity)))
        }
        pQuantityIncrement(productId)
    }
}
function searchProductDecrement(productId) {
    let search_quantity = document.getElementById(`search-product-quantity${productId}`).innerHTML;
    if (search_quantity == 0) {
        event.preventDefault();
    } else {
        if (search_quantity > 0) {
            search_quantity--;
        }
        document.getElementById(`search-product-quantity${productId}`).innerHTML = search_quantity;
        if (localStorage.getItem(`quantity${productId}`)) {
            localStorage.setItem(`quantity${productId}`, JSON.stringify(Number(search_quantity)));
        } else {
            localStorage.setItem(`quantity${productId}`, JSON.stringify(Number(search_quantity)))
        }
        pQuantityDecrement(productId)
    }
}
function closeCartdetails() {
    document.getElementById("cart-details").style.width = "0px";
}
function seachProductToCart(productId) {
    let prodcutQuantity = [3, 4, 2, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 7, 8, 10, 8, 5, 9, 7, 3, 2, 5, 8, 3];
    let search_quantity = document.getElementById(`search-product-quantity${productId}`).innerHTML;
    if (search_quantity == 0) {
        event.preventDefault();
    }
    else {
        localStorage.setItem("prodcutQuantity", JSON.stringify(prodcutQuantity));
        document.getElementById(`search-product-quantity${productId}`).innerHTML = Number(0)
        if (localStorage.getItem('newarray')) {
            newarray = JSON.parse(localStorage.getItem('newarray'));
        }
        if (!newarray.includes(productId)) {
            newarray.push(productId);
            localStorage.setItem('newarray', JSON.stringify(newarray));
        }
        openNav(productId)
    }
}
document.getElementById("inumber").innerHTML = 0;
// localStorage.setItem('newarray', JSON.stringify(newarray));
// localStorage.setItem("inumber",JSON.stringify(Number(0)))