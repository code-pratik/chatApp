import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, "Min length for username is 2 characters"],
    maxlength: [50, "Max length for username is 50 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, "Min length for username is 2 characters"],
    maxlength: [50, "Max length for username is 50 characters"],
  },
  profileimg: {
    type:String,
    default:"/userImages/1702631426213-Wallpaper.jpg"
  },
  phoneNo:{
    type:Number,
    required:true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
    unique: true,
    maxlength: [255, "Max length for email is 255 characters"],
  },
  password: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type:  Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

},{timestamps:true});

userSchema.pre("save", async function (next) {
  try {
    this.createdBy = this.id;
    next();
  } catch (error) {
    next(error);
  }
});
export const User = mongoose.model("User", userSchema); 

