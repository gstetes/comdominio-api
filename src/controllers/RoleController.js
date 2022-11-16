const connection = require('../database/connection');

const create = async (req, res) => {
  const { name } = req.body;

  const roleExists =
    await connection('roles')
      .select('*')
      .where('role', name)
      .first();

  if (!!roleExists) {
    return res.status(400)
      .json({
        error: 'Role with this name already exists'
      });
  };

  try {
    await connection('roles')
      .insert({
        role: name
      });

    return res.status(200)
      .json();
  } catch (error) {
    return res.status(500)
      .json({ error })
  }
};

const list = async (req, res) => {
  try {
    const roles = await connection('roles').select('*');
    return res.status(200)
      .json(roles)
  } catch (error) {
    return res.status(500).json({
      error: 'Error occured on get roles.',
      message: error
    })
  };
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const roleExists = await connection('roles')
    .select("*")
    .where('id', id)
    .first();

  if (!roleExists) {
    return res.status(400)
      .json({
        error: 'Role with this id does not exists.'
      });
  };

  try {
    await connection('roles')
      .select('*')
      .where('id', id)
      .first()
      .delete();

    return res.status(200)
      .json();
  } catch (error) {
    return res.status(500).json({
      error: error
    })
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const roleExists = await connection('roles')
    .select("*")
    .where('id', id)
    .first();

  if (!roleExists) {
    return res.status(400)
      .json({
        error: 'Role with this id does not exists.'
      });
  };

  try {
    await connection('roles')
      .select('*')
      .where('id', id)
      .first()
      .update({
        role: name
      });

    return res.status(200)
      .json();
  } catch (error) {
    return res.status(500).json({
      error: error
    })
  }
};

module.exports = {
  create,
  list,
  destroy,
  update
};