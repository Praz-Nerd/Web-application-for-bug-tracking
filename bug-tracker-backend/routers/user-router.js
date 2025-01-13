import express from 'express'
import models from '../models/index.mjs'

const router = express.Router()

// path /users
router.post('/', async (req, res, next)=>{
    try{
        const user = await models.User.create(req.body)
        res.status(201).json(user)
    }catch(err){
        next(err)
    }
})

router.get('/', async (req, res, next)=>{
    try{
        const users = await models.User.findAll({})
        res.status(201).json(users)
    }catch(err){
        next(err)
    }
})

//path /users/:uid
router.get('/:uid', async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        next(err)
    }
})

//path for creating a project /user/:uid/projects
router.post('/:uid/projects', async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid)
        const creatorId = req.params.uid
        const project = req.body
        if(user){
            project.creatorId = creatorId
            await models.Project.create(project)
            res.status(201).json({message:"Project created"})
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        next(err)
    }
})

export default router