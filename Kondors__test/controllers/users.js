const moment = require('moment');
const User = require('../models/user.js');

const getUsers = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [users, total] = await Promise.all([
    User.find({}, 'identification name lastName number_phone date_bird age').skip(desde).limit(5),
    User.countDocuments(),
  ]);

  res.json({
    Ok: true,
    mgs: 'All Users',
    users,
    total,
  });
};

const getByIdUser = async (req,res) => {

  const uid = req.params.id
  try {
      const  getId = await User.findById(uid);

      if(!getId) {
        return res.status(400).json({
          ok: false,
          mgs: 'the user exist',
        });
      }
      res.status(201).json({
        Ok: true,
        mgs: 'get user',
        user: getId
      });

  } catch (error) {
    console.log(error),
    res.status(500).json({
      Ok: false,
      mgs: 'see logs',
    });
  }
}

const getById = async (req,res) => {

  const uid = req.params.id
  try {
      const  getId = await User.findOne({identification: uid});

      if(!getId) {
        return res.status(400).json({
          ok: false,
          mgs: 'the user no exist',
        });
      }
      res.status(201).json({
        Ok: true,
        mgs: 'get user',
        user: getId
      });

  } catch (error) {
    console.log(error),
    res.status(500).json({
      Ok: false,
      mgs: 'see logs',
    });
  }
}

const createUser = async (req, res) => {
  const { identification, date_bird } = req.body;
  try {
    const userExist = await User.findOne({ identification });
    if (userExist) {
      return res.status(400).json({
        ok: false,
        mgs: 'the user exist',
      });
    }

    const user = new User(req.body);
    user.date_bird = moment().diff(date_bird, 'years')
    await user.save();

    res.status(201).json({
      Ok: true,
      mgs: 'User Created',
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error ... see logs',
    });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params.id;
  try {
    const userBD = await User.findById(uid);

    if (!userBD) {
      res.status(404).json({
        ok: false,
        msg: 'el Usuario no existe con ese id',
      });
    }
    const { identification, ...campus } = req.body;
    if (userBD.identification !== identification) {
      const existEmail = await User.findOne({ identification });
      if (existEmail) {
        res.status(400).json({
          ok: false,
          msg: 'la identificacion ya existe en otro usuario',
        });
      }
    }
    const userUpdate = await User.findByIdAndUpdate(uid, campus, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Se actualizo con exito',
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error.. see logs',
    });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  const userdelete = await User.findByIdAndDelete(uid);

  if (!userdelete) {
    res.status(404).json({
      ok: false,
      msg: 'El usuario no existe',
    });
  } else {
    res.status(200).json({
      ok: true,
      msg: 'usuario eliminado',
      user: userdelete,
    });
  }
};
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getByIdUser,
  getById
};