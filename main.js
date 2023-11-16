import { Cart } from './components/Cart.js'
import { Catalog } from './components/Catalog.js'

const response = await fetch('http://localhost:3000/api/products')
const products = await response.json()

const gridCatalog = new Catalog(products)

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

cart.fillCart(products)

