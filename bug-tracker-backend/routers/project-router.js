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

export default router