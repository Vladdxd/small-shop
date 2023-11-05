import { Cart } from "./cart.js"

export class ItemModal {
    constructor(){
        this.modalBody = document.querySelector('.modal-inner')
        this.cart = new Cart()
    }
    createModalWindow = itemLink => {
        const item = itemLink.closest('.catalog-grid__item')
        const itemName = item.querySelector('.item__name').textContent
        const itemImg = item.querySelector('.item__image-first').getAttribute('src')
        const itemPrice = item.querySelector('.item__price').textContent
        const itemDescription = item.querySelector('.item__description').textContent
        const ItemBuyBtn = item.querySelector('.item__buy-button')

        this.modalBody.innerHTML = ''

        const modalItem = document.createElement('div')
        modalItem.setAttribute('class', 'modal__item')
        modalItem.setAttribute('data-product-name', itemName)
        modalItem.innerHTML = `
        <div class="modal-header">
            <h4 class="modal-title">${itemName}</h4>
            <button type="button" class="close" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
            <div class="modal__item-info">
                <div class="modal__item-row">
                    <img class="modal__item-img" src="${itemImg}" alt="" />
                    <div class="modal__item-col">
                        <p class="modal__item-name">${itemName}</p>
                        <p class="modal__item-price">${itemPrice}</p>
                        <a class="${ItemBuyBtn.getAttribute('class')} modal__item-btn" style="display:block;"></a>
                    </div>
                </div>
                <div class="modal__item-description">${itemDescription}</div>
            </div>
        </div>       
        `
        this.modalBody.append(modalItem)

        const tempBuyBtn = this.modalBody.querySelector('.item__buy-button')

        tempBuyBtn.addEventListener('click', (e) => {
            e.preventDefault()
            tempBuyBtn.classList.toggle('item__buy-button--clicked')
            ItemBuyBtn.classList.toggle('item__buy-button--clicked')
            this.cart.addItemToCart(ItemBuyBtn)
        })

    }
}