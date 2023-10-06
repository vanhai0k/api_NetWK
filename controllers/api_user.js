const { error } = require('console');
const UserModel = require('../models/model.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

        // let ovjproduct = await UserModel.userModel.findOne({username})
        if(!ovjproduct){
            res.status("Trung ten tai khoan");
        }
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
exports.reg = async (req, res, next) => {
    try {
  const { username, passwd, image,email,phanquyen } = req.body;

  // Kiểm tra xem tên người dùng đã tồn tại chưa
  const existingUser = await UserModel.userModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(passwd, 10);

  // Tạo người dùng mới
  const user = new UserModel.userModel({ username, passwd: hashedPassword, image,email,phanquyen });
  await user.save();

  res.status(201).json({ message: 'Đăng ký thành công' });
} catch (error) {
  console.error('Đăng ký thất bại:', error);
  res.status(500).json({ message: 'Đăng ký thất bại' });
}

}


