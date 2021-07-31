const { Router } = require('express');
const { check } = require('express-validator');
const {
    getInvoices,
    createInvoice ,
    getByIdInvoce,
    filterInvoice
} = require('../controllers/invoices');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getInvoices);
router.post(
  '/',
  createInvoice 
);
router.post(
  '/filter',
  filterInvoice 
);
router.get(
  '/:id',
  getByIdInvoce
);

module.exports = router;