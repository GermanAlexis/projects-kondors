const { Schema, model } = require('mongoose');

const productSchema = Schema({
  id_product: {
    type: Number,
    required: true,
    unique: true
  },
  name_product: {
    type: String,
    required: true,
    unique: true
  },
  inventory_quantity: {
    type: Number,
    required: true
  },
  price_sale: {
    type: Number,
    required: true
  },  
  price_purchase: {
    type: Number,
    required: true
  },
});

productSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.pid = _id;
  return object;
});

module.exports = model('Products', productSchema);
