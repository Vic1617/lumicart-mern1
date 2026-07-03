import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  markOrderAsPaid,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // every order route requires a logged-in user

router.post('/', createOrder)
router.get('/myorders', getMyOrders)
router.get('/', admin, getAllOrders)
router.get('/:id', getOrderById)
router.put('/:id/pay', markOrderAsPaid)
router.put('/:id/status', admin, updateOrderStatus)

export default router
