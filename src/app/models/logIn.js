const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const logIn = new Schema({
    // author: ObjectId,
    _id:{type:Number,},
    fullname: {type:String,required:true},
    email: {type:String,maxLength:600,required:true},
    password: {type:String,required:true},
    gender:{type:String},
    date:{type:String},
    month:{type:String},
    year:{type:String},
  },
  {
    _id:false,
    timestamps:true,
  },
); 



logIn.plugin(AutoIncrement);
module.exports = mongoose.model('logininforms', logIn);
