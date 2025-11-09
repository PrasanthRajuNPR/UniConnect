const mongoose=require("mongoose");
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    reg_no:{
        type:String,
        required:true
    },
    selectedBranch:{
        branch:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Branch"
        },
        section:{
            type:String,
            required:true
        }
    },
    attendance:{
        type:Map,
        of:Boolean
    }
})

module.exports=mongoose.model("Student",studentSchema);
