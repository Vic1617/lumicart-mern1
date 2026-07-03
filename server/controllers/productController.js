import Product from '../models/Product.js'

// @route  GET /api/products
// @desc   Get all products. Supports ?search= and ?category= query params
// @access Public
export const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query

    const filter = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } },
      ]
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// @route  GET /api/products/:id
// @access Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// @route  POST /api/products
// @access Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const {
      slug,
      name,
      category,
      price,
      size,
      tagline,
      description,
      ingredients,
      image,
      countInStock,
    } = req.body

    if (!slug || !name || !category || price === undefined || !image) {
      return res.status(400).json({
        message: 'slug, name, category, price, and image are required.',
      })
    }

    const product = await Product.create({
      slug,
      name,
      category,
      price,
      size,
      tagline,
      description,
      ingredients,
      image,
      countInStock,
      user: req.user._id,
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

// @route  PUT /api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    const fields = [
      'name',
      'category',
      'price',
      'size',
      'tagline',
      'description',
      'ingredients',
      'image',
      'countInStock',
      'rating',
      'reviews',
    ]

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field]
      }
    })

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

// @route  DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }
    await product.deleteOne()
    res.json({ message: 'Product removed.' })
  } catch (error) {
    next(error)
  }
}
