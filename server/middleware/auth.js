import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Verifies the JWT sent in the Authorization header and attaches the
// logged-in user to req.user for downstream routes to use.
export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')

      if (!req.user) {
        return res.status(401).json({ message: 'User not found. Token invalid.' })
      }

      return next()
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed.' })
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token provided.' })
}

// Must run after `protect`. Blocks the request unless the user is an admin.
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  return res.status(403).json({ message: 'Not authorized as an admin.' })
}
