const mongoose = require('mongoose');
console.log('1111');

mongoose.connect('mongodb://127.0.0.1:27017/API_NWK')
.catch((err)=>{
    console.log("Loi ket noi CSDL");
    console.log(err);
})
.finally((eee)=>{
    console.log(eee);
    console.log("Mo ket noi CSDL");
})
 module.exports={mongoose}
 console.log("zikkkk");