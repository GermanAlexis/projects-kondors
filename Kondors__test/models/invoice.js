const { Schema, model, SchemaTypes } = require('mongoose');

const invoiceSchema = Schema({
    id_invoice: {
    type: Number,
    required: true,
    unique: true
  },
  date_invoice: {
    type: String,
    required: false
  },
  total_sold: {
    type: Number,
    required: false,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'Users',
  },
  products: {
    type: [{
      quantity_sold: {
        type: Number,
        required: true,
      },
      product: {
        type: SchemaTypes.ObjectId,
        ref: 'Products',
      }
      }
    ],
    required: true
  }
});

invoiceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.iid = _id;
  return object;
});

module.exports = model('Invoices', invoiceSchema);
