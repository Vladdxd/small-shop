export class Cart {
    constructor() {
        this.cartModalBody = document.querySelector('.cart__modal-body')
        this.cartItemsList = document.querySelector('.cart-items')
    }

    checkEmpty = () => {
        const cartItems = this.cartItemsList.querySelectorAll('.cart-item')
        let cartBox = this.cartModalBody.querySelector('.cart__box')
        const itemPrices = this.cartItemsList.querySelectorAll('.cart__item-price')

        if (cartItems.length === 0) {
            this.cartItemsList.innerHTML = '<p class="cart-empty">Корзина пустая</p>'
            if (cartBox) {
                this.cartModalBody.removeChild(cartBox)
            }
        } else {
            let textEmptyCart = this.cartItemsList.querySelector('.cart-empty')
            if (textEmptyCart) this.cartItemsList.removeChild(textEmptyCart)
            if (!cartBox) {
                cartBox = document.createElement('div')
                cartBox.setAttribute('class', 'cart__box')
                let totalPrice = Array.from(itemPrices)
                    .map(string => parseInt(string.textContent.replace(/[^\d.]/g, '')))
                    .reduce((total, current) => total + current)
                cartBox.innerHTML = `
      <p class="cart__total-price">${totalPrice.toLocaleString()}₴</p>
      <div class="cart__box-btn"><a class="btn btn-success btn-lg " href="#" role="button">Оформити замовлення</a></div>
      `
                this.cartModalBody.append(cartBox)
            } else {
                let totalPrice = Array.from(itemPrices)
                    .map(string => parseInt(string.textContent.replace(/[^\d.]/g, '')))
                    .reduce((total, current) => total + current)
                cartBox.querySelector('.cart__total-price').innerHTML = `${totalPrice.toLocaleString()}₴`
            }
        }
    }

    addItemToCart = button => {
        const item = button.closest('.catalog-grid__item')
        const itemName = item.querySelector('.item__name').textContent
        const itemImg = item.querySelector('.item__image-first').getAttribute('src')
        const itemPrice = item.querySelector('.item__price').textContent

        const existingCartItem = this.cartItemsList.querySelector(`li[data-product-name="${itemName}"]`)

        if (existingCartItem) {
            this.cartItemsList.removeChild(existingCartItem)
        } else {
            const cartItem = document.createElement('li')
            cartItem.setAttribute('class', 'cart-item')
            cartItem.setAttribute('data-product-name', itemName) // Добавляем атрибут с именем товара
            cartItem.innerHTML = `
        <div class="cart__item-info">
          <img  class="cart__item-img" src="${itemImg}" alt="">
          <div class="cart__item-col">
          <p class="cart__item-name">${itemName}</p>
          <p class="cart__item-price">${itemPrice}</p>
          </div>
        </div>
      <a class="cart__item-link" href="">Видалити</a>`
            this.cartItemsList.append(cartItem)

            const removeBtn = cartItem.querySelector('.cart__item-link')
            removeBtn.addEventListener('click', e => {
                e.preventDefault()
                button.classList.toggle('item__buy-button--clicked')
                this.cartItemsList.removeChild(cartItem)
                this.checkEmpty()
            })
        }
        this.checkEmpty()
    }
}
