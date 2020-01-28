const express = require('express')
const router = express.Router()

router.get('/month', (req, res) => {
    res.send('This is a MONTH!!!')
})

module.exports = router