const { error } = require('console');
const UserModel = require('../models/model.model');


exports.listUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach user"
    }
    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }

    let list = [];
    try {
        list = await UserModel.userModel.find(dieu_kien);
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


        let objPro = new UserModel.userModel();
        // if(objPro != null){
        objPro.image = req.body.image;
        // objPro.fullname = req.body.fullname;
        objPro.username = req.body.username;
        objPro.passwd = req.body.passwd;
        objPro.email = req.body.email;
        objPro.phanquyen = "User"

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

        await UserModel.userModel.findByIdAndDelete({ _id: req.params.id });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}
exports.loginUser = async (req, next, res) => {
    let dataR = {
        status: 1,
        msg: "login"
    }
    let msg = '';
    let msg1 = '';
    if (req.method == "POST") {
        console.log(req.body);
        try {
            let objUser = await UserModel.userModel.findOne({ username: req.body.username });
            console.log(objUser);
            if (objUser != null) {
                //lấy được thông tìn tài khoản =>> ktra pass ửod
                if (objUser.passwd == req.body.passwd && objUser.role == "Admin") {
                    //đúng thông tin tài khoản, đăng nhập thành công
                    //lưu thông tin vào session
                    req.session.userLogin = objUser;
                    console.log(req.session.userLogin);
                    return res.redirect('/');
                } else if (objUser.passwd == req.body.passwd && objUser.role == "User") {
                    msg1 = "Bạn không có quyền truy cập"
                } else {
                    msg = ("Vui lòng kiểm tra lại mật khẩu");
                }
            } else {
                msg = "Tài khoản không tồn tại"
            }

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR);
}

exports.updateUsers = async (req,res,next)=>{
    let data = {
        status: 1,
        msg: "update"
    }

    if(req.method =='PUT'){

    
        try{
            await UserModel.userModel.updateOne({_id:req.params.iduser},
                {$set: {username:  req.body.username, 
                    passwd:  req.body.passwd,
                    fullname: req.body.fullname,
                    email:req.body.email,
                    phanquyen : req.body.phanquyen}});
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
        list = await UserModel.userModel.findById(req.params.iduser);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}