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

router.delete('/:id', async (req, res) => {
    // const { id } = req.params
    // if(!id){
    //     res.status(404).json({
    //         message: "The post with the specified ID does not exist"
    //     })
    // } else {
    //     Post.remove(req.params.id)
    //     .then(removedPost => {
    //         res.status(200).json(removedPost)
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: "The post could not be removed",
    //             err: err.message
    //         })
    //     })
    // }
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Post.remove(req.params.id)
            res.status(200).json(post)
        }
    } catch(err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message
        })
    }
})

router.put('/:id', async (req, res) => {
    // try {
    //     const { id } = req.params
    //     const changes = req.body

    //     const findPost = await Post.findById(id)
    //     if(!findPost){
    //         res.status(404).json({
    //             message: "The post with the specified ID does not exist"
    //         })
    //     } else {
    //         if(!changes.title || !changes.contents){
    //             res.status(400).json({
    //                 message: "Please provide title and contents for the post"
    //             })
    //         }
    //          const updatedPost = await Post.update(findPost.id, changes)
    //          res.status(200).json(updatedPost)
    //     }
    // } catch(err) {
    //     res.status(500).json({
    //         message: "The post information could not be modified",
    //         err: err.message
    //     })
    // }
    const { id } = req.params
    const post = req.body
    if(!post.title || ! post.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.findById(id)
        .then(chosenPostID => {
            if(!chosenPostID){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                return Post.update(id, post)
            }
        })
        .then(data => {
            if(data) {
                return Post.findById(id)
            }
        })
        .then(updatedPost => {
            res.status(200).json(updatedPost)
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be modified",
                err: err.message
            })
        })
    }
})

router.get('/:id/comments', async (req, res) => {
    // const { id } = req.params
    // Post.findById(id)
    // .then(rightPost => {
    //     if(!id || !rightPost){
    //         res.status(404).json({
    //             message: "The post with the specified ID does not exist"
    //         })
    //     } else {
    //         const postsComments = Post.findPostComments(id)

    //         res.status(200).json(postsComments)
    //     }
    // })
    // .catch(err => {
    //     res.status(500).json({
    //         message: "The comments information could not be retrieved",
    //         err: err.message
    //     })
    // })
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const postsComments = await Post.findPostComments(req.params.id)
            res.json(postsComments)
        }
    } catch(err) {
        res.status(500).json({
            message: "The comments information could not be retrieved",
            err: err.message
        })
    }
})



module.exports = router
