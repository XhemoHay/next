import mongoose  from "mongoose";

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const studentSchema = new Schema({
     name:{
          type: String,
          required: true,
     },
     last:{
          type: String,
          required: true,
     },
     klasa:{
          type: String,
          required: true,
          default:"1a"
     },
}, {timestamps:true})

module.exports =
    mongoose.models.Student || mongoose.model('Student', studentSchema);