const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')

const validation = require('../../utils/middlewares/validationHandler')

const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
} = require('../../utils/schemas/products')

const productsService = new ProductsService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query
  
  try {
    const products = await productsService.getProducts({ tags })

    res.status(200).render('products', { products })
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params
  
  try {
    const product = await productsService.getProduct({ productId })

    res.status(200).render('products', { product })
  } catch (err) {
    next(err)
  }
})

router.post('/', validation(createProductSchema), async (req, res, next) => {
  const { body: product } = req
  
  try {
    const createProduct = await productsService.createProduct({ product })

    res.status(201).render('products', { createProduct })
  } catch (err) {
    next(err)
  }
})

router.put(
  '/:productId',
  validation({ productId: productIdSchema }, "params"),
  validation(updateProductSchema),
  async (req, res, next) => {
    const { productId } = req.params
    const { body: product } = req
    
    try {
      const updateProduct = await productsService.updateProduct({ productId, product })

      res.status(200).render('products', { updateProduct })
    } catch (err) {
      next(err)
    }
  })

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params
  
  try {
    const product = await productsService.updateProduct({ productId })

    res.status(200).render('products', { product })
  } catch (err) {
    next(err)
  }
})

module.exports = router