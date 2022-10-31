const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send({
      title: "API News API -> Leitura das manchetes do G1 e da CNN",
      version: "0.0.1"
  })
})

module.exports = router