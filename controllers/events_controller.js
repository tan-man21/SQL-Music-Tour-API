const events = require('express').Router();
const { Event, Meet_Greet, Stage, Band, Set_Time } = require('../models')
const { Op } = require('sequelize')

//INDEX
events.get('/', async (req, res) => {
    try{
        const allEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: { [Op.iLike]: `%${req.query.name ? req.query.name : ''}%` }
            }
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
            where: { event_id: req.params.id },
            include: [
                {
                    model: Meet_Greet, as: 'meet_greets', 
                    attributes: { exclude: ['event_id', 'band_id'] },
                    include: { model: Band, as: 'band'} 
                },
                { 
                    model: Set_Time, 
                    as: "set_times",
                    attributes: { exclude: [ "event_id", "stage_id", "band_id" ] },
                    include: [
                        { model: Band, as: "band" },
                        { model: Stage, as: "stage" }
                    ]
                },
                { 
                    model: Stage, 
                    as: "stages",
                    through: { attributes: ['stage_name'] }
                }
            ]
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