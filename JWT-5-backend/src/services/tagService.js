require('dotenv').config()
const Tag = require("../models/tag");
const aqp = require('api-query-params')

const createTagService = async (data) => {
    try {
        let result = await Tag.create(data)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getTagService = async (queryString) => {
    try {
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString);
        delete filter.page
        let offset = (page - 1) * limit
        result = await Tag.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();
        return result

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getTagByIdService = async (paramsString) => {
    try {
        let result = await Tag.findById(paramsString)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const putTagService = async (data) => {
    try {
        let result = await Tag.updateOne({ _id: data.id }, { ...data })
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const putTagIdService = async (id, data) => {
    try {
        await Tag.updateOne({ _id: id }, data); // không cần spread toàn bộ nữa
        const updatedTag = await Tag.findById(id);
        return updatedTag;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const deleteTagService = async (id) => {
    try {
        let result = await Tag.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const deleteTagIdService = async (paramsString) => {
    try {
        let result = await Tag.findByIdAndDelete(paramsString)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
module.exports = {
    createTagService,
    getTagService,
    putTagService,
    deleteTagService,
    getTagByIdService,
    deleteTagIdService,
    putTagIdService,
}