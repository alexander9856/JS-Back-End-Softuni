const Accessory = require('../models/Accessory')
const Cube = require('../models/Cube')

const getCreateAccessory = (req, res) => {
    res.render('createAccessory')
}
const postCreateAccessory = async (req, res) => {
    let { name, description, imageUrl } = req.body;
    try {
        let accessory = new Accessory({ name, description, imageUrl });
        await accessory.save()
    } catch (err) {
        return res.redirect('/404')
    }

    res.redirect('/');
}

const getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
    let accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
    if (!cube) {
        return res.redirect('/404');
    }
    res.render('attachAccessory', { cube, accessories })
}

const postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);

    const accessoryId = req.body.accessory
    cube.accessories.push(accessoryId)
    cube.save()
    res.redirect('/details/' + cube._id)
}


module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory,
    postAttachAccessory

}