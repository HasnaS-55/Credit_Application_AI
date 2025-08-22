import { Client } from "../models/clients.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";

export const registerClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      cin,
      gender,
      location,
      zipCode,
      password,
      confirmPassword,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await Client.create({
      firstName,
      lastName,
      email,
      phone,
      cin,
      gender,
      location,
      zipCode,
      password: hashedPassword,
    });
    const { password: _, ...clientWithoutPassword } = client;

    res
      .status(201)
      .json({ message: "User registred successfully", client: clientWithoutPassword });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registring user", error: err.message });
  }
};

export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ email }).lean()
    if (!client) {
      return res.status(401).json({ message: "Invalide credentials" });
    }
    const isValide = await bcrypt.compare(password, client.password);
    if (!isValide) {
      return res.status(401).json({ message: "Invalide credentials" });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    })

    const {password:_, ...clientWithoutPassword }= client
    res.status(200).json({
      message: "Login successful",
      Client: clientWithoutPassword,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message })
  }
};


export const logoutClient = (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error logging out", error: err.message })
    }
}

export const updateClient = async (req, res) => {
    try {
        const id = req.params
        
    } catch (err) {
        
    }
}

export const getClient = async (req, res) => {
    try {
        const { id: clientId } = req.user
        const clientData = await Client.findById(clientId, {password: 0}).lean()
        if (!clientData) {
            return res.status(404).json({ message: "Client profile not found"})
        }
        res.status(200).json({ client: clientData })
    } catch (err) {
        res.status(500).json({ message: "Error getting user", error: err.message })
    }
}


export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().select('-password').lean()
        res.status(200).json({message: "Clients found", clients: clients})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
