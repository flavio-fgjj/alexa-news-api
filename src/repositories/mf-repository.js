require('dotenv').config()

const axios = require('axios')

const url = `https://api.hgbrasil.com/finance/quotations?key=${process.env.KEYAPI}`
var array = []

exports.get = async () => {
    await fill()

    if (arrayNews.length <= 0) {
        // trying again
        await fill()

        if (array.length <= 0) {
            return {
                "status": "NOK",
                "message": "Não foi possível acessar o mercado financeiro no momento.",
                "data": {}
            }
        } else {
            return {
                "status": "OK",
                "message": "Sucesso",
                "data": array
            }
        }
    } else {
        return {
            "status": "OK",
            "message": "Sucesso",
            "data": array
        }
    }
}

async function fill() {

    let search = await axios.get(url)
    const stocks = search.data.results.stocks

    for (const stock in stocks) {
        if (Object.hasOwnProperty.call(stocks, stock)) {
            const { name, location, points, variation } = stocks[stock]
            array.push(`bolsa ${name} ${location} pontos ${points} variação ${variation}`)
        }
    }
}