const mongoose=require('mongoose');

const RegistrationSchema=mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    prenumeration:{
        type:Boolean,
        required:true
    },
    versionKey:false
})
module.exports=mongoose.model('registration',RegistrationSchema)