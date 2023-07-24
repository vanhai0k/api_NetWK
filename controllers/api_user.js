const { error } = require('console');
const UserModel = require('../models/user.model');
const loginUserService = require('../service/UserService')


exports.listUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach user"
    }
    let list = [];
    try {
        list = await UserModel.userModel.find();
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
exports.lisetComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    let list = [];
    try {
        list = await UserModel.binhluanModel.find();
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);

}

exports.postComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Post comment"
    }

    if (req.method == 'POST') {
        let obj = UserModel.binhluanModel();

        obj.iduser = req.body.user;
        obj.comment = req.body.comment;

        try {
            let new_commnent = await obj.save();

            console.log(new_commnent);
            console.log("Post comment");
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + error.message;
        }
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