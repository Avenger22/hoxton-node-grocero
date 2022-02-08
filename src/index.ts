// #region 'Global Varibles'
let totalEl: HTMLElement | null = document.querySelector('span.total-number')
const storeUl: HTMLElement | null = document.querySelector("header .item-list")
const cartUl: HTMLElement | null = document.querySelector("main .item-list")
const emptyCartBtn: HTMLElement | null = document.querySelector('button.empty-cart-btn')
const sortPriceBtn: HTMLElement | null = document.querySelector('button.store--btn-sort-price')
const sortAlphabetBtn: HTMLElement | null = document.querySelector('button.store--btn-sort-alphabet')
const sortPriceBtnRemove: HTMLElement | null = document.querySelector('button.store--btn-sort-price-remove')
const filterTypeApricot: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-10')
const filterTypeBeetroot: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-1')
const filterTypeCarrot: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-2')
const filterTypeApple: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-3')
const filterTypeAvocado: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-4')
const filterTypeBanana: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-5')
const filterTypeBellPepper: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-6')
const filterTypeBerry: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-7')
const filterTypeBlueBerry: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-8')
const filterTypeEggPlant: HTMLElement | null = document.querySelector('button.store--btn-sort-filter-9')
// #endregion

// #region 'TYPES'
type Items = {
  id: number,
  name: string,
  price: number,
  inStock: number,
  inCart: number,
  filterOnly: boolean
}

type State = {
  items: Items[]
  priceOrderBy: Items[],
  alphabetOrderBy: Items[],
  orderByPrice: boolean,
  orderByAlphabet: boolean,
  filter: boolean
}

type alaphabetOrderBy = {
  name: string
}

type element = {
  id: number,
  name: string,
  price: number,
  inStock: number,
  inCart: number,
  filterOnly: boolean
}

type priceOrderBy = {
  name: number
}
// #endregion

// #region 'START OF STATE OBJECT'
const state: State = {
  items : [],
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
function sortByAlphabet(): void {

  state.alphabetOrderBy.sort(function(a:alaphabetOrderBy, b:alaphabetOrderBy): number {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;

  })

  state.orderByAlphabet = true
  state.orderByPrice = false
  render()

}

//function that uses sorts by alphabet
function getEventListenerBtnSortAlphabet():void {

  sortAlphabetBtn.addEventListener('click', function(event): void {

    event.preventDefault()
    sortByAlphabet()

  })

}

//this function gets the ordered array in the state
function getOrderedStore(): void {

  state.priceOrderBy.sort(function(a: number, b: number) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 )
  state.orderByPrice = true
  state.orderByAlphabet = false
  render()

}

//this function gets the previous orderes array by changing state and rerender
function getEventListenerRevertBackOrder(): void {

  sortPriceBtnRemove.addEventListener('click', function(event): void {

    event.preventDefault()
    changeOrderByPrice()

  })

}

//helper for the event listener to rever order price back to previous state
function changeOrderByPrice():void {

    state.orderByPrice = false
    state.orderByAlphabet = false
    state.filter = false
    render()

}

//this function just is part of init() and gets ordered calls the function there
function getEventListenerBtnSortPrice():void {

  sortPriceBtn.addEventListener('click', function(event):void {

    event.preventDefault()
    getOrderedStore()

  })

}

//function wich contains all 10 event listeners for 10 btn filters by type
function getEventListenerFilterButtons():void {

  filterTypeApple.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'apple') {
        element.filterOnly = true
        render()
      }

    }

  })

  filterTypeApricot.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'apricot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeAvocado.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'avocado') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBanana.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'bananas') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBeetroot.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'beetroot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBellPepper.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'bell-pepper') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBerry.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'berry') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeBlueBerry.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'blueberry') {
        element.filterOnly = true
        render()
      }

    }
    
  })

  filterTypeEggPlant.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'eggplant') {
        element.filterOnly = true
        render()
      }

    }
  
  })

  filterTypeCarrot.addEventListener('click', function(event):void {

    event.preventDefault()
    state.filter = true

    for (const element: element of state.items) {

      if (element.name === 'carrot') {
        element.filterOnly = true
        render()
      }

    }
    
  })

}

//function that stores all true filter only in state.items array i need for events of buttons filter by
function getFilterByState(): Items[] {
  return state.items.filter(item => item.filterOnly === true)
}

//this is a function in wich when i click a new feature added button the whole cart item get erased by manipulating the STATE
function emptyCartBtnEvent():void {

  for (const element: element of state.items) {
    const saveCartQuantity = element.inCart
    element.inCart = 0
    element.inStock += saveCartQuantity
  }

}

//this function just clears all cart items when clicked as an event listener and calls function inside it
function listenToEmptyCartBtn():void {

  emptyCartBtn.addEventListener('click', function ():void {

    emptyCartBtnEvent()
    render()

  })

}

//the key function to make rendering work as it should
function getCartItems(): Items[] {
  return state.items.filter(item => item.inCart > 0) //filter is a method for ARRAYS to filter and create a new ARRAY
}

//this is called when i click the small btn minus in cart item section, and updates the states
function decreaseItemQuantity(cardParam: Items):void {

  if (cardParam.inCart > 0) {
    cardParam.inCart--
    cardParam.inStock++
  }

}

//this is called when i click the small btn plus in cart item section, and updates the states
function increaseItemQuantity(cardParam: Items):void {

  if (cardParam.inStock > 0) {
    cardParam.inStock--
    cardParam.inCart++
  }

}

//this function calculates the total and rerenders when state changes
function calculateTotal(): number {

  let total = 0

  const cartArray: Items[] = getCartItems()

  for (const element: element of cartArray) {
    total += element.price * element.inCart
  }

  return total

}

