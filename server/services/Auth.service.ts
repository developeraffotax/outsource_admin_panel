import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import type { ISafeUser, UserRole } from "../models/User.model.js";

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

  const normalizedEmail = user.email.trim().toLowerCase();
  const isReservedAdmin = normalizedEmail === "admin@gmail.com";
  const role: UserRole =
    user.role === "admin" || isReservedAdmin ? "admin" : "user";

  // Keep legacy records consistent so admin menu/routing works after login.
  if (isReservedAdmin && user.role !== "admin") {
    user.role = "admin";
    await user.save();
  }

  const token = jwt.sign(
    { id: user._id.toString(), role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );

  const safeUser: ISafeUser = {
    id: user._id.toString(),
    email: user.email,
    role,
  };

  return {
    token,
    user: safeUser,
  };
}
export { AuthService };
