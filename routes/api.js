var express = require('express');
var router = express.Router();
var apiPro = require('../controllers/api');
var apiUser = require('../controllers/api_user');
const ProModel = require('../models/model.model');


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


module.exports = router;
