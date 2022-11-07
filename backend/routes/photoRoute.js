const router = require('express').Router();
const { createPhoto, getAllPhotos, getPhoto } = require('../controllers/photoController')


router.route('/')
    .post(createPhoto)
    .get(getAllPhotos);

router.route('/:id')
    .get(getPhoto);



module.exports = router
