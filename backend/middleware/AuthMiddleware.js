import jwt from 'jsonwebtoken'
import User from '../model/User.js'


export const generateToken = (userId) =>{
    return jwt.sign({id: userId},process.env.JWT_SECRET,{expiresIn: '7h'})
}

export const protect = async (req, res, next) => {
    try {
        let token = req.cookies.Token

        if(!token){
            return res.status(401).json({message:"No Token"})
        }
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // tìm user
        req.user = await User.findById(decoded.id).select('-password')

        if (!req.user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }

        next()

    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message: 'Not authorized, token failed'
        })
    }
}

export const adminOnly = (req,res,next)=>{
    try {
        if(req.user && req.user.role === 'admin'){
            next()
        } else {
            return res.status(403).json({
                message: 'Not authorized, admin role required'
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message: 'Not authorized, role failed'
        })
    }
}