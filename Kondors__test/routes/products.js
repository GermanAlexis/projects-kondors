const { Router } = require('express');
const { check } = require('express-validator');
const {
  getProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getByIdProduct);

router.post(
  '/',
  [
    check('id_product', 'identificador del producto').not().isEmpty(),   
    check('name_product', 'el nombre del producto es obligatorio').not().isEmpty(),
    check('inventory_quantity', 'cantidad en inventario es obligatorio').not().isEmpty().isNumeric(),
    check('price_sale', 'el precio de venta es obligatorio').not().isEmpty().isNumeric(),
    check('price_purchase', 'el precio de compra es obligatorio').not().isEmpty().isNumeric(),
    validateFields,
  ],
  createProduct
);
router.put(
  '/:id',
  [
    check('name_product', 'el nombre del producto es obligatorio').not().isEmpty(),
    check('inventory_quantity', 'cantidad en inventario es obligatorio').not().isEmpty().isNumeric(),
    check('price_sale', 'el precio de venta es obligatorio').not().isEmpty().isNumeric(),
    check('price_purchase', 'el precio de compra es obligatorio').not().isEmpty().isNumeric(),
    validateFields,
  ],
  updateProduct
);

router.delete('/:id', deleteProduct);

module.exports = router;