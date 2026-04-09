import express from 'express'
import { adminOnly, protect } from '../middleware/AuthMiddleware.js'
import { exportTaskReport, exportUsersReport } from '../controller/reportController.js'

const router = express.Router()

router.get('/export/tasks',protect,adminOnly,exportTaskReport)
router.get('/export/users',protect,adminOnly,exportUsersReport)

export default router