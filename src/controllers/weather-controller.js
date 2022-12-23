'use strict'

const repository = require('../repositories/weather-repository')

exports.get = async (req, res, next) => {
    try {
        let cityName = req.query.city_name;
        const data = await repository.get(cityName)
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send({
            message: 'Falha ao acessar a privisao do tempo'
        })
    }
}