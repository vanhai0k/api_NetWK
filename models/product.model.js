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
    idcomment: {type: db.mongoose.Schema.Types.ObjectId,ref:'binhluanModel'}

},
{
    collection:'product' // xac dinh ten bang
}
);
const binhluanSchema = new db.mongoose.Schema({
    // idproduct : {type: db.mongoose.Schema.Types.ObjectId, required: false, ref: 'productModel'},
    idproduct: {type: String, required:false},
    iduser: {type: String, required:false},
    comment: {type: String, required:false}
},{
    collection: 'binhluan'
});

let binhluanModel = db.mongoose.model('binhluanModel', binhluanSchema);
let productModel = db.mongoose.model('productModel', productSchema);

module.exports = {
    productModel, binhluanModel
}