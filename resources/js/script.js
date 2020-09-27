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
}

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))
console.log(all_items_button)

const cart = []
// --------------------------------------------------
// Handle Change events on update input
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

// -------------------------------------------------
// Handle clicks on list 

itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name // data-name = "????"
        removeItem(name)
    }
    else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    }
    else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}
// ---------------------------------------------
// Add item
function addItem(name, price) {
    for (let i = 0; i< cart.length; i += 1){
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
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
        itemStr += `<li>
        ${name} $${price} x ${qty} = $${price * qty} 
        <button class="remove" data-name="${name}">Remove</button> 
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" min="0" data-name ="${name}">
        </li>`
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
            showItems()
            return
        }
    }
}

// -----------------------------------------------------------------
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i+= 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
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


