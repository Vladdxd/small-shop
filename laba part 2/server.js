const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000
const host = 'localhost'
let cart = []

app.get('/api/products', (req, res) => {
    res.json([
        {
            name: 'iPhone 15',
            brand: 'Apple',
            type: 'Phone',
            price: 42_499,
            image1: 'https://content1.rozetka.com.ua/goods/images/big_tile/364623744.jpg',
            image2: 'https://content2.rozetka.com.ua/goods/images/big_tile/364623745.jpg',
            description:
                'Экран (6.1", OLED (Super Retina XDR), 2556x1179) / Apple A16 Bionic / двойная основная камера: 48 Мп + 12 Мп, фронтальная камера: 12 Мп / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM / iOS 17'
        },
        {
            name: 'iPhone 15 Pro',
            brand: 'Apple',
            type: 'Phone',
            price: 61_999,
            image1: 'https://content2.rozetka.com.ua/goods/images/big_tile/364830351.jpg',
            image2: 'https://content.rozetka.com.ua/goods/images/big_tile/364830341.jpg',
            description:
                'Экран (6.1", OLED (Super Retina XDR), 2556x1179) / Apple A17 Pro / основная квадрокамера: 48 Мп + 12 Мп + 12 Мп + 12 Мп, фронтальная камера: 12 Мп / 512 ГБ встроенной памяти / 3G / LTE / 5G / GPS / Nano-SIM / iOS 17'
        },
        {
            name: 'Samsung Galaxy S21',
            brand: 'Samsung',
            type: 'Phone',
            price: 20_999,
            image1: 'https://content2.rozetka.com.ua/goods/images/big_tile/245917791.jpg',
            image2: 'https://content1.rozetka.com.ua/goods/images/big_tile/245917803.jpg',
            description:
                'Экран (6.4", Dynamic AMOLED 2X, 2340x1080) / Qualcomm Snapdragon 888 (2.84 ГГц) / тройная основная камера: 12 Мп + 12 Мп + 8 Мп, фронтальная 32 Мп / RAM 8 ГБ / 256 ГБ встроенной памяти / 3G / LTE / 5G / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 4500 мА*ч'
        },
        {
            name: 'Samsung Galaxy S21 Ultra',
            brand: 'Samsung',
            type: 'Phone',
            price: 35_961,
            image1: 'https://content.rozetka.com.ua/goods/images/big_tile/371567557.jpg',
            image2: 'https://content1.rozetka.com.ua/goods/images/big_tile/371567563.jpg',
            description:
                'Экран (6.4", Dynamic AMOLED 2X, 2340x1080) / Qualcomm Snapdragon 888 (2.84 ГГц) / тройная основная камера: 12 Мп + 12 Мп + 8 Мп, фронтальная 32 Мп / RAM 6 ГБ / 128 ГБ встроенной памяти / 3G / LTE / 5G / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 4500 мА*ч'
        },
        {
            name: 'Samsung QE55Q60CAUXUA',
            brand: 'Samsung',
            type: 'TV',
            price: 33_499,
            image1: 'https://content1.rozetka.com.ua/goods/images/big_tile/364929632.jpg',
            image2: 'https://content1.rozetka.com.ua/goods/images/big_tile/364929633.jpg',
            description:
                'Серия Q6 Диагональ экрана 55" Поддержка Smart TV со Smart TV Разрешение 3840x2160 Тип телевизора QLED / Quantum Dot Беспроводные возможности Bluetooth WI-Fi Год выпуска 2023 Операционная система Tizen ТВ-тюнер Спутниковый Цифровой Т2 Цифровой кабельный Назначение В спальню Для гостиной'
        },
        {
            name: 'Samsung UE55CU7100UXUA',
            brand: 'Samsung',
            type: 'TV',
            price: 22_999,
            image1: 'https://content.rozetka.com.ua/goods/images/big_tile/362460193.jpg',
            image2: 'https://content.rozetka.com.ua/goods/images/big_tile/352317085.jpg',
            description:
                'Серия Q6 Диагональ экрана 55" Поддержка Smart TV со Smart TV Разрешение 3840x2160 Тип телевизора QLED / Quantum Dot Беспроводные возможности Bluetooth WI-Fi Год выпуска 2023 Операционная система Tizen ТВ-тюнер Спутниковый Цифровой Т2 Цифровой кабельный Назначение В спальню Для гостиной'
        },
        {
            name: 'TEST',
            brand: 'Samsung',
            type: 'TV',
            price: 222_999,
            image1: 'https://content.rozetka.com.ua/goods/images/big_tile/362460193.jpg',
            image2: 'https://content.rozetka.com.ua/goods/images/big_tile/352317085.jpg',
            description:
                'Серия Q6 Диагональ экрана 55" Поддержка Smart TV со Smart TV Разрешение 3840x2160 Тип телевизора QLED / Quantum Dot Беспроводные возможности Bluetooth WI-Fi Год выпуска 2023 Операционная система Tizen ТВ-тюнер Спутниковый Цифровой Т2 Цифровой кабельный Назначение В спальню Для гостиной'
        }
    ])
})

app.post('/api/addToCart', (req, res) => {
    const { itemName } = req.body
    
    const existingCartItem = cart.includes(itemName)
    console.log(existingCartItem);
    if (existingCartItem) cart = cart.filter(item => item !== itemName)
    else cart.push(itemName)

    console.log(cart)
    res.json(cart)
})
app.get('/api/fillCart', (req, res) => {
    res.json(cart)
})


app.listen(port, host, () => {
    console.log(`Сервер запущен на порту ${port} на ${host}`)
})
