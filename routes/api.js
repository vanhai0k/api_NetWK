var express = require('express');
var router = express.Router();
var apiPro = require('../controllers/api');
var apiUser = require('../controllers/api_user');
var apiComment = require('../controllers/api_comment');
var apiGiohang = require('../controllers/api_gihang');
const ProModel = require('../models/model.model');
const apisanphamMua = require('../controllers/api_sanphamMua');


// product
router.get('/users', apiPro.listProduct);
router.post('/users', apiPro.AddPro);
router.get('/users/update/:idproduct', apiPro.listProductUP);
router.put('/users/update/:id', apiPro.updatePro);
// delete
router.delete('/users/delete/:idproduct', apiPro.deletePro)
router.put('/users/delete/:idproduct', apiPro.listProductUP);


//-------------------------------
// user
router.get('/user', apiUser.listUser);
router.post('/user', apiUser.AddUser);

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

//delete
router.put('/spmua/update/:iduser', apisanphamMua.listUser)
router.delete('/spmua/delete/:id', apisanphamMua.deleteUser)

// update
router.get('/spmua/update/:iduser', apisanphamMua.listUsersUP);
router.put('/spmua/update/:iduser', apisanphamMua.updateUsers)
// --------------------------------------


module.exports = router;
