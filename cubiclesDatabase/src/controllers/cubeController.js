// const Cube = require('../models/Cube_old')
const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')

const getCreateCube = (req, res) => {

    res.render('create')
}
const postCreateCube = async (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;
    await Cube.create({
        name,
        description,
        imageUrl,
        difficultyLevel,
        ownerId: req.user._id
    });

    res.redirect('/')
}
const getCubeDetails = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).populate('accessories').lean()
    if (!cube) {
        return res.redirect('/404');
    }
    const isOwner = req.user && req.user._id == cube.ownerId

    res.render('details', { cube, isOwner })
}
function generateDifficultyLevels(currentLevel) {
    const difficultyLevels = [
        { value: 1, label: 'Very Easy', selected: false },
        { value: 2, label: 'Easy', selected: false },
        { value: 3, label: 'Medium (Standard 3x3)', selected: false },
        { value: 4, label: 'Intermediate', selected: false },
        { value: 5, label: 'Expert', selected: false },
        { value: 6, label: 'Hardcore', selected: false },
    ]
    const result = difficultyLevels.map(x => x.value === currentLevel ? { ...x, selected: true } : x)
    return result
}
const getEditCube = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean()
    const difficultyLevels = generateDifficultyLevels(cube.difficultyLevel)
    res.render('edit', { cube, difficultyLevels })
}

const postEditCubeDetails = async (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body
    let cubeId = req.params.cubeId
    await Cube.findByIdAndUpdate(cubeId, { name, description, imageUrl, difficultyLevel }, { runValidators: true })
    res.redirect('/')
}


const getDeleteCube = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const difficultyLevels = generateDifficultyLevels(cube.difficultyLevel)
    res.render('delete', { cube, difficultyLevels })
}
const postDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId
    await Cube.findByIdAndDelete(cubeId)
    res.redirect('/')
}

module.exports = {
    getCreateCube,
    postCreateCube,
    getCubeDetails,
    getEditCube,
    postEditCubeDetails,
    getDeleteCube,
    postDeleteCube
}
