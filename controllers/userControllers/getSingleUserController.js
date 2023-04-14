const {getClientDB} = require('../../db/connect');
const { followUserSchema } = require('../../model/userModel');

exports.getSingleUser = async function getSingleUser(req, res) {
    const { error, value } = followUserSchema.validate(req.body);

    if(error) return res.status(400).json(error);
    
    const user = value.username;

    const db = getClientDB();
    const collection = db.collection('users');

    const foundUser = await collection.findOne( { username: user } );
    delete foundUser['password'];

    res.status(200).json(foundUser);
}