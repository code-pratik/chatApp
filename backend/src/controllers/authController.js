import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";
import { sendResponse, sendResponseError } from "../utils/errorHandlers.js";
import { resConstants } from "../constants/errorMessages.js";

export const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNo } = req.body;
    if ((await User.findOne({ email: email })) !== null) {
      return res.status(409).json({ error: "Email Taken!" });
    }

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const userData = {
      firstName,
      lastName,
      phoneNo,
      email: email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    await newUser.save();

    sendResponse(res, 201, email, resConstants.CREATED_SUCCESSFULLY);
  } catch (err) {
    sendResponseError(res, 500, resConstants.SIGNUP_ERROR);
  }
};

export const login = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return sendResponseError(res, 404, "User " + resConstants.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!isPasswordValid) {
      return sendResponseError(res, 401, resConstants.UNAUTHORIZED);
    }

    const tokenPayload = {
      email: userData.email,
      id: userData.id,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };

    const accessToken = await jwt.sign(
      tokenPayload,
      process.env.JWTPRIVATEKEY,
      {
        algorithm: "HS256",
      }
    );

    res.header("Authorization", `Bearer ${accessToken}`);

    const { password, ...otherData } = userData.toObject();

    sendResponse(
      res,
      200,
      { ...otherData },
      resConstants.LOGGED_IN_SUCCESSFULLY
    );
  } catch (err) {
    sendResponseError(res, 500, resConstants.LOGIN_ERROR);
  }
};
