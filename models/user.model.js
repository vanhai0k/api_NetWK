var db = require('./db');
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





let userModel = db.mongoose.model('userModel', userSchema);
module.exports= {
    userModel,
}