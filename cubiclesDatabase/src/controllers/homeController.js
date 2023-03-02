const Cube = require('../models/Cube');

const getHomePage = async (req, res) => {
    const { search, from, to } = req.query;
    let cubes = await Cube.find().lean()

    if (search) {
        cubes = cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (from) {
        cubes = cubes.filter(x => x.difficultyLevel >= from)
    }
    if (to) {
        cubes = cubes.filter(x => x.difficultyLevel <= to)
    }


    res.render('index', { cubes, search, from, to })
}
const getAboutPage = (req, res) => {
    res.render('about')
}
const getErrorPage = (req, res) => {
    res.render('404')
}

module.exports = {
    getHomePage,
    getAboutPage,
    getErrorPage
}