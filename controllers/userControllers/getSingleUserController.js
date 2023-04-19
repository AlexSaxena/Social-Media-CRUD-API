const { getClientDB } = require('../../db/connect');
const { followUserSchema } = require('../../model/userModel');

exports.getSingleUser = async function getSingleUser(req, res) {
    const { username } = req.params
    const { error, value } = followUserSchema.validate({ username });

    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = value.username;

    const db = getClientDB();
    const collection = db.collection('users');

    const foundUser = await collection.findOne({ username: user });
    if (foundUser) {
        delete foundUser['password'];
    } else {
        return res.status(404).json({ message: 'User not found' })
    }


    res.status(200).json(foundUser);
}