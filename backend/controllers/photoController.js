const { photoService } = require('../services');

const createPhoto = async (req, res) => {
    try {
        const photo = await photoService.insert(req.body);
        res.status(201).json({
            succeded: true,
            photo
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


const getAllPhotos = async (req, res) => {
    try {
        const photos = await photoService.load();
        res.status(200).render('photos', {
            photos,
            link: "photos"
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const getPhoto = async (req, res) => {
    try {

        const {id} = req.params

        const photo = await photoService.findById(id);
        res.status(200).render('photo', {
            photo,
            link: "photos"
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

module.exports = { createPhoto, getAllPhotos,getPhoto }