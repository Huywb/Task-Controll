import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/AuthMiddleware.js'
import cookies from 'cookies'


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body
        const userExitst = await User.findOne({ email })
        if (userExitst) {
            return res.status(400).json({ message: "User aleady exist" })
        }

        let role = 'member'
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin'
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashPass,
            profileImageUrl,
            role
        })
        let token = generateToken(user._id)

        res.status(201).json({ message: "Register user successfully", data: { ...user, token } })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const isMatch = await User.findOne({ email })
        if (!isMatch) {
            return res.status(401).json({ mesage: "Invalid email or password" })
        }

        let checkPass = await bcrypt.compare(password, isMatch.password)

        if (!checkPass) {
            return res.status(401).json({ message: 'Password not correct' })
        }

        let token = generateToken(isMatch._id)

        res.cookie('Token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.status(200).json({ message: "Login success", data: { ...isMatch, token } })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ message: 'Get user profile success', data: user })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: "Cannot find user" })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)
        }

        const updateUser = await user.save()

        res.status(200).json({ message: "Update user success", data: updateUser })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file upload" })
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

    res.status(200).json({ imageUrl })
}

