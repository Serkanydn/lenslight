const { photoService } = require('../services');
const cloudinary = require('cloudinary').v2
const fs = require('fs');

const createPhoto = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'lenslight'
        }
    );

    try {
        const { name, description } = req.body
        await photoService.insert({ name, description, url: result.secure_url, user: res.locals.user });

        fs.unlinkSync(req.files.image.tempFilePath);

        res.status(201).redirect('/users/dashboard');

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


const getAllPhotos = async (req, res) => {
    try {
        const photos =res.locals.user ? await photoService.query({ user: { $ne : res.locals.user } })   : await photoService.load() 
        res.render('photos', {
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

        const { id } = req.params

        const photo = await (await photoService.findById(id)).populate('user');
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

module.exports = { createPhoto, getAllPhotos, getPhoto }