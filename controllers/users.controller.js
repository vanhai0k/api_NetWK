const usermymodel= require('../models/model.model');


exports.Users=async(req,res,next)=>{
    
    var sp = await usermymodel.userModel.find()
    .populate('phanquyen')// ten cot tham chieu 

    ;

    let listphanquyen = await usermymodel.phanquyenModel.find();
console.log(sp);
    res.render('userr/user',{title:'User', user:sp, phanquyen:listphanquyen} )
}
exports.ResUsers=async(req,res,next)=>{

    let listphanquyen = await usermymodel.phanquyenModel.find();

    let msg="";
     
    if (req.method=="POST") {
        console.log(req.body);
        if (req.body.passwd != req.body.passwd2){
            msg='Xác Nhận không Đúng';
            return res.render('userr/res',{msg:msg});
        }
        //kiểm tra hợp lệ phần khác nesu có 

        //xủ lí lưu
        let obj= new usermymodel.userModel();
        obj.fullname=req.body.fullname;
        obj.username=req.body.username;
        obj.passwd= req.body.passwd;
        obj.phanquyen = req.body.phanquyen;
        obj.email=req.body.email;
        obj.image = req.file.filename;

        try {
            await obj.save();
            console.log("Đăng Kí Thành Công");
        } catch (error) {
            msg='Lỗi '+error.message;
        }

    }

    res.render('userr/res',{ msg:msg, listphanquyen:listphanquyen} )




}
exports.deleteuser = async (req, res, next) => {
    let msg = "";
    try {
        let id = req.params.id;
        var user_dlt = await usermymodel.userModel.findById(id) .populate('phanquyen');// ten cot tham chieu 

        

        if (user_dlt.phanquyen.name == "admin") {
            return res.send('Không thể xóa tài khoản Admin. Vui lòng nhấn phím back để quay lại');
        } else {
            var delete_user = await usermymodel.userModel.findByIdAndDelete(id);
            if (!delete_user) {
                console.log("Thất Bại");
            }
            res.redirect('/user/user');
        }
   

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.Login = async (req, res, next) => {
    let msg="";
    if (req.method=="POST") {
     console.log(req.body);
     try {
         let objU = await usermymodel.userModel.findOne({ username: req.body.username });
         console.log(objU);
 
         if (objU != null) {
             if (objU.passwd == req.body.passwd) {
                 //đăng nhập thành công 
                 req.session.userLogin= objU;
                 return res.redirect('/user/');
             }else{
                 msg="Sai Password";
             }
         }else{
             msg="Không tồn tại tài khoản";
         }
 
     } catch (error) {
         msg="Lỗi" +error.message;
     }
    }
 
    res.render('userr/login', {msg:msg})
 };

 exports.singout = async(req,res,next)=>{
    req.session.userLogin=null;
    res.redirect('/user/login')
}

exports.updateUser = async (req, res, next) => {
    let msg = '';
    let objSp = await usermymodel.userModel.findById(req.params.idsp);
    console.log(objSp);
    let listthe_loai = await usermymodel.phanquyenModel.find();

    if (req.method == 'POST') {
        let obj = new mymodel.userModel();
        obj.fullname=req.body.fullname;
        obj.username=req.body.username;
        obj.passwd= req.body.passwd;
        obj.phanquyen = req.body.phanquyen;
        obj.email=req.body.email;
        obj.image = req.file.filename;
        try {
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await usermymodel.userModel.findByIdAndUpdate({ _id: req.params.idsp }, obj);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }

    }

    res.render('userr/update_user', { title: 'updateUser', msg: msg, objSp: objSp, listuser: listthe_loai })
}

exports.locuser = async(req,res,next)=>{


    var sp = await usermymodel.userModel.find({phanquyen:req.body.locuser})
    .populate('phanquyen')// ten cot tham chieu 

    ;
console.log(sp);

let listthe_loai = await usermymodel.phanquyenModel.find();

res.render('userr/user', { title: 'User', user: sp,phanquyen:listthe_loai})

}
