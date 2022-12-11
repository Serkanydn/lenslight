const BaseService = require('./base-service');
const { Photo } = require('../models');

class PhotoService extends BaseService {
    async sortByDate(limit) {
        return await this.model.find().sort({ createdAt: -1 }).limit(limit)
    }


}

module.exports = new PhotoService(Photo);