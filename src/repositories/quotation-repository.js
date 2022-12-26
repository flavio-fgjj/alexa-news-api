require('dotenv').config()

const axios = require('axios')

const url = `https://api.hgbrasil.com/finance/quotations?key=${process.env.KEYAPI}`
var arrayQuotation = []

exports.get = async () => {
    await fillQuotation()

    if (arrayQuotation.length <= 0) {
        // trying again
        await fillQuotation()

        if (arrayQuotation.length <= 0) {
            return {
                "status": "NOK",
                "message": "Não foi possível acessar o mercado financeiro no momento.",
                "data": {}
            }
        } else {
            return {
                "status": "OK",
                "message": "Sucesso",
                "data": arrayQuotation
            }
        }
    } else {
        return {
            "status": "OK",
            "message": "Sucesso",
            "data": arrayQuotation
        }
    }
}

async function fillQuotation() {

    let search = await axios.get(url)
    const stocks = search.data.results.stocks

    for (const stock in stocks) {
        if (Object.hasOwnProperty.call(stocks, stock)) {
            const { name, location, points, variation } = stocks[stock]
            arrayQuotation.push(`bolsa ${name} ${location} pontos ${points} variação ${variation}`)
        }
    }
}