fetch("https://fakestoreapi.com/products")
            .then((res) => {
                return res.json()
            })
            .then((res1) => {
                for (let x in res1) {
                    u++;
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
                                                                                <a href="index.html"><button id="addbutton" class="addbutton" onclick="AddButton(${u})">Add to Cart</button></a>
                                                                            </div>
                                                                        </div>`
                    document.getElementById(`img${u}`).src = res1[x].image;
                    document.getElementById(`price${u}`).innerHTML = "Price : " + "$" + res1[x].price;
                    localStorage.setItem(`id${u}`, JSON.stringify(res1[x]));
                    // if (localStorage.getItem(`quantity${u}`)) {
                    //     document.getElementById(`cardvalue${u}`).innerHTML = JSON.parse(localStorage.getItem(`quantity${u}`))
                    // }
                }
            });
        function incrementValue(u) {
            let prodcutQuantity = [3, 4, 2, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 7, 8];
            localStorage.setItem(`pquantity${u}`, JSON.stringify(prodcutQuantity[u]));
            let number = document.getElementById(`cardvalue${u}`).innerHTML;
           // let cartValue = document.getElementById("inumber").innerHTML;
            if (number >= JSON.parse(localStorage.getItem(`pquantity${u}`)) || (JSON.parse(localStorage.getItem(`quantity${u}`)) >= JSON.parse(localStorage.getItem(`pquantity${u}`)))) {
                let p = JSON.parse(localStorage.getItem(`id${u}`));
                alert(p.title + " is sold out");
                event.preventDefault();
            } else {
                number++;
              //  cartValue++;
                document.getElementById(`cardvalue${u}`).innerHTML = number;
              //  document.getElementById("inumber").innerHTML = cartValue

                if (localStorage.getItem(`productquantity${u}`)) {
                    let q = Number(JSON.parse(localStorage.getItem(`productquantity${u}`)));
                    let p = Number(document.getElementById(`cardvalue${u}`).innerHTML) + q;
                    console.log(p)
                    localStorage.setItem(`quantity${u}`, JSON.stringify(p));
                    // if (JSON.parse(localStorage.getItem(`cardvalue${u}`)) >= JSON.parse(localStorage.getItem(`pquantity${u}`))) {
                    //     let p = JSON.parse(localStorage.getItem(`id${u}`));
                    //     alert(p.title + " is sold out");
                    //     event.preventDefault();
                    // }
                } else {
                    localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
                }

            }
        }
        function decrementValue(u) {
            let number = document.getElementById(`cardvalue${u}`).innerHTML;
           // let cartValue = document.getElementById("inumber").innerHTML;
            if (number > 0) {
                number--;
              //  if (cartValue > 0) {
                 //   cartValue--;

                  //  document.getElementById("inumber").innerHTML = cartValue
                //}
                document.getElementById(`cardvalue${u}`).innerHTML = number;
                localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
                if (Number(document.getElementById(`cardvalue${u}`).innerHTML) == 0) {
                    let b = JSON.parse(localStorage.getItem('newarray')).indexOf(u);
                    if (b >= 0) {
                        newarray = JSON.parse(localStorage.getItem('newarray'));
                        newarray.splice(b, 1);
                        localStorage.setItem('newarray', JSON.stringify(newarray));
                    }
                }
            }
        }
        function AddButton(u) {
            let prodcutQuantity = [3, 4, 2, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 5, 8, 9, 7, 6, 7, 8];
            let number = document.getElementById(`cardvalue${u}`).innerHTML;
            let cartValue = document.getElementById("inumber").innerHTML;
            localStorage.setItem(`pquantity${u}`, JSON.stringify(prodcutQuantity[u]))
            if (localStorage.getItem(`productquantity${u}`)) {
                let q = Number(JSON.parse(localStorage.getItem(`productquantity${u}`)));
                let p = Number(document.getElementById(`cardvalue${u}`).innerHTML) + q;
                console.log(p)
                localStorage.setItem(`quantity${u}`, JSON.stringify(p))
            } else {
                localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
            }
            // localStorage.setItem(`quantity${u}`, JSON.stringify(Number(number)));
            if (number == 0) {
                event.preventDefault();
            }
            if (number > JSON.parse(localStorage.getItem(`pquantity${u}`))) {
                alert(`item${u + 1} sold out from`);
                event.preventDefault();
            } else {
                localStorage.setItem("prodcutQuantity", JSON.stringify(prodcutQuantity));
                if (number != 0) {
                    if (localStorage.getItem('newarray')) {
                        newarray = JSON.parse(localStorage.getItem('newarray'));
                    }
                    if ((!newarray.includes(u))) {
                        newarray.push(u);
                        localStorage.setItem('newarray', JSON.stringify(newarray));
                    }
                    let total = 0;
                    for (let g of newarray) {
                        total += JSON.parse(Number(localStorage.getItem(`quantity${g}`)));
                    }
                    localStorage.setItem("inumber", JSON.stringify(total))
                }
            }
        }
        document.getElementById("inumber").innerHTML = 0;
        if (localStorage.getItem("inumber")) {
            document.getElementById("inumber").innerHTML = JSON.parse(localStorage.getItem("inumber"));
        }