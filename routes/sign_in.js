const router = require('express').Router()
const handler = require('../controller/signinHandler')

router.get('/', async(req, res) => {
    res.render('/workspaces/codespaces-express/views/sign_in.pug')
})

router.post('/', handler)

module.exports = router