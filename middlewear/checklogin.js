exports.yeucaudangnhap= (req,res,next)=>{
    if (req.session.userLogin) {
        //có tồn tại thông tin user đã đăng nhập
        next();
    } else{
        res.redirect('/user/login/');
    }
}

exports.khongyeucaud_n=(req,res,next)=>{
    if (!req.session.userLogin) {
        next();
    }else{
        res.redirect('/user/')
    }
}