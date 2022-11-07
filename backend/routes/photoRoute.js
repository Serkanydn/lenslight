const router = require('express').Router();
const { createPhoto, getAllPhotos } = require('../controllers/photoController')


router.route('/')
    .post(createPhoto)
    .get(getAllPhotos);



module.exports = router
