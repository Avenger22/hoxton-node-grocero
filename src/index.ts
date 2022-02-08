// #region 'Global Varibles'
let totalEl = document.querySelector('span.total-number')
const storeUl = document.querySelector("header .item-list")
const cartUl = document.querySelector("main .item-list")
const emptyCartBtn = document.querySelector('button.empty-cart-btn')
const sortPriceBtn = document.querySelector('button.store--btn-sort-price')
const sortAlphabetBtn = document.querySelector('button.store--btn-sort-alphabet')
const sortPriceBtnRemove = document.querySelector('button.store--btn-sort-price-remove')
const filterTypeApricot = document.querySelector('button.store--btn-sort-filter-10')
const filterTypeBeetroot = document.querySelector('button.store--btn-sort-filter-1')
const filterTypeCarrot = document.querySelector('button.store--btn-sort-filter-2')
const filterTypeApple = document.querySelector('button.store--btn-sort-filter-3')
const filterTypeAvocado = document.querySelector('button.store--btn-sort-filter-4')
const filterTypeBanana = document.querySelector('button.store--btn-sort-filter-5')
const filterTypeBellPepper = document.querySelector('button.store--btn-sort-filter-6')
const filterTypeBerry = document.querySelector('button.store--btn-sort-filter-7')
const filterTypeBlueBerry = document.querySelector('button.store--btn-sort-filter-8')
const filterTypeEggPlant = document.querySelector('button.store--btn-sort-filter-9')
// #endregion

// #region 'START OF STATE OBJECT'
const state = {

  priceOrderBy: [], //this will have objects from items in state ordered by price in rerendering etc feature works
  alphabetOrderBy: [], //the same as above

  orderByPrice: false, //this is what trigers wether we will have to render in order or not
  orderByAlphabet: false,
  filter: false
 
}
// #endregion

// #region 'SERVER FUNCTIONS'
function getStateDataFromServer() {

  return fetch('http://localhost:3000/items').then(function (response) 
    {
        return response.json()
    })

}
// #endregion

// #region 'HELPER FUNCTIONS DERIVED STATE'
function sortByAlphabet() {

  state.alphabetOrderBy.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;

  })

  state.orderByAlphabet = true
  state.orderByPrice = false
  render()

}

//function that uses sorts by alphabet
function getEventListenerBtnSortAlphabet() {

  sortAlphabetBtn.addEventListener('click', function(event) {

    event.preventDefault()
    sortByAlphabet()

  })

}

//this function gets the ordered array in the state
function getOrderedStore() {

  // state.priceOrderBy = state.items.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 ) //this changes original array thats why revert button didnt work

  state.priceOrderBy.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 )
  state.orderByPrice = true
  state.orderByAlphabet = false
  render()

}

//this function gets the previous orderes array by changing state and rerender
function getEventListenerRevertBackOrder() {

  sortPriceBtnRemove.addEventListener('click', function(event) {

    event.preventDefault()
    changeOrderByPrice()

  })

}

//helper for the event listener to rever order price back to previous state
function changeOrderByPrice() {

    state.orderByPrice = false
    state.orderByAlphabet = false
    state.filter = false
    render()

}

//this function just is part of init() and gets ordered calls the function there
function getEventListenerBtnSortPrice() {

  sortPriceBtn.addEventListener('click', function(event) {

    event.preventDefault()
    getOrderedStore()

  })

}

