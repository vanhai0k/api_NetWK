const ProModel = require('../models/model.model');

exports.listProduct = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach san pham"
    }
    let dieu_kien = null;
    if(typeof(req.query.idproduct) != 'undefined'){
        let idproduct = req.query.idproduct;
        dieu_kien = {idproduct:idproduct}
        console.log(dieu_kien);
    }

    let list = [];
    try {
        list = await ProModel.productModel.find();
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.AddPro = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Them thanh cong"
    }
    if (req.method == 'POST') {

        let objPro = new ProModel.productModel();

        objPro.image = req.body.image;
        objPro.title = req.body.title;
        objPro.price = req.body.price;
        objPro.quantity = req.body.quantity;
        objPro.size = req.body.size;
        objPro.datestart = req.body.datestart;
        objPro.status = req.body.status;
        objPro.xuatsu = req.body.xuatsu;
        objPro.phongcach = req.body.phongcach;
        objPro.infomation = req.body.infomation;

        try {
            let dataR = await objPro.save();
            console.log(dataR);
            console.log("Them thanh cong");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }

    }
    res.json(dataR);
    console.log(dataR);
}
exports.deletePro = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Xoa thanh cong"
    }

    try {

        await ProModel.productModel.findByIdAndDelete({ _id: req.params.id });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}
exports.updatePro = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Da cap nhap!!!"
    }
    if (req.method == 'PUT') {

        try {

            await ProModel.productModel.updateOne({ _id: req.params.id },
            {
                $set: {
                     image : req.body.image,
                     title : req.body.title,
                     price : req.body.price,
                     quantity : req.body.quantity,
                     size : req.body.size,
                     datestart : req.body.datestart,
                     status : req.body.status,
                     xuatsu : req.body.xuatsu,
                     phongcach : req.body.phongcach,
                     infomation : req.body.infomation,

                }
            });
            console.log(dataR);
            console.log("Cap nhap thanh cong");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR);
    console.log(dataR);
}


exports.lisetComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    let list = [];
    try {
        list = await ProModel.binhluanModel.find();
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);

}

exports.postComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Post comment"
    }

    if(req.method == 'POST'){
        let obj = ProModel.binhluanModel();

        // obj.idproduct = req.body.idproduct;
        obj.iduser = req.body.iduser;
        obj.comment = req.body.comment;

        try{
            let new_commnent = await obj.save();

            console.log(new_commnent);
            console.log("Post comment");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;
        }
    }
    res.json(dataR);
    console.log(dataR);
}

exports.deleteComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Xoa thanh cong"
    }

    try {

        await ProModel.binhluanModel.findByIdAndDelete({ _id: req.params.id });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.updateComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Da cap nhap!!!"
    }
    if (req.method == 'PUT') {

        try {

            await ProModel.binhluanModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    idproduct: req.body.idproduct,
                    iduser: req.body.iduser,
                     comment : req.body.comment

                }
            });
            console.log(dataR);
            console.log("Cap nhap thanh cong");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR);
    console.log(dataR);
}

exports.getKiemComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    const idproduct = req.params.idproduct;
    try {
        const comments = await Comment.find({idproduct});
        res.json(comments);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
    res.json(dataR);
    console.log(dataR);


}

