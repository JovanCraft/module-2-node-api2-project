// implement your posts router here
const express = require('express')

const router = express.Router()

router.get('/api/posts', (req, res) => {
    res.status(200).json()
})
