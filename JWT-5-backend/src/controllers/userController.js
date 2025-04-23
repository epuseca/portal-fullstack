const { createUserService, loginService, getUserService, putUserService, deleteUserService, getUserByIdService, deleteUserIdService, putUserIdService } = require("../services/userService")

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    const data = await createUserService(name, email, password)
    return res.status(200).json(data)
}
const handleLogin = async (req, res) => {
    const { email, password } = req.body
    const data = await loginService(email, password)
    return res.status(200).json(data)
}
const getUser = async (req, res) => {
    const data = await getUserService(req.query)
    return res.status(200).json(data)
}
const getUserById = async (req, res) => {
    const data = await getUserByIdService(req.params.idUser)
    console.log("req.params:", req.params.idUser)
    return res.status(200).json(data)
}
const putUser = async (req, res) => {
    const data = await putUserService(req.body)
    return res.status(200).json(data)
}
const putUserId = async (req, res) => {
    const userId = req.params.id;
    const data = await putUserIdService(userId, req.body); // truyền id riêng
    return res.status(200).json(data);
}
const deleteUser = async (req, res) => {
    const data = await deleteUserService(req.body.id)
    return res.status(200).json({ data })
}
const deleteUserId = async (req, res) => {
    const data = await deleteUserIdService(req.params.id)
    console.log("req.params:", req.params.id)
    return res.status(200).json({ data })
}
const getAccount = async (req, res) => {
    return res.status(200).json(req.user)
}
module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount,
    putUser,
    deleteUser,
    deleteUserId,
    getUserById,
    putUserId
}