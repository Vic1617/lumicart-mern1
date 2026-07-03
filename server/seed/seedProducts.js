// Run with: npm run seed        (imports products)
//       or: npm run seed:destroy (wipes the products collection)

import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Product from '../models/Product.js'

dotenv.config()

const products = [
  {
    slug: 'dew-drop-serum',
    name: 'Dew Drop Hyaluronic Serum',
    category: 'hydration',
    price: 34,
    rating: 4.8,
    reviews: 612,
    size: '30ml',
    tagline: 'Water-first hydration that sits under makeup.',
    description:
      'A lightweight, five-layer hyaluronic complex that pulls moisture into skin and locks it there. Formulated without alcohol, fragrance, or essential oils.',
    ingredients: ['Hyaluronic Acid (5 molecular weights)', 'Panthenol', 'Beta-Glucan', 'Aloe Leaf Juice'],
    image: '/images/dew-serum.jpg',
    countInStock: 50,
  },
  {
    slug: 'clarity-vitamin-c',
    name: 'Clarity Vitamin C Drops',
    category: 'brightening',
    price: 42,
    rating: 4.6,
    reviews: 389,
    size: '30ml',
    tagline: '15% stabilized vitamin C, zero orange-peel smell.',
    description:
      'A stabilized L-ascorbic acid formula that fades the look of dark spots and evens tone over time, buffered with ferulic acid.',
    ingredients: ['L-Ascorbic Acid 15%', 'Ferulic Acid', 'Vitamin E', 'Sodium Hyaluronate'],
    image: '/images/vitamin-c.jpg',
    countInStock: 40,
  },
  {
    slug: 'barrier-repair-balm',
    name: 'Barrier Repair Balm',
    category: 'barrier',
    price: 29,
    rating: 4.9,
    reviews: 754,
    size: '50g',
    tagline: 'For the nights your skin needs a truce, not a routine.',
    description:
      'A ceramide-rich occlusive balm built for compromised, over-exfoliated, or wind-burned skin.',
    ingredients: ['Ceramide NP', 'Cholesterol', 'Squalane', 'Shea Butter'],
    image: '/images/cream1.jpg',
    countInStock: 35,
  },
  {
    slug: 'glass-skin-gel',
    name: 'Glass Skin Gel Moisturizer',
    category: 'hydration',
    price: 26,
    rating: 4.5,
    reviews: 291,
    size: '50ml',
    tagline: 'A cream-to-gel that finishes dewy, not greasy.',
    description:
      'Bounces between weather and skin type without ever feeling heavy. Built on a beta-glucan and glycerin base.',
    ingredients: ['Beta-Glucan', 'Glycerin', 'Niacinamide 2%', 'Centella Asiatica'],
    image: '/images/moisturiser.jpg',
    countInStock: 60,
  },
  {
    slug: 'midnight-retinal',
    name: 'Midnight Retinal Complex',
    category: 'brightening',
    price: 48,
    rating: 4.7,
    reviews: 203,
    size: '30ml',
    tagline: 'Next-gen retinaldehyde, dialed in for beginners.',
    description:
      'Retinaldehyde converts to retinoic acid faster than retinol, so results show sooner at a lower irritation cost.',
    ingredients: ['Encapsulated Retinaldehyde', 'Squalane', 'Bisabolol', 'Panthenol'],
    image: '/images/retinal-complex.jpg',
    countInStock: 25,
  },
  {
    slug: 'jelly-exfoliant',
    name: 'Jelly Resurfacing Exfoliant',
    category: 'exfoliation',
    price: 24,
    rating: 4.4,
    reviews: 178,
    size: '100ml',
    tagline: 'A rinse-off jelly with lactic acid, not grit.',
    description:
      'Chemical over physical, always. This jelly texture melts into a light foam and lifts away buildup.',
    ingredients: ['Lactic Acid 8%', 'Gluconolactone', 'Allantoin', 'Aloe Leaf Juice'],
    image: '/images/exfoliant.jpg',
    countInStock: 45,
  },
  {
    slug: 'cloud-cleanser',
    name: 'Cloud Cream Cleanser',
    category: 'barrier',
    price: 22,
    rating: 4.8,
    reviews: 501,
    size: '150ml',
    tagline: 'A cleanser that never once asks your skin to squeak.',
    description:
      'A low-pH, sulfate-free cream cleanser that removes makeup and SPF without stripping the barrier underneath it.',
    ingredients: ['Amino Acid Surfactants', 'Ceramide NP', 'Glycerin', 'Panthenol'],
    image: '/images/cloud-cream.jpg',
    countInStock: 55,
  },
  {
    slug: 'daily-shield-spf',
    name: 'Daily Shield Mineral SPF 40',
    category: 'spf',
    price: 32,
    rating: 4.6,
    reviews: 340,
    size: '50ml',
    tagline: 'Zinc-based SPF with zero white cast, promise.',
    description:
      'A mineral sunscreen micronized enough to disappear into every skin tone, with niacinamide added for extra benefit.',
    ingredients: ['Non-Nano Zinc Oxide 20%', 'Niacinamide', 'Squalane', 'Green Tea Extract'],
    image: '/images/spf.jpg',
    countInStock: 70,
  },
  {
    slug: 'overnight-recovery-mask',
    name: 'Overnight Recovery Mask',
    category: 'barrier',
    price: 36,
    rating: 4.7,
    reviews: 164,
    size: '75ml',
    tagline: 'Sleep in it. Wake up ahead of schedule.',
    description:
      'A sleeping-mask texture layered with peptides and ceramides, designed to be the last step on the nights skin needs backup.',
    ingredients: ['Peptide Complex', 'Ceramide NP', 'Squalane', 'Shea Butter'],
    image: '/images/face-mask.jpg',
    countInStock: 30,
  },
]

const importData = async () => {
  try {
    await connectDB()
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('Products imported successfully.')
    process.exit()
  } catch (error) {
    console.error(`Error importing data: ${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await connectDB()
    await Product.deleteMany()
    console.log('Products destroyed.')
    process.exit()
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-destroy') {
  destroyData()
} else {
  importData()
}
