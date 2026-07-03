import User from '../models/User.js'
import Product from '../models/Product.js'

// @route  GET /api/cart
// @access Private
export const getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    res.json(user.cartItems)
  } catch (error) {
    next(error)
  }
}

// @route  POST /api/cart
// @desc   Add a product to the cart, or increase qty if it's already there
// @body   { productId, qty }
// @access Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body

    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    const user = await User.findById(req.user._id)
    const existingItem = user.cartItems.find((item) => item.product.toString() === productId)

    if (existingItem) {
      existingItem.qty += Number(qty)
    } else {
      user.cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: Number(qty),
      })
    }

    await user.save()
    res.status(201).json(user.cartItems)
  } catch (error) {
    next(error)
  }
}

// @route  PUT /api/cart/:productId
// @desc   Set exact quantity for an item already in the cart
// @body   { qty }
// @access Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { qty } = req.body
    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'qty must be at least 1.' })
    }

    const user = await User.findById(req.user._id)
    const item = user.cartItems.find((i) => i.product.toString() === req.params.productId)

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart.' })
    }

    item.qty = Number(qty)
    await user.save()
    res.json(user.cartItems)
  } catch (error) {
    next(error)
  }
}

// @route  DELETE /api/cart/:productId
// @access Private
export const removeCartItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.cartItems = user.cartItems.filter(
      (i) => i.product.toString() !== req.params.productId,
    )
    await user.save()
    res.json(user.cartItems)
  } catch (error) {
    next(error)
  }
}

// @route  DELETE /api/cart
// @access Private
export const clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.cartItems = []
    await user.save()
    res.json(user.cartItems)
  } catch (error) {
    next(error)
  }
}
