import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "../backend/db/db.js";
import "dotenv/config.js";
import cookieparser from "cookie-parser";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/firestore";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { routes } from "./src/routes/index.js";
const app = express();

dotenv.config();

connectDb();
app.use(cors());
app.use(cookieparser());

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;
const measurementId = process.env.FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("app started");
});
