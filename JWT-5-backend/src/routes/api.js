const express = require('express');
const { createUser, handleLogin, getUser, getAccount, putUser, deleteUser, getUserById, deleteUserId, putUserId, } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createTag, getTag, getTagById, putTag, deleteTag, deleteTagId, putTagId } = require('../controllers/tagController');
const { createSystem, getSystem, getSystemById, putSystem, deleteSystem, putSystemId, deleteSystemId, uploadImageSystem, getImageSystemById } = require('../controllers/systemController');
const routerAPI = express.Router();
const upload = require('../models/multer');

routerAPI.all("*", auth)

routerAPI.get("/", getTag)
//Main login, register, user
routerAPI.post("/login", handleLogin)
routerAPI.get("/account", getAccount)
routerAPI.post("/register", createUser)

//Get edit del user
routerAPI.get("/user", getUser)
routerAPI.get("/user/:idUser", getUserById)
routerAPI.put("/user", putUser)
routerAPI.put("/user/:id", putUserId);
routerAPI.delete("/user", deleteUser)
routerAPI.delete("/user/:id", deleteUserId)

//Get edit del tag
routerAPI.post("/tag", createTag)
routerAPI.get("/tag", getTag)
routerAPI.get("/tag/:idTag", getTagById)
routerAPI.put("/tag", putTag)
routerAPI.put("/tag/:id", putTagId)
routerAPI.delete("/tag", deleteTag)
routerAPI.delete("/tag/:id", deleteTagId)

//Get edit del system
routerAPI.post("/system", createSystem)
routerAPI.get("/system", getSystem)
routerAPI.get("/system/:idSystem", getSystemById)
routerAPI.put("/system", putSystem)
routerAPI.put("/system/:id", putSystemId)
routerAPI.delete("/system", deleteSystem)
routerAPI.delete("/system/:id", deleteSystemId)
routerAPI.post("/system/:id/upload-image", upload.single('image'), uploadImageSystem);
routerAPI.get("/system/:id/image", getImageSystemById);

module.exports = routerAPI; //export default