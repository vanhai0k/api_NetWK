const SanphamMua = require('../models/model.model');


exports.listUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Danh sach sp da mua"
    }
    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }


    let list = [];
    try {
        list = await SanphamMua.sanphamMuaModel.find(dieu_kien);
        dataR.data = list;

    } catch (err) {
        dataR.msg = err.message;
    }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}
const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
const day = date.getDate();

const formattedDate = `${day}/${month}/${year}`;

exports.AddUser = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Them thanh cong"
    }

    if (req.method == 'POST') {



        let objPro = new SanphamMua.sanphamMuaModel();
        // if(objPro != null){
            objPro.image = req.body.image;
            objPro.title = req.body.title;
            objPro.pricegh = req.body.pricegh;
            objPro.quantity = req.body.quantity;
            objPro.thanhtien = req.body.thanhtien;
            objPro.date = formattedDate
            objPro.trangthai = "Chờ duyệt đơn hàng";
            objPro.size = req.body.size;
            
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

        await SanphamMua.sanphamMuaModel.findByIdAndDelete({ _id: req.params.id });
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
            await SanphamMua.sanphamMuaModel.updateOne({_id:req.params.iduser},
                {$set: {
                    image : req.body.image,
                     title : req.body.title,
                     pricegh : req.body.pricegh,
                     quantity : req.body.quantity,
                     thanhtien : req.body.thanhtien,
                     date:  new Date(),
                     size: req.body.size
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
        list = await SanphamMua.sanphamMuaModel.findById(req.params.iduser);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.sumprice = async (req, res, next) => {
    try {
        const result = await SanphamMua.sanphamMuaModel.aggregate([
          { $group: { _id: null, totalAmount: { $sum: '$thanhtien' } } },
        ]);
        res.json(result[0]);
      } catch (err) {
        console.log('Lỗi khi thống kê tổng số tiền:', err);
        res.status(500).json({ error: 'Lỗi khi thống kê tổng số tiền' });
      }
}
exports.sumdate = async (req,res,next) =>{

    const { startDate, endDate } = req.query;

    const transactions = await SanphamMua.sanphamMuaModel.find({
      date: { $gte: startDate, $lte: endDate }
    });
   
    const totalAmount = transactions.reduce((total, transaction) => {
      return total + transaction.thanhtien;
    }, 0);
   
    res.status(200).json({ totalAmount });
}