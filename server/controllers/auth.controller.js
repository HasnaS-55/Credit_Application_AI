import { User } from "../models/auth.models.js";
import { hashPassword, comparePassword } from "../utils/password.bcrypt.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = (req, res) => {
  try {
    const { firstName, LastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesnt match" });
    }
    const hashedPassword = hashPassword(password);
    const user = User.create({
      firstName,
      LastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registred successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registring user", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = res.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({
          message:
            "You are not admin to login, contact the admins to add you as admin",
        });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const { password: _, ...userWithoutPassword } = user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res
      .status(200)
      .json({
        message: "Login successful",
        user: userWithoutPassword,
        token: token,
      });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
}



export const logoutUser = (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (err) {
        res
      .status(500)
      .json({ message: "Error logging out", error: err.message });
  }
    
}

export const getMe = async (req, res) => {
    try {
        const email = req.user.email
        const userData = await User.findOne({ email }, { password: 0 })
        
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ userData })
    } catch (err) {
        res
      .status(500)
      .json({ message: "Error getting user", error: err.message });
  }

    
}


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ }, { password: 0 })
        res.status(200).json(users)
    } catch (err) {
        res
      .status(500)
      .json({ message: "Error getting users", error: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body
        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }
        const user = await User.findByIdAndUpdate(userId, { role }, {new: true, runValidators: true}).select(-password)
        res.status(200).json({message: "User updated successfully", user })
    } catch (err) {
        res
      .status(500)
      .json({ message: "Error getting users", error: err.message })
    }
}
