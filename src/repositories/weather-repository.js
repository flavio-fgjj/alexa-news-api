require('dotenv').config()

const axios = require('axios')
var arrayNews = []

exports.get = async (cityName) => {
    
    await fillNews(cityName)
    
    if (arrayNews.length <= 0) {
        // trying again
        await fillNews()
        
        if (arrayNews.length <= 0) {
            return {
                "status": "NOK",
                "message": "Não foi possível acessar o previsao do tempo no momento.",
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

async function fillNews(cityName=`SaoPaulo,SP`) {
    const url = `https://api.hgbrasil.com/weather?key=${process.env.KEYAPI}&city_name=${cityName}`
    let search = await axios.get(url)
    const description = search.data.results.description
    arrayNews.push(`Na cidade de ${search.data.results.city_name} o tempo esta ${description}`)
}