require("dotenv").config()
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const white_lists = ["/", "/?populate=listSystem", "/register", "/login"]
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next()
    } else {
        if (req?.headers?.authorization ?.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];
            //verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createBy: "GiaLoc"
                }
                console.log("Check token:", decoded)
                next()
            } catch (error) {
                return res.status(401).json({
                    message: "Token bị lỗi/Token hết hạn"
                })
            }
        } else {
            return res.status(401).json({
                message: "Bạn chưa truyền ACCESS TOKEN ở header/Token hết hạn"
            })
        }
    }

}

module.exports = auth;