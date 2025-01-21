import express from 'express'
import models from '../models/index.mjs'

const router = express.Router()

// /projects path
//get all projects
router.get('/', async (req, res, next)=>{
    try{
        const projects = await models.Project.findAll({})
        res.status(201).json(projects)
    }catch(err){
        next(err)
    }
})

//get projects by id
// path /projects/:pid
router.get('/:pid', async (req, res, next)=>{
    try{
        const project = await models.Project.findByPk(req.params.pid)
        if(project){
            res.status(201).json(project)
        }
        else{
            res.status(404).json({message: "Cannot find project"})
        }
        
    }catch(err){
        next(err)
    }
})

//path for deleting a project
router.delete('/:pid', async (req, res, next)=>{
    try{
        let project = await models.Project.findByPk(req.params.pid)
        if(project){
            await project.destroy()
            res.status(200).json({message:'project deleted'})
        }
        else{
            res.status(404).json({message: "Cannot find project"})
        }
        
    }catch(err){
        next(err)
    }
})

//get members of a project
// path /projects/:pid/members
router.get('/:pid/members', async (req, res, next)=>{
    try{
        const project = await models.Project.findByPk(req.params.pid, {
            include: [{association: 'participants', as: 'participants'}]
        })
        if(project){
           res.status(200).json(project.participants)
        }
        else{
            res.status(404).json({message: "Cannot find project"})
        }
        
    }catch(err){
        next(err)
    }
})

//get testers of a project
router.get('/:pid/testers', async (req, res, next)=>{
    try{
        const project = await models.Project.findByPk(req.params.pid, {
            include: [{association: 'testers', as: 'testers'}]
        })
        if(project){
           res.status(200).json(project.testers)
        }
        else{
            res.status(404).json({message: "Cannot find project"})
        }
        
    }catch(err){
        next(err)
    }
})

//path for viewing all bugs in a project
router.get('/:pid/bugs', async (req, res, next)=>{
    try{
        const project = await models.Project.findByPk(req.params.pid, {
            include: [{association: 'bugs', as: 'bugs'}]
        })
        if(project){
           res.status(200).json(project.bugs)
        }
        else{
            res.status(404).json({message: "Cannot find project"})
        }
        
    }catch(err){
        next(err)
    }
})

export default router