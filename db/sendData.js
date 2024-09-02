import { dataModel } from "../models/data.models.js";
import { sendDataToLambda } from "../utils/lambda.js";


const sendDataToDB = async(DBdata)=>{
    console.log(DBdata);
  await dataModel.create(DBdata)
        .then(doc => {
          console.log('Document created:', doc);
         return doc
        })
        .catch(err => {
          console.error('Error creating document:', err);
        });
}

export {
    sendDataToDB
}