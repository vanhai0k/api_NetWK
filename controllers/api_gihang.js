const GiohangModel = require('../models/model.model');


exports.listUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Gio hang"
    }
    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    // let list = []
    // try {
    //     list = await MyModel.commentModel.find(dieu_kien).populate("id_user");
    //     dataR.data = list;
    // }

    // let dieu_kien =null;
    // if(typeof(req.query.title)!='undefined'){
    //     let title =req.query.title;
    //     dieu_kien={title:title};
    //     console.log(dieu_kien);
    // }

    let list = [];
    try {
        list = await GiohangModel.giohangModel.find(dieu_kien).populate("id_user").populate("id_product");
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.AddUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Them thanh cong"
    }

    if (req.method == 'POST') {


        let objPro = new GiohangModel.giohangModel();
        // if(objPro != null){
            objPro.image = req.body.image;
            objPro.title = req.body.title;
            objPro.pricegh = req.body.pricegh;
            objPro.quantity = req.body.quantity;
            objPro.thanhtien = req.body.thanhtien;
            objPro.date = new Date();
            objPro.id_user = req.body.id_user;
            objPro.id_product  = req.body.id_product;
        // }else{
        //     console.log("Da co tai khoan");
        // }
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

exports.deleteUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Xoa thanh cong"
    }

    try {

        await GiohangModel.giohangModel.findByIdAndDelete({ _id: req.params.id });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.updateUsers = async (req,res,next)=>{
    let data = {
        status: 1,
        msg: "update"
    }

    if(req.method =='PUT'){

    
        try{
            await GiohangModel.giohangModel.updateOne({_id:req.params.iduser},
                {$set: {
                    image : req.body.image,
                     title : req.body.title,
                     pricegh : req.body.pricegh,
                     quantity : req.body.quantity,
                     thanhtien : req.body.thanhtien,
                     date:  new Date(),
                }});
            console.log(data);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            data.msg = err.message;
        }
 
    }
    res.json(data)

}
exports.listUsersUP = async (req,res,next) =>{
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
        list = await GiohangModel.giohangModel.findById(req.params.iduser);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}