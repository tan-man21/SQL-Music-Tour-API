const stages = require('express').Router();
const { Stage } = require('../models')
const { Op } = require('sequelize')

//INDEX
stages.get('/', async (req, res) => {
    try{
        const allStages = await Stage.findAll()
        res.json(allStages)
    }catch (e){
        res.send(e.message)
    }
})

//SHOW ONE STAGE
stages.get('/:id', async (req, res) => {
    try{
        const oneStage = await Stage.findOne({
            where: { id: req.params.id }
        })
        res.json(oneStage)
    }catch (e){
        res.send(e.message)
    }
})

//CREATE STAGE
stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.json(newStage)
    }catch (e){
        res.send(e.message)
    }
})

//UPDATE STAGE
stages.put('/:id', async (req, res) => {
    try{
        const {name} = req.body
        const [numStages] = await Stage.update(
            {name},
            {where: { id: req.params.id }}
        )
        res.json(`Updated ${numStages} stage(s)`)
    }catch (e){
        res.send(e.message)
    }
})

//DELETE STAGES
stages.delete('/:id', async (req, res) => {
    try{
        const deleted = await Stage.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} stage(s)`)
    }catch (e){
        res.send(e.message)
    }
})

module.exports = stages