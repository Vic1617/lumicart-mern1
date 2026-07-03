import jwt from 'jsonwebtoken'

// Creates a signed JWT containing the user's id, valid for 30 days
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
