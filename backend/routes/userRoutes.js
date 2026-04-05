import express from 'express'
import { adminOnly, protect } from '../middleware/AuthMiddleware.js'
import { deleteUser, getUsers, getUsersById } from '../controller/userController.js'

const router = express.Router()

router.get('/',protect,adminOnly,getUsers)
router.get('/:id',protect, getUsersById)
router.delete('/:id',protect,adminOnly,deleteUser)

export default router