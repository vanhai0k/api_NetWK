var express = require('express');
var router = express.Router();
var apiPro = require('../controllers/api');
var apiUser = require('../controllers/api_user');
var apiComment = require('../controllers/api_comment');
var apiGiohang = require('../controllers/api_gihang');
const ProModel = require('../models/model.model');
const apisanphamMua = require('../controllers/api_sanphamMua');
var apimess = require('../controllers/api_message')
const UserModel = require('../models/model.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// product
router.get('/users', apiPro.listProduct);
router.post('/users', apiPro.AddPro);

router.get('/users/update/:idproduct', apiPro.listProductUP);
router.put('/users/update/:id', apiPro.updatePro);
// delete
router.delete('/users/delete/:idproduct', apiPro.deletePro)
router.put('/users/delete/:idproduct', apiPro.listProductUP);

// thong ke
router.get('/transaction/report', apisanphamMua.sumdate)


//-------------------------------
// user
router.get('/user', apiUser.listUser);
router.post('/user', apiUser.AddUser);

// router.post('/register', apiUser.register);

  // Đăng nhập (hoan thanh)
  router.post('/login', async (req, res) => {
    try {
      const { username, passwd } = req.body;
  
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await UserModel.userModel.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
      }
  
      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(passwd, user.passwd);
      if (!isPasswordValid) {
      // if (user.password !== password) {
        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
      }
  
      // Tiếp tục xử lý đăng nhập thành công
      // Tạo JWT
    //   const token = jwt.sign({ userId: user._id }, 'secretKey');
  
    //   res.json({ token });
      res.status(201).json({ message: 'Đăng nhap thành công' });
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      res.status(500).json({ message: 'Đăng nhập thất bại' });
    }
  });
  router.post('/dangky', apiUser.reg)
  router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Yêu cầu đã được xác thực' });
  });
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'secretKey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

//delete
router.put('/user/update/:iduser', apiUser.listUser)
router.delete('/user/delete/:id', apiUser.deleteUser)

// update
router.get('/users/update/:iduser', apiUser.listUsersUP);
router.put('/user/update/:iduser', apiUser.updateUsers)
// --------------------------------------

// comment
router.get('/comment', apiComment.lisetComment);
router.post('/comment', apiComment.postComment);
router.get('/comment/update/:idcomment', apiComment.listCommentUP);


router.put('/comment/update/:idcomment', apiComment.updateComment);
// delete
router.put('/comment/update/:idcomment', apiComment.listCommentUP);
router.delete('/comment/delete/:idcomment', apiComment.deleteComment)


// kiem kiem sanpham com ment
router.get('/comment/:idproduct', async (req, res) => {
    const idproduct = req.params.idproduct;
    try {
        const comments = await ProModel.binhluanModel.find({ idproduct });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});

// gio hang
router.get('/giohang', apiGiohang.listUser);
router.post('/giohang', apiGiohang.AddUser);

//delete
router.put('/giohang/update/:iduser', apiGiohang.listUser)
router.delete('/giohang/delete/:id', apiGiohang.deleteUser)

// update
router.get('/giohang/update/:iduser', apiGiohang.listUsersUP);
router.put('/giohang/update/:iduser', apiGiohang.updateUsers)
// --------------------------------------

// sanpham mua
router.get('/spmua', apisanphamMua.listUser);
router.post('/spmua', apisanphamMua.AddUser);

// thong ke tien mua sp
router.get('/sumprice', apisanphamMua.sumprice)
router.get('/sumdate', apisanphamMua.sumdate)

//delete
router.put('/spmua/update/:iduser', apisanphamMua.listUser)
router.delete('/spmua/delete/:id', apisanphamMua.deleteUser)

// update
router.get('/spmua/update/:iduser', apisanphamMua.listUsersUP);
router.put('/spmua/update/:iduser', apisanphamMua.updateUsers)
// --------------------------------------


// message
router.get('/message', apimess.lisetComment);

router.get('/message_user/:id', apimess.locMessage);

router.post('/message', apimess.postComment);
router.get('/message/update/:idmessage', apiComment.listCommentUP);

module.exports = router;
