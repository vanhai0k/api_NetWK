var express = require('express');
var router = express.Router();
var Userc = require('../controllers/users.controller');
var check = require('../middlewear/checklogin');
var sp = require('../controllers/product.controller');

var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function name(req, file, cb) {
    cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
  }
});

const upload = multer({
  storage: storage,

}).single('image');


router.use((req, res, next) => {
  console.log("=======> Đã gọi middlwave =======> ", Date.now());
  next();// thực hiện các việc tiếp theo 
});


router.get('/', check.yeucaudangnhap, function (req, res, next) {
  // danh sách user 
  console.log('Hiển thị danh sách');
  res.send(req.session.userLogin);
});

router.get('/user',check.yeucaudangnhap, Userc.Users);
router.get('/res',check.khongyeucaud_n, Userc.ResUsers);
router.post('/res',upload,check.khongyeucaud_n, Userc.ResUsers);
router.get('/delete/:id', Userc.deleteuser);
router.get('/login', check.khongyeucaud_n,Userc.Login);
router.post('/login',check.khongyeucaud_n, Userc.Login);
router.get('/update', check.khongyeucaud_n,Userc.updateUser);
router.post('/update',check.khongyeucaud_n, Userc.updateUser);
router.post('/loc',check.khongyeucaud_n, Userc.locuser);

router.get('/singout', Userc.singout);
module.exports = router;
