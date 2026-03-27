import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import type { ISafeUser } from "../models/User.model";

async function AuthService(
  email: string,
  password: string,
): Promise<{ token: string; user: ISafeUser }> {
  /* 
        find email in the database with email that's been passed down
        compare password with the hashed password in the database
        if password is match then generate token and send it the controller */
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const safeUser: ISafeUser = {
    id: user._id.toString(),
    email: user.email,
  };

  return {
    token,
    user: safeUser,
  };
}
export { AuthService };
