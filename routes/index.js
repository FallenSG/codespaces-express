const router = require('express').Router()

router.get('/', async(req, res) => {
    res.send("index page")
})

router.use('/user', require('./user'))
router.use('/sign_in', require('./sign_in'))
router.use('/sign_up', require('./sign_up'))
router.use('/forgot-password', require('./forgot-pass'))

router.use('/*', async(req, res) =>{
    res.redirect('/')
})

module.exports = router