import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    // Human-readable slug, matches the ids used in the Phase 1 frontend mock data
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['hydration', 'brightening', 'barrier', 'exfoliation', 'spf'],
    },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    reviews: { type: Number, required: true, default: 0 },
    size: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    image: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0, min: 0 },
    user: {
      // admin who created the product
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

const Product = mongoose.model('Product', productSchema)

export default Product
