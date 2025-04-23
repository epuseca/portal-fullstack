require('dotenv').config()
const User = require("../models/user");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const aqp = require('api-query-params')

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({ email })
        if (user) {
            console.log(`>>>USER EXIST, CHOOSE ANOTHER EMAIL ${email}`)
            return null;
        }

        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "Admin"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const getUserService = async (queryString) => {
    try {
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString);
        delete filter.page
        let offset = (page - 1) * limit
        result = await User.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .select("-password")
            .exec();
        return result

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserByIdService = async (paramsString) => {
    try {
        let result = await User.findById(paramsString).select("-password")
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const putUserService = async (data) => {
    try {
        await User.updateOne({ _id: data.id }, { ...data });
        const updatedUser = await User.findById(data.id); // Lấy lại dữ liệu mới
        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const putUserIdService = async (id, data) => {
    try {
        await User.updateOne({ _id: id }, data); // không cần spread toàn bộ nữa
        const updatedUser = await User.findById(id);
        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteUserService = async (id) => {
    try {
        let result = await User.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const deleteUserIdService = async (paramsString) => {
    try {
        let result = await User.findByIdAndDelete(paramsString)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }

}
const loginService = async (email, password) => {
    try {
        //fetch user by email???
        const user = await User.findOne({ email: email })
        if (user) {
            //compare password using bcrypt
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "EMAIL PASS khong hop le"
                }
            } else {
                //create an access 
                const payload = {
                    email: user.email,
                    name: user.name
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                }
            }
        }

        return result;

    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "EMAIL PASS khong hop le"
        }
    }
}


module.exports = {
    createUserService,
    loginService,
    getUserService,
    putUserService,
    deleteUserService,
    getUserByIdService,
    deleteUserIdService,
    putUserIdService,
}