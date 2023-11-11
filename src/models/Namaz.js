import mongoose  from "mongoose";

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const namazSchema = new Schema(
     {
          salah:{type:String, required:true},
          id:{type:String ,required:true},  
          name:{type:String ,required:true},    
          last:{type:String,required:true},
          prof:{type:String,required:true},       
     },
     {timestamps:true}
)

module.exports =
    mongoose.models.Namaz || mongoose.model('Namaz', namazSchema);