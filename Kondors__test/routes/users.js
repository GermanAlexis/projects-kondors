const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getByIdUser
} = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getByIdUser);

router.post(
  '/',
  [
    check('date_bird', 'la fecha de nacimiento es obligatoria').not().isEmpty(),
    check('identification', 'la identificacion es obligatorio').not().isEmpty().isNumeric(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el Apellido es obligatorio').not().isEmpty(),
    check('number_phone', 'el numero de telefono es obligatorio').not().isEmpty().isNumeric(),
    validateFields
  ],
  createUser
);
router.put(
  '/:id',
  [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el Apellido es obligatorio').not().isEmpty(),
    check('date_bird', 'la fecha de nacimiento es obligatoria').isDate(),
    check('number_phone', 'el numero de telefono es obligatorio').not().isEmpty().isNumeric() ,
    check('age', 'la edad es obligatoria').not().isEmpty().isNumeric(),
    validateFields
  ],
  updateUser
);

router.delete('/:id', deleteUser);
module.exports = router;