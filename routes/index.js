const { fetchPrice } = require("../utils")

// Variables
const baseUrl = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`

async function getHome(req, res) {
    res.status(200).send({ message: 'Thank you for trying our API' })
}

async function getStockPrices(req, res) {
    const { stock } = req.query
    console.log('STOCK TICKER: ' + stock)
    if (!stock) {
        return res.sendStatus(403)
    }

    try {
        const stockDataUrl = baseUrl(stock)
        const stockRes = await fetch(stockDataUrl)
        const data = await stockRes.text()
        console.log(data)
        const prices = fetchPrice(data)
        console.log(prices)
        res.status(200).send({ prices })
    } catch (err) {
        console.log('THERE WAS AN ERROR', err)
        res.sendStatus(500)
    }
}

const postTest = (req, res) => {
    const body = req.body
    const { message } = body
    console.log('THIS IS THE MESSAGE: ' + message)
    res.sendStatus(200)
}

function getParamsTest(req, res) {
    const { bananaKeywork } = req.params

    console.log('THE KEYWORD IS: ' + bananaKeywork)
    res.sendStatus(200)
}

function middleWareInterceptor(req, res, next) {
    console.log('I AM THE MIDDLE MAN')
    const { password } = req.query
    if (password !== '1234') { return res.sendStatus(403) }
    next()
}

module.exports = { getStockPrices, getHome, postTest, getParamsTest, middleWareInterceptor }