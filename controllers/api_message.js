const Message = require("../models/model.model")

exports.lisetComment = async (req,res,next) =>{
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user};
        console.log(dieu_kien);
    }

    let list = [];
    try {
        list = await Message.messageModel.find(dieu_kien).populate("id_user")
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);

}
exports.listCommentUP = async (req,res,next) =>{
    let dataR = {
        msg: "list"
    }    

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }

    let list = []
    try {
        list = await Message.messageModel.findById(req.params.idmessage);
        dataR.data = list;
        // dataR.data = listU;
    }
    catch (err) {
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
        let obj = new Message.messageModel();

        obj.id_user = req.body.id_user;
        obj.content  = req.body.content;

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

    let objUser = await ProModel.binhluanModel.findById(  req.params.idcomment  );
    console.log( objUser);

    try {

        await ProModel.binhluanModel.findByIdAndDelete({ _id: req.params.idcomment });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}
exports.locMessage = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach comment"
    }

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }
    

    let list = [];
    const id = req.params.id;
    const content = req.params.content
    try {
        list = await Message.messageModel.findById(id);
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);

}