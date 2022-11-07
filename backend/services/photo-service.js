const BaseService = require('./base-service');
const { Photo } = require('../models');

class PhotoService extends BaseService {


}

module.exports = new PhotoService(Photo);