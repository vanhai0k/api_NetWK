var express = require('express');
var router = express.Router();
var Cookie = require('cookie-parser')


var apiPro = require('../controllers/api');
var apiUser = require('../controllers/api_user');
const ProModel = require('../models/product.model');
const UserModel = require('../models/user.model');

const bcrypt = require('bcrypt');


// sp
router.get('/users', apiPro.listProduct);
router.post('/users', apiPro.AddPro);
router.delete('/users/delete/:id', apiPro.deletePro)
router.put('/users/update/:id', apiPro.updatePro);

// user

router.get('/user', apiUser.listUser);
router.delete('/user/delete/:id', apiUser.deleteUser)
router.post('/user', apiUser.AddUser);


router.get('/comment', apiPro.lisetComment);
router.post('/comment', apiPro.postComment);
router.delete('/comment/delete/:id', apiPro.deleteComment)
router.put('/comment/update/:id', apiPro.updateComment);

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

router.post('/signin', async (req, res) => {
    let { username, passwd } = req.body;
    username = username.trim();
    passwd = passwd.trim();

    if (username == "" || passwd == "") {
        res.json({
            status: "fail",
            message: "Empty credentials"
        })
    } else {
        UserModel.userModel.find({ username })
            .then(data => {
                if (data.length) {

                    const hanshedPass = data[0].passwd;
                    bcrypt.compare(passwd, hanshedPass).then(result => {
                        if (result) {
                            res.json({
                                status: "success",
                                message: "thanh cong",
                                data: data
                            });
                        } else {
                            res.json({
                                status: "fail",
                                message: "invalid pass"
                            });
                        }
                    })
                        .catch((err) => {
                            res.json({
                                status: "fail",
                                message: "an error"
                            })
                        })
                } else {
                    res.json({
                        status: "fail",
                        message: "Invalid cre"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: "fail",
                    message: "an error"
                })
            })
    }
})

// router.post('/login', apiUser.loginUser)



module.exports = router;
