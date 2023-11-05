import { products } from '../product.data.js'

export class Catalog {
  constructor() {
    this.catalogArea = document.querySelector('.catalog-grid')
  }
  
  displayItems = () => {
    products.forEach(product => {
      let item = document.createElement('li')
      item.classList.add('catalog-grid__item')
      item.setAttribute('data-brand', `${product.brand}`)
      item.setAttribute('data-type', `${product.type}`)
      item.innerHTML = `
      <div class="item-iner">
      <a class="item-link" data-toggle="modal" data-target=".item__open-modal">
        <div class="item__image-box">
          <img class="item__image-first" src="${product.image1}" alt="" />
          <img class="item__image-second" src="${product.image2}" alt="" />
        </div>
        <p class="item__name">${product.name}</p>
      </a>
          <div class="item__row">
          <h2 class="item__price">${product.price.toLocaleString()}₴</h2>
          <a class="item__buy-button"></a>
          </div>
          <div class="item__hidden-box">
          <div class="item__hidden-content">
            <div class="item__hidden-content-inner">
              <p class="item__description">${product.description}</p>
            </div>
          </div>
        </div>
      </div>
      `
      this.catalogArea.append(item)
    })
  }
  
  sortAndInsertItems = selectItem => {
    const items = Array.from(this.catalogArea.querySelectorAll('.catalog-grid__item'))

    items.sort((item1, item2) => {
      const price1 = parseInt(item1.querySelector('.item__price').textContent.replace(/[^\d.]/g, ''))
      const price2 = parseInt(item2.querySelector('.item__price').textContent.replace(/[^\d.]/g, ''))
      if (selectItem.value === 'cheap') return price2 - price1
      else return price1 - price2
    })
    items.forEach(item => this.catalogArea.append(item))
  }

  filterProducts = () => {
    const brandCheckboxes = document.querySelectorAll('.brand-checkbox')
    const typeCheckboxes = document.querySelectorAll('.type-checkbox')

    const selectedBrands = Array.from(brandCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
    const selectedTypes = Array.from(typeCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)

    const items = document.querySelectorAll('.catalog-grid__item')
    items.forEach(item => {
      if ((selectedBrands.length === 0 || selectedBrands.includes(item.getAttribute('data-brand'))) && (selectedTypes.length === 0 || selectedTypes.includes(item.getAttribute('data-type')))) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  }

  createFilter = (container, attribute) => {
    const uniqueValues = {}
    products.forEach(product => {
      uniqueValues[product[attribute]] = true
    })
    Object.keys(uniqueValues).forEach(key => {
      let item = document.createElement('li')
      item.innerHTML = `<a class="item__filter">
            <label class="label__filter">
            <input class="${attribute}-checkbox form-check-input" type="checkbox" value="${key}" />
            <p class="ms-1">${key}</p>
            </label>
            </a>`
      container.append(item)
    })
  }

}

