require('dotenv').config()

const axios = require('axios')

exports.get = async (lat, lon) => {
    
    let responde = await fillNews(lat, lon)
    
    if (responde.length <= 0) {
        // trying again
        responde = await fillNews(lat, lon)
        
        if (responde.length <= 0) {
            return {
                "status": "NOK",
                "message": "Não foi possível acessar o previsao do tempo no momento.",
                "data": {}
            }
        } else {
            return {
                "status": "OK",
                "message": "Sucesso",
                "data": responde
            }
        }
    } else {
        return {
            "status": "OK",
            "message": "Sucesso",
            "data": responde
        }
    }
}

async function fillNews(lat=`23.555`, lon=`46.639`) {
    let arrayNews = [];
    const description = ['previsão de Tempestade forte', 'previsão de Tempestade tropical', 'previsão de Furacão', 'previsão de Tempestades severas', 'previsão de Tempestades', 'Misto de neve e chuva', 'Misto chuva e gelo', 'Misto neve e gelo', 'previsão de Geada fina', 'Chuviscos', 'previsão de Congelamento chuva', 'previsão de Alguns chuviscos', 'previsão de Alguns chuviscos', 'previsão de Neve baixa', 'previsão de Tempestade com neve', 'previsão de Ventania com neve', 'previsão de Neve', 'previsão de Granizo', 'previsão de Gelo', 'previsão de Poeira', 'previsão de Neblina', 'previsão de Tempestade de areia', 'previsão de Fumacento', 'previsão de Vento acentuado', 'previsão de Ventania', 'o está Tempo frio', 'o está Tempo nublado', 'previsão de Tempo limpo', 'previsão de Tempo nublado', 'Parcialmente nublado', 'Parcialmente nublado', 'previsão de Tempo limpo', 'o clima está Ensolarado', 'o clima está Estrelado', 'o clima está Ensolarado com muitas nuvens', 'Misto chuva e granizo', 'o clima está Ar quente', 'previsão de Tempestades isoladas', 'previsão de Trovoadas dispersas', 'previsão de Trovoadas dispersas', 'previsão de Chuvas esparsas', 'previsão de Pesados neve', 'previsão de Chuviscos com neve', 'previsão de Neve pesada', 'previsão de Sol com poucas nuvens', 'previsão de Chuva', 'previsão de Queda de neve', 'previsão de Tempestades isoladas', 'previsão de Serviço não disponível'];
    const url = `https://api.hgbrasil.com/weather?key=${process.env.KEYAPI}&lat=${lat}&lon=${lon}&user_ip=remote`
    let search = await axios.get(url)
    arrayNews.push(`Em ${search.data.results.city_name} ${description[search.data.results.condition_code]}`)
    return arrayNews
}