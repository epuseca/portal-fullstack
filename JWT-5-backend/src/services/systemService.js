require('dotenv').config()
const System = require("../models/system");
const aqp = require('api-query-params')

const createSystemService = async (data) => {
    try {
        let result = await System.create(data)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getSystemService = async (queryString) => {
    try {
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString);
        delete filter.page
        let offset = (page - 1) * limit
        result = await System.find(filter)
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

const getSystemByIdService = async (paramsString) => {
    try {
        let result = await System.findById(paramsString)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const putSystemService = async (data) => {
    try {
        let result = await System.updateOne({ _id: data.id }, { ...data })
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const putSystemIdService = async (id, data) => {
    try {
        await System.updateOne({ _id: id }, data); // không cần spread toàn bộ nữa
        const updatedSystem = await System.findById(id);
        return updatedSystem;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const deleteSystemService = async (id) => {
    try {
        let result = await System.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const deleteSystemIdService = async (paramsString) => {
    try {
        let result = await System.findByIdAndDelete(paramsString)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
module.exports = {
    createSystemService,
    getSystemService,
    putSystemService,
    deleteSystemService,
    getSystemByIdService,
    putSystemIdService,
    deleteSystemIdService
}