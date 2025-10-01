import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (userId, res) => {
  console.log("ENV:", process.env.NODE_ENV);
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;

};