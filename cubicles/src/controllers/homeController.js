const db = require('../db.json');

exports.getHomePage = (req, res) => {
    const { search, from, to } = req.query;
    let cubes = db.cubes
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
exports.getAboutPage = (req, res) => {
    res.render('about')
}
exports.getErrorPage = (req, res) => {
    res.render('404')
}