//function wich contains all 10 event listeners for 10 btn filters by type
function getEventListenerFilterButtons() {

  filterTypeApple.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'apple') {
        element.filterOnly = true
        render()
      }

    }

  })

  filterTypeApricot.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'apricot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeAvocado.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'avocado') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBanana.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'bananas') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBeetroot.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'beetroot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBellPepper.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'bell-pepper') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBerry.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'berry') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBlueBerry.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'blueberry') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeEggPlant.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'eggplant') {
        element.filterOnly = true
        render()
      }

    }
  
  })

  filterTypeCarrot.addEventListener('click', function(event) {

    event.preventDefault()
    state.filter = true

    for (const element of state.items) {

      if (element.name === 'carrot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

}

//function that stores all true filter only in state.items array i need for events of buttons filter by
function getFilterByState() {
  return state.items.filter(item => item.filterOnly === true)
}

//this is a function in wich when i click a new feature added button the whole cart item get erased by manipulating the STATE
function emptyCartBtnEvent() {

  for (const element of state.items) {
    const saveCartQuantity = element.inCart
    element.inCart = 0
    element.inStock += saveCartQuantity
  }

}

//this function just clears all cart items when clicked as an event listener and calls function inside it
function listenToEmptyCartBtn() {

  emptyCartBtn.addEventListener('click', function () {

    emptyCartBtnEvent()
    render()

  })

}

//the key function to make rendering work as it should
function getCartItems() {
  return state.items.filter(item => item.inCart > 0) //filter is a method for ARRAYS to filter and create a new ARRAY
}

//this is called when i click the small btn minus in cart item section, and updates the states
function decreaseItemQuantity(cardParam) {

  if (cardParam.inCart > 0) {
    cardParam.inCart--
    cardParam.inStock++
  }

}

//this is called when i click the small btn plus in cart item section, and updates the states
function increaseItemQuantity(cardParam) {

  if (cardParam.inStock > 0) {
    cardParam.inStock--
    cardParam.inCart++
  }

}

//this function calculates the total and rerenders when state changes
function calculateTotal() {

  let total = 0

  const cartArray = getCartItems()

  for (const element of cartArray) {
    total += element.price * element.inCart
  }

  return total

}

//this function crucial to make the x button feature work
function removeItemFromStore(removeParam) {
  
  const updatedStore = state.items.filter(storeParam => storeParam.id !== removeParam.id)
  state.items = updatedStore

}
// #endregion

// #region 'RENDER FUNCTIONS'
function renderStore(itemsParam, priceParam, alphabetParam) {

  storeUl.innerHTML = ''
  const filterArray = getFilterByState()

  if (state.orderByPrice === false && state.orderByAlphabet === false && state.filter === false) {
    for (const element of itemsParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === true && state.orderByAlphabet === false && state.filter === false) {
    for (const element of priceParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === false && state.orderByAlphabet === true && state.filter === false) {
    for (const element of alphabetParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === false && state.orderByAlphabet === false && state.filter === true) {
    for (const element of filterArray) {
        renderStoreItem(element)
    }
  }

}

function renderStoreItem(storeParam) {

  //creating li
  const liEl = document.createElement('li')
  
  //creating a div
  const divEl = document.createElement('div')
  divEl.setAttribute('class', 'store--item-icon')

  //creating a btn with x to remove el from store
  const removeBtnEl = document.createElement('button')
  removeBtnEl.textContent = 'X'
  removeBtnEl.addEventListener('click', function(event) {

    event.preventDefault()

    removeItemFromStore(storeParam)
    render()

  })
  
  //creating an image
  const imgEl = document.createElement('img')

  //checking that the id 10 should have different src image string
  if (storeParam.id === 10) {
    imgEl.setAttribute('src', `assets/icons/0${storeParam.id}-${storeParam.name}.svg`)
  }

  //for the other from id 1-9 wich has an 00
  else {
    imgEl.setAttribute('src', `assets/icons/00${storeParam.id}-${storeParam.name}.svg`)
  }

  imgEl.setAttribute('alt', storeParam.name)

  //creating a button wich is crucial to this app
  const btnEl = document.createElement('button')
  btnEl.textContent = 'Add to cart'

  //creating span to show me the item if is in stock and how many
  const stockSpanEl = document.createElement('span')
  stockSpanEl.setAttribute('class', 'stock-span-store')
  stockSpanEl.textContent = `The stock: ${storeParam.inStock}`

  //creating span to show me the item price
  const priceSpanEl = document.createElement('span')
  priceSpanEl.setAttribute('class', 'price-span-store')
  priceSpanEl.textContent = `The price: ${storeParam.price}`

  //creating span to show me the item name
  const nameSpanEl = document.createElement('span')
  nameSpanEl.setAttribute('class', 'name-span-store')
  nameSpanEl.textContent = `Name: ${storeParam.name}`

  //appending in order
  divEl.append(imgEl)
  liEl.append(removeBtnEl, divEl, btnEl, stockSpanEl, priceSpanEl, nameSpanEl)
  storeUl.append(liEl)

  //event listeners for the add to cart button
  btnEl.addEventListener('click', function(event) {

    event.preventDefault()

    increaseItemQuantity(storeParam)
    calculateTotal()

    render()

  })

}

function renderCart() {

  //we get the ul wich i want from header DESTROY
  cartUl.innerHTML = ''

  // then, recreate the contents of the cart FILTER ARRAY THIS RETURNED THING
  const cart = getCartItems() //KEY TO MAKE THINGS WORK

  for (const element of cart) {
    renderCartItem(element)
  }

}

function renderCartItem(cartParam) {

  //creating the li
  const liEl = document.createElement('li')

  //creating the img
  const imgEl = document.createElement('img')
  imgEl.setAttribute('class', 'cart--item-icon')

  //checking if the id 10 will have the 0 not 00 cause then it doesnt load
  if (cartParam.id === 10) {
    imgEl.setAttribute('src', `assets/icons/0${cartParam.id}-${cartParam.name}.svg`)
  }

  //other wich from id 1-9
  else {
    imgEl.setAttribute('src', `assets/icons/00${cartParam.id}-${cartParam.name}.svg`)
  }

  imgEl.setAttribute('alt', `${cartParam.name}`)

  //creating the p element
  const pEl = document.createElement('p')

  //creating the btn element the first one with -
  const btnEl1 = document.createElement('button')
  btnEl1.setAttribute('class' , 'quantity-btn remove-btn center')
  btnEl1.textContent = '-'
  
  //creating span element wich has the value when you change the btn + or -
  const spanEl = document.createElement('span')
  spanEl.setAttribute('class', 'quantity-text center')
  spanEl.textContent = cartParam.inCart

  //creating btn2 wich creates this button for +
  const btnEl2 = document.createElement('button')
  btnEl2.setAttribute('class', 'quantity-btn add-btn center')
  btnEl2.textContent = '+'

  //appending things and ul is created totally
  liEl.append(imgEl, pEl, btnEl1, spanEl, btnEl2)
  cartUl.append(liEl)

  //event listeners butttons the 1 and 2 - and +
  btnEl1.addEventListener('click', function(event) {

    event.preventDefault()
    decreaseItemQuantity(cartParam)

    spanEl.textContent = cartParam.inCart

    // if (cardImgParam.inCart === 0) {
    //   liEl.remove() YOU DONT NEED THIS YOU HAVE STATE NO DOM
    // }

    calculateTotal()
    render()

  })

  btnEl2.addEventListener('click', function(event) {

    event.preventDefault()
    increaseItemQuantity(cartParam)

    spanEl.textContent = cartParam.inCart

    calculateTotal()
    render()

  })

}

function renderTotal() {

  totalEl.textContent = '£' + calculateTotal().toFixed(2)

}

function render() {

  renderStore(state.items, state.priceOrderBy, state.alphabetOrderBy)
  renderCart()
  renderTotal()

}

function init() {

  render()
  listenToEmptyCartBtn()
  getEventListenerBtnSortPrice()
  getEventListenerRevertBackOrder()
  getEventListenerBtnSortAlphabet()
  getEventListenerFilterButtons()

}
// #endregion

// #region 'Function call and gettig data from server'
getStateDataFromServer().then(function (itemsFromServer) {
  state.items = itemsFromServer
  state.priceOrderBy.push(...state.items); //now both are the same spread operator copy array
  state.alphabetOrderBy.push(...state.items); //now both are the same spread operator copy array
  init() // no need to call it this basically starts the code running
})
// #endregion