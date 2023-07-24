var express = require('express')
var router = express.Router('');
var Productctl= require('../controllers/product.controller')

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

router.get('/product', Productctl.Product);

////aadd product
router.get('/addproduct',Productctl.addProduct);
router.post('/addproduct',upload , Productctl.addProduct);

///
router.get('/updateproduct/:idsp', Productctl.updateProduct);
router.post('/updateproduct/:idsp',upload, Productctl.updateProduct);
////
router.get('/chitiet/:idsp', Productctl.chitietProduct);
router.post('/chitiet/:idsp', Productctl.chitietProduct);
router.get('/delete/:id', Productctl.deleteproduct);

router.get('/theloai', Productctl.Theloai);

router.get('/addtheloai',Productctl.addtheloai);
router.post('/addtheloai', Productctl.addtheloai);
router.get('/deletetheloai/:id', Productctl.deletetheloai);

router.get('/udtheloai/:idtl',Productctl.updatetheloai);

router.post('/udtheloai/:idtl',Productctl.updatetheloai);

router.post('/loc',Productctl.locSP);
router.post('/tim',Productctl.TimSP);





module.exports =router;
