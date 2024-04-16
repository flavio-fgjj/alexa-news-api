require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

const News = require('../models/news-model')

const url = `${process.env.URL_CNN}`
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
  let _listNews = $('.wrapper--sidebar-left, .home__new')

  let total = 0
  let title = ''
  _listNews.first().toArray().map(function(x) {
    return $(x).find('.home__list__item').children().toArray().map(function(x) {
      if($(x).attr('class') === "home__list__tag") {
        let description = $(x).find('.home__list__tag').first().text()

        if (title !== '' && ($(x).find('.news-item-header__title').first().text() != "BRANDED CONTENT" && $(x).find('.news-item-header__title').first().text() !== "") && total < 12) {
          total ++
          let n = new News()
          n.setTitle(title.toString().trim())
          n.setDescription(description.toString().trim())

          if (n.getTitle() != "") {
            arrayNews.push(n)
          }
        }
        
        return $(x).text()
      }

      if ($(x).attr('class') === 'latest__news__infos') {
        title = $(x).find('.home__title__date').first().text()
      }
    })
  })
}