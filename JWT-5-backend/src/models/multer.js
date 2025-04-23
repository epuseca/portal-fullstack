const multer = require('multer');

const storage = multer.memoryStorage(); // lưu ảnh vào bộ nhớ RAM tạm thời
const upload = multer({ storage: storage });

module.exports = upload;
