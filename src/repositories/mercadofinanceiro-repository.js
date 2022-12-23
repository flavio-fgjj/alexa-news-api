require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

const News = require('../models/news-model')

const url = `https://api.hgbrasil.com/finance/quotations?key=${process.env.KEYAPI}`
var arrayNews = []

exports.get = async () => {
    await fillNews()

    if (arrayNews.length <= 0) {
        // trying again
        await fillNews()

        if (arrayNews.length <= 0) {
            return {
                "status": "NOK",
                "message": "Não foi possível acessar o mercado financeiro no momento.",
                "data": {}
            }
        } else {
            return {
                "status": "OK",
                "message": "Sucesso",
                "data": arrayNews
            }
        }
    } else {
        return {
            "status": "OK",
            "message": "Sucesso",
            "data": arrayNews
        }
    }
}

async function fillNews() {

    let search = await axios.get(url)
    const stocks = search.data.results.stocks

    for (const stock in stocks) {
        if (Object.hasOwnProperty.call(stocks, stock)) {
            const { name, location, points, variation } = stocks[stock]
            arrayNews.push(`bolsa ${name} ${location} pontos ${points} variação ${variation}`)
        }
    }
}