require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

const News = require('../models/news-model')

const url = `${process.env.URL_UOL}`
var arrayNews = []

exports.get = async() => {
  await fillNews()
  
  if (arrayNews.length <= 0) {
    // trying again
    await fillNews()

    if(arrayNews.length <= 0) {
      return { 
        "status": "NOK",
        "message": "Não foi possível acessar as notícias da CNN no momento.",
        "data": { }
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
  let $ = cheerio.load(search.data)
  let _listNews = $('.flex-wrap, .thumbnails-item')

  let total = 0

  _listNews.first().toArray().map(function(x) {
    return $(x).find('.thumbnails-wrapper, .thumb-caption').children().toArray().map(function(y) {
      const title = $(y).find('span').first().text()
      const description = $(y).find('h3').first().text()
      if (description && description.toString().trim() != "" && total < 12) {
        total++

        let n = new News()
        n.setTitle(title ? title.toString().trim() : '')
        n.setDescription(description.toString().trim())
        arrayNews.push(n)
      }

      return $(y).text()
    })
  })
}