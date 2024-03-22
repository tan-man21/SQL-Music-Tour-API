const bands = require('express').Router()
const { Band } = require('../models')
const { Op } = require('sequelize')

//FIND ALL BANDS
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

//FIND ONE BAND
bands.get('/:id', async (req, res) => {
    try{
        const specificBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.json(specificBand)
    }catch (e){
        res.send(e.message)
    }
})

//CREATE BAND
bands.post('/', async (req, res) => {
    try{
        const newBand = await Band.create(req.body)
        res.json(newBand)
    }catch (e){
        res.send(e.message)
    }
})

//UPDATE BAND
bands.put('/:id', async (req, res) => {
    try{
        const {name, genre} = req.body
        const [numUpdated] = await Band.update(
            { name, genre },
            { where: { id: req.params.band_id } }
            )
        res.json(`Updated ${numUpdated} band(s).`)
    }catch (e){
        res.send(e.message)
    }
})

//DELETE BANDS
bands.delete('/:id', async (req, res) => {
    try{
        const deleted = await Band.destroy({
            where: { id: req.params.band_id }
        })
        res.send(`Deleted ${deleted} band(s)`)
    }catch (e){

    }
})

module.exports = bands