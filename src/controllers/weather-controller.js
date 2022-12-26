'use strict'

const repository = require('../repositories/weather-repository')

exports.get = async (req, res, next) => {
    try {
        let lat = req.query.lat;
        let lon = req.query.lon;
        const data = await repository.get(lat, lon)
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send({
            message: 'Falha ao acessar a privisao do tempo'
        })
    }
}