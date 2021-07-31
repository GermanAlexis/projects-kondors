const Product = require('../models/product');

const getProducts = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [product, total] = await Promise.all([
    Product.find({}).skip(desde).limit(5),
    Product.countDocuments(),
  ]);

  res.json({
    Ok: true,
    msg: 'Todos los productos',
    products: product,
    total,
  });
};


const getByIdProduct = async (req, res) => {
  const pid = req.params.id
  try {
    
    const product = await Product.findById(pid)
      
    res.status(200).json({
    Ok: true,
    msg: 'producto Encontrado',
    product,
    });

  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: `hay un error ver console`
    })
  }
};

const createProduct = async (req, res) => {
  
    const {id_product} = req.body
    try {

    const productExist = await Product.findOne({ id_product });
    if (productExist) {
      return res.status(400).json({
        ok: false,
        mgs: 'the product exist',
      });
    }

    const product = new Product(req.body);
    const productDB = await product.save();
    res.status(201).json({
      ok: true,
      Medic: productDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminsitrador',
    });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningun product con ese id ${id}`,
      });
    }
    const changeData = {  ...req.body };

    const productUpdated = await Medic.findByIdAndUpdate(id, changeData, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      msg: ' el producto se actuliazo con exito ',
      medic: productUpdated ,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el adminsitrador',
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningun medico con ese id ${id}`,
      });
    }

    const productRemoved = await Product.findByIdAndRemove(id);
    res.status(200).json({
      ok: true,
      msg: ' el medico se elimino con exito ',
      product: productRemoved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el adminsitrador',
    });
  }
};
module.exports = {
  getProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};