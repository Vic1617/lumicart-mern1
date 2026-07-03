import Order from '../models/Order.js'
import User from '../models/User.js'

// @route  POST /api/orders
// @desc   Create a new order from the user's current cart, then empty the cart
// @body   { shippingAddress, paymentMethod }
// @access Private
export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return res.status(400).json({ message: 'A complete shipping address is required.' })
    }

    const user = await User.findById(req.user._id)

    if (!user.cartItems || user.cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' })
    }

    const itemsPrice = user.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 50 ? 0 : 6
    const totalPrice = itemsPrice + shippingPrice

    const order = await Order.create({
      user: user._id,
      orderItems: user.cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
      })),
      shippingAddress,
      paymentMethod: paymentMethod || 'Card on delivery',
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    // Empty the cart now that the order has been placed
    user.cartItems = []
    await user.save()

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

// @route  GET /api/orders/myorders
// @access Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

// @route  GET /api/orders/:id
// @desc   Get a single order. Owner or an admin only.
// @access Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    const isOwner = order.user._id.toString() === req.user._id.toString()
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this order.' })
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

// @route  GET /api/orders
// @access Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

// @route  PUT /api/orders/:id/status
// @desc   Update order status (processing / shipped / delivered / cancelled)
// @access Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    order.status = status || order.status

    if (status === 'delivered') {
      order.isDelivered = true
      order.deliveredAt = new Date()
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

// @route  PUT /api/orders/:id/pay
// @desc   Mark an order as paid (simple flag flip, no real payment gateway)
// @access Private
export const markOrderAsPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    const isOwner = order.user.toString() === req.user._id.toString()
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this order.' })
    }

    order.isPaid = true
    order.paidAt = new Date()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}
