// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()


router.get('/', (req, res) => {
    Post.find()
    .then(foundPosts => {
        res.status(200).json(foundPosts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
    .then(foundRightPost => {
        if(!id){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(foundRightPost)
        }
    })
    .catch(err => {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    })
})

router.post('/', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.get('/:id/comments', (req, res) => {

})



module.exports = router
