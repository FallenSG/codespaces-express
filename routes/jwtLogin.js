const router = require('express').Router()

router.get('/', async(req, res) => {
    try {
        if (req.body.BearerToken) {
            const token = req.body.BearerToken

            const data = jwt.decode(token, ENV.secret)

            const user = await User.findOne({ email: data.email, pass: data.pass })
            if (user) {
                return res.status(200)
            }
            return res.status(402).send("Invalid Token")
        }
        return res.redirect('/workspaces/codespaces-express/views/sign_up.pug')
    }
    catch (err) {
        res.status(400).send("Error while trying to login");
    }
})
module.exports = router