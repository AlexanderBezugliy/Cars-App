//userController
import User from "../models/User.js";
import Car from "../models/Car.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Generate JWT Token
const generateToken = ({ userId }) => {
    const payload = userId;
    
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// Registration User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: "Fill all the fields..." })
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        // const token = generateToken(user._id.toString());
        const token = generateToken({ userId: user._id.toString() });

        res.json({ success: true, token });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

// Log - in User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.json({ success: false, message: "User already exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const token = generateToken({ userId: user._id.toString() });

        res.json({ success: true, token });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

// Get User Data using Token (JWT)
export const getUserData = async (req, res) => {
    try {
        const { user } = req;

        res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

// Get All Cars for the Frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvaliable: true })

        res.json({ success: true, cars })

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}