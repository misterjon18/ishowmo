import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJwt = (user) => {
  console.log(user);
  return jwt.sign(user, process.env.jwtSecret, { expiresIn: "2h" });
};
export { generateJwt };
