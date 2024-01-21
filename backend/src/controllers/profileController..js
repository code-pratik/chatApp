import multer from "multer"
import { sendResponse, sendResponseError } from "../utils/errorHandlers.js"
import {resConstants} from "../constants/errorMessages.js"
import { User } from "../Models/userModel.js"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/userImages')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' +file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })
  

export const createUserProfile = async(req,res) =>{
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({_id:id},{profileimg:req.file.path},{new:true})
    sendResponse(res,200,user,resConstants.UPDATED_SUCCESSFULLY)
  } catch (error) {
    console.log(error)
    sendResponseError(res,400,resConstants.ERROR_UPLOADING_IMAGE)
  }
}