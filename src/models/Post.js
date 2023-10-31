import mongoose  from "mongoose";

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const postSchema = new Schema({
     name:{
          type: String,
          unique: false,
          required: true,
     },
     last:{
          type: String,
          unique: false,
          required: false,
     }
}, {timestamps:true})

// export default mongoose.model("Post", postSchema)
module.exports =
    mongoose.models.Post || mongoose.model('Post', postSchema);