//this function crucial to make the x button feature work
function removeItemFromStore(removeParam: Items):void {
  
  const updatedStore: Items[] = state.items.filter(storeParam => storeParam.id !== removeParam.id)
  state.items = updatedStore

}
// #endregion

// #region 'RENDER FUNCTIONS'
function renderStore(itemsParam: Items[], priceParam: Items[], alphabetParam: Items[]):void {

  storeUl.innerHTML = ''
  const filterArray: Items[] = getFilterByState()

  if (state.orderByPrice === false && state.orderByAlphabet === false && state.filter === false) {
    for (const element: element of itemsParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === true && state.orderByAlphabet === false && state.filter === false) {
    for (const element: element of priceParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === false && state.orderByAlphabet === true && state.filter === false) {
    for (const element: element of alphabetParam) {
        renderStoreItem(element)
    }
  }

  else if(state.orderByPrice === false && state.orderByAlphabet === false && state.filter === true) {
    for (const element: element of filterArray) {
        renderStoreItem(element)
    }
  }

}

function renderStoreItem(storeParam: Items):void {

  //creating li
  const liEl:HTMLElement | null = document.createElement('li')
  
  //creating a div
  const divEl:HTMLElement | null = document.createElement('div')
  divEl.setAttribute('class', 'store--item-icon')

  //creating a btn with x to remove el from store
  const removeBtnEl:HTMLElement | null = document.createElement('button')
  removeBtnEl.textContent = 'X'
  removeBtnEl.addEventListener('click', function(event) {

    event.preventDefault()

    removeItemFromStore(storeParam)
    render()

  })
  
  //creating an image
  const imgEl:HTMLElement | null = document.createElement('img')

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
  const btnEl:HTMLElement | null = document.createElement('button')
  btnEl.textContent = 'Add to cart'

  //creating span to show me the item if is in stock and how many
  const stockSpanEl:HTMLElement | null = document.createElement('span')
  stockSpanEl.setAttribute('class', 'stock-span-store')
  stockSpanEl.textContent = `The stock: ${storeParam.inStock}`

  //creating span to show me the item price
  const priceSpanEl:HTMLElement | null = document.createElement('span')
  priceSpanEl.setAttribute('class', 'price-span-store')
  priceSpanEl.textContent = `The price: ${storeParam.price}`

  //creating span to show me the item name
  const nameSpanEl:HTMLElement | null = document.createElement('span')
  nameSpanEl.setAttribute('class', 'name-span-store')
  nameSpanEl.textContent = `Name: ${storeParam.name}`

  //appending in order
  divEl.append(imgEl)
  liEl.append(removeBtnEl, divEl, btnEl, stockSpanEl, priceSpanEl, nameSpanEl)
  storeUl.append(liEl)

  //event listeners for the add to cart button
  btnEl.addEventListener('click', function(event): void {

    event.preventDefault()

    increaseItemQuantity(storeParam)
    calculateTotal()

    render()

  })

}

function renderCart():void {

  //we get the ul wich i want from header DESTROY
  cartUl.innerHTML = ''

  // then, recreate the contents of the cart FILTER ARRAY THIS RETURNED THING
  const cart: Items[] = getCartItems() //KEY TO MAKE THINGS WORK

  for (const element: element of cart) {
    renderCartItem(element)
  }

}

function renderCartItem(cartParam: Items):void {

  //creating the li
  const liEl:HTMLElement | null = document.createElement('li')

  //creating the img
  const imgEl:HTMLElement | null = document.createElement('img')
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
  const pEl:(HTMLElement | null) = document.createElement('p')

  //creating the btn element the first one with -
  const btnEl1:(HTMLElement | null) = document.createElement('button')
  btnEl1.setAttribute('class' , 'quantity-btn remove-btn center')
  btnEl1.textContent = '-'
  
  //creating span element wich has the value when you change the btn + or -
  const spanEl:(HTMLElement | null) = document.createElement('span')
  spanEl.setAttribute('class', 'quantity-text center')
  spanEl.textContent = cartParam.inCart

  //creating btn2 wich creates this button for +
  const btnEl2:(HTMLElement | null) = document.createElement('button')
  btnEl2.setAttribute('class', 'quantity-btn add-btn center')
  btnEl2.textContent = '+'

  //appending things and ul is created totally
  liEl.append(imgEl, pEl, btnEl1, spanEl, btnEl2)
  cartUl.append(liEl)

  //event listeners butttons the 1 and 2 - and +
  btnEl1.addEventListener('click', function(event): void {

    event.preventDefault()
    decreaseItemQuantity(cartParam)

    spanEl.textContent = cartParam.inCart

    calculateTotal()
    render()

  })

  btnEl2.addEventListener('click', function(event): void {

    event.preventDefault()
    increaseItemQuantity(cartParam)

    spanEl.textContent = cartParam.inCart

    calculateTotal()
    render()

  })

}

function renderTotal():void {

  totalEl.textContent = '£' + calculateTotal().toFixed(2)

}

function render():void {

  renderStore(state.items, state.priceOrderBy, state.alphabetOrderBy)
  renderCart()
  renderTotal()

}

function init():void {

  render()
  listenToEmptyCartBtn()
  getEventListenerBtnSortPrice()
  getEventListenerRevertBackOrder()
  getEventListenerBtnSortAlphabet()
  getEventListenerFilterButtons()

}
// #endregion

// #region 'Function call and gettig data from server'
getStateDataFromServer().then(function (itemsFromServer): void {
  state.items = itemsFromServer
  state.priceOrderBy.push(...state.items); //now both are the same spread operator copy array
  state.alphabetOrderBy.push(...state.items); //now both are the same spread operator copy array
  init() // no need to call it this basically starts the code running
})
// #endregion