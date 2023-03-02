const db = require('../db.json')
const Cube = require('../models/Cube')
const getCreateCube = (req, res) => {
    res.render('create')
}
const postCreateCube = (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    cube.save()
    res.redirect('/')
}
const getCubeDetails = (req, res) => {
    let cube = db.cubes.find(x => x.id == req.params.cubeId)
    if (!cube) {
        return res.redirect('/404');
    }
    res.render('details', { cube })
}
module.exports = {
    getCreateCube,
    postCreateCube,
    getCubeDetails
}
