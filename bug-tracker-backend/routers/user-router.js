import express from 'express'
import models from '../models/index.mjs'

const router = express.Router()

// path for adding a user /users
router.post('/', async (req, res, next)=>{
    try{
        const user = await models.User.create(req.body)
        res.status(201).json(user)
    }catch(err){
        next(err)
    }
})

//path for displaying all users
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
            //add creator id
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

//path for adding members to a project: only creator can add members
//request body is a json with the user id to be added to the project
router.post('/:uid/projects/:pid/add-member', async (req, res, next)=>{
    try{
        const creatorId = req.params.uid
        const projectId = req.params.pid
        const participantId = req.body.participantId

        const user = await models.User.findByPk(creatorId)
        const project = await models.Project.findByPk(projectId)
        const participant = await models.User.findByPk(participantId)
        
        if(user){
            if(project){
                if(participant){
                    if(user.id == project.creatorId){
                        await project.addParticipant(participant)
                        res.status(200).json({message:`User ${participant.username} added to project ${project.title} as member`})
                    }else{
                        res.status(500).json({message:"user is not creator of project"})
                    }
                }else{
                    res.status(404).json({message:"member not found"})
                }
            }else{
                res.status(404).json({message:"project not found"})
            }
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        next(err)
    }
})

//path for becoming a tester in a project: check if its not creator or member
router.post('/:uid/become-tester/:pid', async (req, res, next)=>{
    try{
        const userId = req.params.uid
        const projectId = req.params.pid

        const user = await models.User.findByPk(userId)
        const project = await models.Project.findByPk(projectId, 
            {include: [{association: 'participants', as: 'participants'}]})
        
        if(user){
            if(project){
                if(user.id != project.creatorId){
                    //check if user is participant
                    if(project.participants && !project.participants.some(participant => participant.id === userId)){
                        await project.addTester(user)
                        res.status(200).json({message:`User ${user.username} added to project ${project.title} as tester`})
                    }else{
                        res.status(400).json({message:"user is already a participant and cannot be a tester"})
                    }
                }else{
                    res.status(400).json({message:"a tester cannot be the creator of the project"})
                }
            }else{
                res.status(404).json({message:"project not found"})
            }
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        next(err)
    }
})

export default router