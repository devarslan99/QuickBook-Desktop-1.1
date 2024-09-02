import mongoose , {Schema} from "mongoose";

const dataSchema = new Schema({
    password:String,
    type:String,
    data: Schema.Types.Mixed
})

export const dataModel = mongoose.model('dataModal',dataSchema);