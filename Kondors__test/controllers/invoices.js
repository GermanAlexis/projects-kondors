const moment = require('moment'); 
const Invoice = require('../models/invoice');
const Product = require('../models/product');


const getInvoices = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [invoice, total] = await Promise.all([
    Invoice.find()
      .populate('products.product', 'name_product price_sale')
      .populate('user', 'identification name lastName')
      .skip(desde)
      .limit(5),
    Invoice.countDocuments(),
  ]);

  res.json({
    Ok: true,
    msg: 'Todas las facturas',
    invoices: invoice,
    total,
  });
};

const getByIdInvoce = async (req, res) => {
  const id = req.params.id

  try {
    
    const invoice = await Invoice.findById(id)
    .populate('product', 'name_product price_sale')
    .populate('user', 'name lastaName');
      
    res.status(200).json({
    Ok: true,
    msg: 'Factura Encontrada',
    invoice,
    });

  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: `hay un error ver console`
    })
  }
};

const consultProducts = async (products) => {
  var holder = {};
  products.forEach(element => {
    if (holder.hasOwnProperty(element.product)) {
      holder[element.product] = holder[element.product] + element.quantity_sold;
    } else {
      holder[element.product] = element.quantity_sold;
    }
  });
  var obj2 = [];
  for (var prop in holder) {
    obj2.push({ product: prop, quantity_sold: holder[prop] });
  }
  const idProduct = obj2.map(element =>  element.product )
  const result =  await Product.find({_id: {"$in":  idProduct } })
 
  return result
}

const saveProduct = async (product) => {
     const prodcurUpdate = await Product.findByIdAndUpdate(product._id, product, { new: true });
     console.log(prodcurUpdate);
}

const createInvoice = async (req, res) => {
  const { id_invoice, products } = req.body;

  try {
    const invoiceExist = await Invoice.findOne({ id_invoice });

    if (invoiceExist) {
      return res.status(400).json({
        ok: false,
        mgs: 'the invoice exist',
      });
    }
    const resultproduct = await consultProducts(products)
    if(resultproduct.length > 0){
      const invoiceCurrent = new Invoice(req.body);
      var  total = 0
      console.log(resultproduct) 
      resultproduct.forEach(element => {
        for (const key in products) {
          if(products[key]['product'] == element._id){
            if(element.inventory_quantity >= products[key]['quantity_sold']) {
                element.inventory_quantity = element.inventory_quantity - products[key]['quantity_sold'];
                 total = total + (element.price_sale * products[key]['quantity_sold'])
              } else {
                res.status(401).json({
                    ok: false,
                    mgs:`El inventario no cuenta con la cantidad digitada ${products[key]['quantity_sold']}`,
                  });
              }
          }
        }
        saveProduct(element)
     })
     
     invoiceCurrent.total_sold = total
     invoiceCurrent.date_invoice = moment().format('YYYY/MM/DD HH:mm:ss')

     const invoiceDB = await invoiceCurrent.save()
      
     res.status(201).json({
      ok: true,
      mgs:`factura guardada con exito`,
      invoce: invoiceDB
    });
      } else {
        res.status(400).json({
          ok: false,
          msg: 'Producto no encontrado',
        })
      }
      
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminsitrador',
    });
  }
};

const filterInvoice = async (req, res) => {
 
    const fechaInicial = req.body.startDate; // ejemplo: '2019/03/26'
    const fechaFinal = req.body.endDate

     const filter  =   await Invoice.find({
      date_invoice: {
        $gte: fechaInicial,
        $lte: fechaFinal
      }
    }).populate('user', 'identification');

     if(filter.length === []){

      return res.status(400).json({
        Ok: false,
        msg: 'Fecha no Encontrada',
        })

     }else {
      res.status(200).json({
        Ok: true,
        msg: 'Factura Encontrada',
        filter,
        })
     }
  

}

module.exports = {
    getInvoices,
    getByIdInvoce,
    createInvoice,
    filterInvoice
  };