import express from 'express'
import { getUserProfile, loginUser, registerUser, updateUserProfile, uploadFile } from '../controller/authController.js'
import { protect } from '../middleware/AuthMiddleware.js'
import { upload } from '../middleware/UploadMIddleware.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',protect, getUserProfile),
router.put('/profile',protect,updateUserProfile)

router.post('/upload-image',upload.single('image'),uploadFile)



export default router