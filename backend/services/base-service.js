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

    async query(obj) {
        return this.model.find(obj);
    }

    async update(id, object) {
        return this.model.findByIdAndUpdate(id, object)
    }
}

module.exports = BaseService