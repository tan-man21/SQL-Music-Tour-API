const events = require('express').Router();
const { Event } = require('../models')
const { Op } = require('sequelize')

//INDEX
events.get('/', async (req, res) => {
    try{
        const allEvents = await Event.findAll({
            order: [['date', 'ASC']]
        })
        res.json(allEvents)
    }catch (e){
        res.send(e.message)
    }
})

//SHOW ONE EVENT
events.get('/:id', async (req, res) => {
    try{
        const oneEvent = await Event.findOne({
            where: { id: req.params.id }
        })
        res.json(oneEvent)
    }catch (e){
        res.send(e.message)
    }
})

//CREATE EVENT
events.post('/', async (req, res) => {
    try{
        const newEvent = await Event.create(req.body)
        res.json(newEvent)
    }catch (e){
        res.send(e.message)
    }
})

//UPDATE EVENT
events.put('/:id', async (req, res) => {
    try{
        const {stage, band} = req.body
        const [numEvents] = await Event.update(
            {stage, band},
            {where: { id: req.params.id }}
        )
        res.json(`Updated ${numEvents} event(s)`)
    }catch (e){
        res.send(e.message)
    }
})

//DELETE EVENTS
events.delete('/:id', async (req, res) => {
    try{
        const deleted = await Event.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} event(s)`)
    }catch (e){
        res.send(e.message)
    }
})

module.exports = events