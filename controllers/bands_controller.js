const bands = require('express').Router()
const { Band } = require('../models')
const { Op } = require('sequelize')

//Find all Bands
bands.get('/', async (req, res) => {
    try{
        const allBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.iLike]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.json(allBands)
    }catch (e){
        res.send(e.message)
    }
})

//Find One Band
bands.get('/:id', async (req, res) => {
    try{
        const specificBand = await Band.findOne({
            where: { id: req.params.id }
        })
        res.json(specificBand)
    }catch (e){
        res.send(e.message)
    }
})

//Create Band
bands.post('/', async (req, res) => {
    try{
        const newBand = await Band.create(req.body)
        res.json(newBand)
    }catch (e){
        res.send(e.message)
    }
})

//Update Band
bands.put('/:id', async (req, res) => {
    try{
        const {name, genre} = req.body
        const [numUpdated] = await Band.update(
            { name, genre },
            { where: { id: req.params.id } }
            )
        res.json(`Updated ${numUpdated} band(s).`)
    }catch (e){
        res.send(e.message)
    }
})

//Delete Bands
bands.delete('/:id', async (req, res) => {
    try{
        const deleted = await Band.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} band(s)`)
    }catch (e){

    }
})

module.exports = bands