class BaseService {
    constructor(model){
        this.model=model
    }

    async insert(object){
        return await this.model.create(object)
    }

    async load(){
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    
    async findOne(property,value) {
        return await this.model.findOne({[property]:value})
    }

    async find(property,value) {
        return await this.model.find({[property]:value})
    }
}

module.exports = BaseService