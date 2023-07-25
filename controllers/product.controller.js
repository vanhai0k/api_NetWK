const mymodel = require('../models/model.model');;




exports.Product = async (req, res, next) => {

    

    var sp = await mymodel.spModel.find()
        .populate('the_loai')// ten cot tham chieu 

        ;
    console.log(sp);

    let listthe_loai = await mymodel.theloaimodel.find();

   





    res.render('sanpham/product', { title: 'Product', product: sp,listtheloai:listthe_loai})
}
exports.addProduct = async (req, res, next) => {

    let listtheloai = await mymodel.theloaimodel.find();

    if (req.method == 'POST') {
        let objSp = new mymodel.spModel();
        objSp.title = req.body.title;
        objSp.name = req.body.name;
        objSp.price = req.body.price;
        objSp.quantity = req.body.quantity;
        objSp.content = req.body.content;
        objSp.the_loai = req.body.theloai;
        objSp.image = req.file.filename;

        try {

            let new_sp = await objSp.save();
            console.log(new_sp);
            msg = "da them thanh cong "
        } catch (error) {
            console.log(error);

        }

    }
    // var url_image = '';
    // if (req.method == 'POST') {
    //     // xu ly upload
    //     console.log(req.file, res.body);
    //     // su dung ham ff.rename de di chuyen
    //     try {
    //         await fs.rename(req.file.path, './public/uploads/' + req.file.originalname)
    //         url_image = '/uploads/' + req.file.originalname;

    //     } catch (error) {
    //         // neu co loi thi xay ra o day 
    //     }

    // }

    res.render('sanpham/add_product', { title: 'add_Product', listtheloai: listtheloai })
}
exports.updateProduct = async (req, res, next) => {
    let msg = '';
    let objSp = await mymodel.spModel.findById(req.params.idsp);
    console.log(objSp);
    let listthe_loai = await mymodel.theloaimodel.find();

    if (req.method == 'POST') {
        let objSP = new mymodel.spModel();
        objSP.image = req.file.filename;
        objSP.title = req.body.title;
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.quantity = req.body.quantity;
        objSP.content = req.body.content;
        objSP.the_loai = req.body.theloai;
        objSP._id = req.params.idsp;
        try {
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await mymodel.spModel.findByIdAndUpdate({ _id: req.params.idsp }, objSP);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }

    }

    res.render('sanpham/update_pr', { title: 'updateProduct', msg: msg, objSp: objSp, listTheLoai: listthe_loai })
}
exports.chitietProduct = async (req, res, next) => {
    let msg = '';
    let objSp = await mymodel.spModel.findById(req.params.idsp);
    console.log(objSp);
    let listthe_loai = await mymodel.theloaimodel.findOne({ _id: objSp.the_loai });
    console.log(listthe_loai);

    
    // if (req.method == 'POST') {
    //     let objSP = new mymodel.spModel();
    //     objSP.image = req.body.image;
    //     objSP.title = req.body.title;
    //     objSP.name = req.body.name;
    //     objSP.price = req.body.price;
    //     objSP.content = req.body.content;
    //     objSP.the_loai = req.body.theloai;
    //     objSP._id = req.params.idsp;
    //     try {
    //         // update dữ liệu
    //         // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
    //         await mymodel.spModel.findByIdAndUpdate({ _id: req.params.idsp }, objSP);

    //         console.log("Đã ghi thành công");
    //         msg = 'Đã ghi thành công';
    //     } catch (err) {
    //         console.log(err);
    //         msg = 'Lỗi ' + err.message;
    //     }

    // }


    res.render('sanpham/chitiet', { title: 'chitiet', msg: msg, objSp: objSp, listthe_loai: listthe_loai })

}

exports.deleteproduct = async (req, res, next) => {
    let mssg = '';
    try {
        let id = req.params.id;
        var product_delete = await mymodel.spModel.findByIdAndDelete(id);
        if (!product_delete) {
            mssg = "that bai";
            console.log(mssg);
        } else {
            mssg: " da xoa";
            res.redirect('/product/product');

        }

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

exports.Theloai = async (req, res, next) => {


    var list = await mymodel.theloaimodel.find().sort();



    res.render('sanpham/theloai', { title: 'Category', theloai: list })
}
exports.addtheloai = async (req, res, next) => {

    let objSp = await mymodel.theloaimodel();

    if (req.method == 'POST') {
       
      
        objSp.name = req.body.name;
        try {

            let new_sp = await objSp.save();
            console.log(new_sp);
            msg = "da them thanh cong "
        } catch (error) {
            console.log(error);

        }

    }
   

    res.render('sanpham/add_theloai', { title: 'add_Product', listtheloai: objSp })
}

exports.deletetheloai = async (req, res, next) => {
    let mssg = '';
    try {
        let id = req.params.id;
        var product_delete = await mymodel.theloaimodel.findByIdAndDelete(id);
        if (!product_delete) {
            mssg = "that bai";
            console.log(mssg);
        } else {
            mssg: " da xoa";
            res.redirect('/product/theloai');

        }

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}
exports.updatetheloai = async (req, res, next) => {
    let msg = '';
    let objSp = await mymodel.theloaimodel.findById(req.params.idtl);
    console.log(objSp);
    if (req.method == 'POST') {
        let objSP = new mymodel.theloaimodel();
        objSP.name = req.body.name;
        objSP._id = req.params.idtl;
        try {
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await mymodel.theloaimodel.findByIdAndUpdate({ _id: req.params.idtl }, objSP);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }
    }
    res.render('sanpham/update_tl', { title: 'updateCategories', msg: msg , objSp:objSp })
}

exports.locSP = async(req,res,next)=>{


    var sp = await mymodel.spModel.find({the_loai:req.body.loc})
    .populate('the_loai')// ten cot tham chieu 

    ;
console.log(sp);

let listthe_loai = await mymodel.theloaimodel.find();

res.render('sanpham/product', { title: 'Product', product: sp,listtheloai:listthe_loai})

}
exports.TimSP = async(req,res,next)=>{


    var sp = await mymodel.spModel.find({title:req.body.title})
    .populate('the_loai')// ten cot tham chieu 

    ;
console.log(sp);

let listthe_loai = await mymodel.theloaimodel.find();

res.render('sanpham/product', { title: 'Product', product: sp,listtheloai:listthe_loai})

}
