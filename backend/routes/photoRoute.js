const router = require('express').Router();
const { createPhoto, getAllPhotos, getPhoto,deletePhoto } = require('../controllers/photoController')


router.route('/')
    .post(createPhoto)
    .get(getAllPhotos);

router.route('/:id')
    .get(getPhoto);

router.route('/:id')
    .delete(deletePhoto);

module.exports = router
