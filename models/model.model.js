var db = require('./db');
const productSchema = new db.mongoose.Schema({
    image: { type: String, require: true },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    size: { type: String, require: true },
    datestart: { type: Date, require: true },
    status: { type: String, require: true },
    xuatsu: { type: String, require: true },
    phongcach: { type: String, require: true },
    infomation: { type: String, require: true },
},
{
    collection:'product' // xac dinh ten bang
}
);
const binhluanSchema = new db.mongoose.Schema({
    // idproduct : {type: db.mongoose.Schema.Types.ObjectId, required: false, ref: 'productModel'},
    id_product: {type: db.mongoose.Schema.Types.ObjectId,ref:'productModel'},
    id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    comment: {type: String, required:true}
},{
    collection: 'binhluan'
});
const userSchema = new db.mongoose.Schema(
    {
        // doi tuong dinh nghia cau truc cua model
        image: {type: String, require:true},
        username: {type:String, require:true},
        passwd: {type:String, require:true},
        email: {type:String, require:true},
        phanquyen: {type:String,required:true},

    },
    {
        collection: 'user' // xac dinh ten colection trong csdl
    }
); 

const giohangSchema = new db.mongoose.Schema({
    image: { type: String, require: true },
    title: { type: String, require: true },
    pricegh: { type: Number, require: true },
    quantity: { type: Number, require: true },
    thanhtien: { type: Number, require: true },
    date:{type:String,required:true}, 
    // moi them
    id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},   
    id_product: {type: db.mongoose.Schema.Types.ObjectId,ref:'productModel'},
},
{
    collection:'giohang' // xac dinh ten bang
}
);
const sanphamMuaSchema = new db.mongoose.Schema({
    image: { type: String, require: true },
    title: { type: String, require: true },
    pricegh: { type: Number, require: true },
    quantity: { type: Number, require: true },
    thanhtien: { type: Number, require: true },
    date:{type:String,required:true},   
    trangthai:  { type: String, require: true },   
    size:  { type: String, require: true },  
},
{
    collection:'sanphamMua' // xac dinh ten bang
}
);

const messageSchema = new db.mongoose.Schema({
    content: { type: String, require: true },
    timestamp: { type: Date, default: Date.now },
    id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},   
  },
  {
    collection: "message", // xac dinh ten colection trong csdl
  });

let binhluanModel = db.mongoose.model('binhluanModel', binhluanSchema);
let productModel = db.mongoose.model('productModel', productSchema);
let userModel = db.mongoose.model('userModel', userSchema);
let giohangModel = db.mongoose.model('giohangModel', giohangSchema);
let sanphamMuaModel = db.mongoose.model('sanphamMuaModel', sanphamMuaSchema);
let messageModel = db.mongoose.model("messageModel", messageSchema);

module.exports = {
    productModel, binhluanModel, userModel,giohangModel,sanphamMuaModel,
    messageModel
}