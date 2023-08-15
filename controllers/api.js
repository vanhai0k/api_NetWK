const ProModel = require('../models/model.model');

exports.listProduct = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach san pham"
    }
    let dieu_kien =null;
    if(typeof(req.query.title)!='undefined'){
        let title =req.query.title;
        dieu_kien={title:title};
        console.log(dieu_kien);
    }
    let list = [];
    try {
        list = await ProModel.productModel.find(dieu_kien);
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.listProductUP = async (req,res,next) =>{
    let dataR = {
        msg: "list"
    }

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await ProModel.productModel.findById(req.params.idproduct);
        dataR.data = list;
    }
    catch (err) {
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
        // objPro.datestart = req.body.datestart;
        // objPro.status = req.body.status;
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
    let dieu_kien =null;
    if(typeof(req.query.id_product)!='undefined'){
        let id_product =req.query.id_product;
        dieu_kien={id_product:id_product};
        console.log(dieu_kien);
    }

    let objComic = await ProModel.productModel.findById(  req.params.idproduct  );
    let objComment = await ProModel.binhluanModel.find(dieu_kien)
    console.log(objComment);
    console.log("comment"+objComic);

    try {

        await ProModel.productModel.findByIdAndDelete({ _id: req.params.idproduct });
        await ProModel.productModel.deleteMany({id_product:req.params.idproduct});

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
                    //  datestart : req.body.datestart,
                    //  status : req.body.status,
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




