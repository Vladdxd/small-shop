import { ItemModal } from './components/ItemModal.js'
import { Cart } from './components/cart.js'
import { Catalog } from './components/Catalog.js'

const  gridCatalog = new Catalog()

const filterBrand = document.querySelector('.brand-filters')
const filterType = document.querySelector('.type-filters')

gridCatalog.createFilter(filterBrand, 'brand')
gridCatalog.createFilter(filterType, 'type')

gridCatalog.displayItems()

const selectItem = document.querySelector('.aside__sorting')
selectItem.addEventListener('change', () => {
    gridCatalog.sortAndInsertItems(selectItem)
})

const brandCheckboxes = document.querySelectorAll('.brand-checkbox')
const typeCheckboxes = document.querySelectorAll('.type-checkbox')

Array.from(brandCheckboxes).forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        gridCatalog.filterProducts()
    })
})
Array.from(typeCheckboxes).forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        gridCatalog.filterProducts()
    })
})

const cart = new Cart()
const buyButtons = document.querySelectorAll('.item__buy-button')

buyButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault()
        button.classList.toggle('item__buy-button--clicked')
        cart.addItemToCart(button)
    })
})

const ModalWindow = new ItemModal()
const itemLinks = document.querySelectorAll('.item-link')
itemLinks.forEach(itemLink => {
    itemLink.addEventListener('click', e => {
        e.preventDefault()
        ModalWindow.createModalWindow(itemLink)
    })
})

