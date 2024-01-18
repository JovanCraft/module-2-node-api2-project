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
            message: "The posts information could not be retrieved",
            err: err.message
        })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
    .then(foundRightPost => {
        if(!id || !foundRightPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(foundRightPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The post with the specified ID does not exist",
            err: err.message
        })
    })
})

router.post('/', async (req, res) => {
    // try {
    //     const newPost = req.body
    //     if(!req.body.title || !req.body.contents){
    //         res.status(400).json({
    //             message: "Please provide title and contents for the post"
    //         })
    //     } else {
    //         Post.insert(newPost)
    //         const fullPost = await Post.findById(newPost.id)
    //         res.status(201).json(fullPost)
    //     }

    // } catch(err) {
    //     res.status(500).json({
    //         message: "There was an error while saving the post to the database"
    //     })
    // }
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert(newPost)
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(fullPost => {
            res.status(201).json(fullPost)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message
        })
    })

    }

})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.get('/:id/comments', (req, res) => {

})



module.exports = router
