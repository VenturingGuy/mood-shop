import data from './data.js'

const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const itemQty = document.getElementById('item-qty')
const itemTotal = document.getElementById('item-total')
// itemList.innerHTML = '<li> Hello World </li>'
// console.log(itemList)

// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    
    let description = document.createElement('p');
    description.innerText = data[i].desc
    newDiv.appendChild(description)

    let price = document.createElement('p');
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    
    itemsContainer.appendChild(newDiv)

    const cart = []

    // ---------------------------------------------
    // Add item
    function addItem(name, price) {
        for (let i = 0; i< cart.length; i += 1){
            if (cart[i].name === name) {
                cart[i].qty += 1
                return
            }
        }
        const item = { name, price, qty: 1 }
        cart.push(item)
    }

    // ------------------------------------------------------
    // Show Items
    function showItems() {
        const qty = getQty()
        itemQty.innerHTML =  `You have ${qty} items in your cart`
        
        let itemStr = ''
        for (let i = 0; i < cart.length; i+=1) {
            // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    
            // { name:'Apple'; price: 0.99; qty: 3}
            const { name, price, qty } = cart[i]
            itemStr += `<li> ${name} $${price} x ${qty} = $${price * qty} </li>`
        }
        itemList.innerHTML = itemStr
        
        const total = getTotal()
        itemTotal.innerHTML= `Total in cart: $${total}`
    }

    // -----------------------------------------------------------
    // Get Qty
    function getQty() {
        let qty = 0
        for (let i = 0; i < cart.length; i+=1) {
            qty += cart[i].qty
        }
        return qty
    }


    // -----------------------------------------------------------
    // Get total
    function getTotal() {
        let total = 0
        for (let i = 0; i < cart.length; i +=1) {
            total += cart[i].price * cart[i].qty   
        }
        return total.toFixed(2)
    }

    // -------------------------------------------------------------
    // Get Item
    function removeItem(name, qty = 0) {
        for (let i = 0; i < cart.length; i += 1) {
            if (cart[i].name === name) {
                if (qty > 0) {
                    cart[i].qty -= qty
                }
                if (cart[i].qty < 1 || qty === 0) {
                    cart.splice(i, 1)
                }
                return
            }
        }
    }

    // -------------------------------------------------------
    addItem('Apple', 0.99)
    addItem('Apple', 0.99)
    addItem('Orange', 1.29)
    addItem('Frisbee', 9.92)
    showItems()
    removeItem('Frisbee')
    showItems()
    removeItem('Apple', 1)
    showItems()

}

