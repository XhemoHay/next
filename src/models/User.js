import mongoose  from "mongoose";

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
     username:{
          type: String,
          required: true,
     },
     password:{
          type: String,
          required: true,
     },
     role:{
          type: String,
          required: true,
          default:"user"
     },
}, {timestamps:true})

module.exports =
    mongoose.models.User || mongoose.model('User', userSchema);