const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const handler = require('../controller/mailHandler')
const ENV = require('dotenv').config().parsed

router.get('/', async(req, res) => {
    res.render('/workspaces/codespaces-express/views/forgot-password.pug')
});

router.post('/', async(req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({ email })

        if(user){
            const token = jwt.sign({ email: user.email, pass: user.pass }, ENV.secret);
            return res.send(`/forgot-password/${token}`) //mail is sent with this reset link
        }

        return res.send("No such email exists")
    }catch(err){
        res.send("Error")
    }
})

router.get('/:token', async(req, res) => {
    try {
        const token = req.params.token
        const data = jwt.decode(token, ENV.secret)

        const user = await User.findOne({ email: data.email, pass: data.pass })
        if (user) {
            res.render("/workspaces/codespaces-express/views/reset-pass.pug", {link: token})
        }
        return res.status(401).send("Invalid token")
    }
    catch(err){
        res.send("Error")
    }
})

router.post('/:token', async(req, res) => {
    try{
        const token = req.params.token
        const data = jwt.decode(token, ENV.secret)

        const user = await User.findOne({ email: data.email, pass: data.pass })
        if (user) {
            const pass = req.body.pass;
            const verifyPass = req.body.verifyPass

            if(pass === verifyPass){
                const salt = bcrypt.genSaltSync(10)
                const password = bcrypt.hash(pass, salt);

                await User.updateOne({ email: email }, { $set: { pass: password } })
                return res.send("Password reset sucessfull")
            }
        }

        return res.status(401).send("Invalid Token")
    }
    catch(err){
        res.status(400).send("Error")
    }
})

module.exports = router;