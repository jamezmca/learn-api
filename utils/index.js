const cheerio = require('cheerio')

function fetchPrice(html) {
    const $ = cheerio.load(html)
    const prices = $('td:nth-child(6)').get().map(val => $(val).text())
    return prices
}

module.exports = { fetchPrice }