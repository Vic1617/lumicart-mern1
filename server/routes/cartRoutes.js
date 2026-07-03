import express from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // every cart route requires a logged-in user

router.get('/', getCart)
router.post('/', addToCart)
router.delete('/', clearCart)
router.put('/:productId', updateCartItem)
router.delete('/:productId', removeCartItem)

export default router
