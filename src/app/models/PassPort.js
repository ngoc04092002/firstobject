const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const logIn = new Schema({
    // author: ObjectId,
    _id:{type:Number},
    fullname: {type:String,required:true},
    Image:{type:String},
    facebookId:{type:String},
    googleId:{type:String},
  },
  {
    _id:false,
    timestamps:true,
  },
); 



logIn.plugin(AutoIncrement, {id: 'GoogleId'});
module.exports = mongoose.model('ppfacebooks', logIn);
