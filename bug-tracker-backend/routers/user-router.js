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
        let project = req.body
        if(user){
            //add creator id
            project.creatorId = creatorId
            project = await models.Project.create(req.body)
            //add creator as member
            await project.addParticipant(user)
            res.status(201).json(project)
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
                        res.status(401).json({message:"user is not creator of project"})
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

//path for deleting a project, only creator can delete the project
router.delete('/:uid/projects/:pid', async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid)
        const creatorId = req.params.uid
        let project = await models.Project.findByPk(req.params.pid)

        if(!project){
            res.status(401).json({message:"project not found"})
            return
        }
        if(user){
            if(creatorId == project.creatorId){
                await project.destroy()
                res.status(200).json({message:"project deleted"})
            }
            else{
                res.status(401).json({message:"user is not creator of the project"})
            }
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        next(err)
    }
})

//path for viewing projects for which the user is a participant
router.get("/:uid/projects/member", async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid, {
            include: [{association: 'participatingProjects', as: 'participatingProjects'}]
        })
        if(user){
           res.status(200).json(user.participatingProjects)
        }
        else{
            res.status(404).json({message: "Cannot find user"})
        }
        
    }catch(err){
        next(err)
    }
})

//path for viewing project for which the user is a tester
router.get("/:uid/projects/tester", async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid, {
            include: [{association: 'testingProjects', as: 'testingProjects'}]
        })
        if(user){
           res.status(200).json(user.testingProjects)
        }
        else{
            res.status(404).json({message: "Cannot find user"})
        }
        
    }catch(err){
        next(err)
    }
})

//path for a tester to crete a bug for a specific project
//request body is a bug object
router.post("/:uid/projects/:pid/add-bug", async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid)
        const project = await models.Project.findByPk(req.params.pid, 
            {include: [{association: 'testers', as: 'testers'}]
        })

        if(!project){
            res.status(401).json({message:"project not found"})
            return
        }
        if(!user){
            res.status(401).json({message:"user not found"})
            return
        }
        if(!project.testers.some(tester => tester.id === user.id)){
            res.status(401).json({message:"user is not tester for this project"})
            return
        }
        const bug = await models.Bug.create(req.body)
        await project.addBug(bug)
        res.status(201).json(bug)
    }catch(err){
        next(err)
    }
})

//path for a user to resulve a bug
//request body is commit link
router.put("/:uid/projects/:pid/resolve-bug/:bid", async (req, res, next)=>{
    try{
        const user = await models.User.findByPk(req.params.uid)
        const project = await models.Project.findByPk(req.params.pid, 
            {include: [{association: 'participants', as: 'participants'},
                {association:'bugs', as:'bugs'}
            ]
        })
        let bug = await models.Bug.findByPk(req.params.bid)

        if(!project){
            res.status(401).json({message:"project not found"})
            return
        }
        if(!user){
            res.status(401).json({message:"user not found"})
            return
        }
        if(!bug){
            res.status(401).json({message:"bug not found"})
            return
        }
        //check that user is participant in the project
        if(!project.participants.some(participant => participant.id === user.id)){
            res.status(401).json({message:"user is not participant for this project"})
            return
        }
        //check that the bug belongs to this project
        if(!project.bugs.some(b => b.id === bug.id)){
            res.status(401).json({message:"bug does not belong to project"})
            return
        }
        if(!req.body.resolvedLink){
            res.status(401).json({message:"no link provided"})
            return
        }
        bug = await models.Bug.update({ resolved: true, resolvedLink: req.body.resolvedLink },
             {where:{id:bug.id}, fields:['resolved', 'resolvedLink']})
        res.status(202).json(bug)
    }catch(err){
        next(err)
    }
})

export default router