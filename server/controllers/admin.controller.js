import { Admin } from "../models/admins.model.js";
import { Client } from "../models/clients.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from 'bcryptjs'



export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, cin, gender, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      phone, 
      cin,
      gender,
      password: hashedPassword,
    })
    const { password: _, ...adminWithoutPassword } = admin
    
    res.status(201).json({ message: "User registred successfully", admin: adminWithoutPassword });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registring user", error: err.message });
  }
}

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).lean();
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const { password: _, ...adminWithoutPassword } = admin

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "Login successful",
      admin: adminWithoutPassword,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const logoutOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id: adminId } = req.user;
    const adminData = await Admin.findById(adminId, { password: 0 });

    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin: adminData });
  } catch (err) {
    res.status(500).json({ message: "Error getting user", error: err.message });
  }
}


export const updateAdmin = async (req, res) => {
  try {
    const { userId } = req.params
    const update = req.body
    const allowedToUpdate = ["firstName", "lastName", "phone", "cin", "gender"]

    const isAllowed = Object.keys(update).every(key => allowedToUpdate.includes(key))

    if (!isAllowed) {
      return res.status(400).json({ message: "Invalid Item to update" });
    }
    const admin = await Admin.findByIdAndUpdate(
      userId,
      update,
      { new: true, runValidators: true }
    ).select('-password')

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }
    res.status(200).json({ message: "Admin updated successfully", admin: admin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting users", error: err.message })
  }
}


export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select("-password").lean();
    res.status(200).json({ message: "Clients found", clients: clients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};