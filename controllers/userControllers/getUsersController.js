const {getClientDB} = require('../../db/connect');

const getAllUsers = async (req, res) => {
  try {
    const fetchUsers = async () => {
      const db = await getClientDB();
      const collection = db.collection('users');
      const userObjects = await collection.find().toArray();
      if (!userObjects) {
        return res.status(404).json({message: 'No users found'});
      }

      return userObjects.map((user) => {
        return user.username;
      });
    };

    const users = await fetchUsers();

    return res.status(200).json({users});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
};

module.exports = {
  getAllUsers,
};
