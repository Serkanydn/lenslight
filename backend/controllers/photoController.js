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
        await photoService.insert({ name, description, url: result.secure_url, image_id: result.public_id, user: res.locals.user });

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
        const photos = res.locals.user ? await photoService.query({ user: { $ne: res.locals.user } }) : await photoService.load()
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

        const photo = await photoService.findById(id)
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

const deletePhoto = async (req, res) => {
    try {


        const { id } = req.params

        const photo = await (await photoService.findById(id)).populate('user');

        const photoId = photo.image_id;

        await cloudinary.uploader.destroy(photoId);

        await photoService.removeBy('_id', id)

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const updatePhoto = async (req, res) => {
    try {

        const { id } = req.params
        const photo = await photoService.findById(id)

        if (req.files) {
            await cloudinary.uploader.destroy(photo.image_id);

            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: 'lenslight'
                }
            );
            photo.url = result.secure_url;
            photo.image_id = result.public_id
            fs.unlinkSync(req.files.image.tempFilePath);
        }

        const { name, description } = req.body;
        photo.name = name;
        photo.description = description

        photo.save();

        res.status(200).redirect(`/photos/${req.params.id}`);


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


module.exports = { createPhoto, getAllPhotos, getPhoto, deletePhoto, updatePhoto }