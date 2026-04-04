import express from 'express'
import { adminOnly, protect } from '../middleware/AuthMiddleware.js'
import { exportTaskReport, exportUsersReport } from '../controller/reportController.js'

const router = express.Router()

router.post('/export/tasks',protect,adminOnly,exportTaskReport)
router.post('/export/users',protect,adminOnly,exportUsersReport)

export default router