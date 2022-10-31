'use strict'

const repository = require('../repositories/uol-repository')

exports.get = async(req, res, next) => {
  try {
    const data = await repository.get()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send({
      message: 'Falha ao acessar Uol últimas notícias'
    })
  }
}