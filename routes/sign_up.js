const router = require('express').Router()
const handler = require('../controller/signupHandler')

router.get('/', async (req, res) => {
    res.render('/workspaces/codespaces-express/views/sign_up.pug')
})

router.post('/', handler)

module.exports = router