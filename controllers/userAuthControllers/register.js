const { connect } = require("../../db/connect");

const register = async function (req, res) {
  const { username, password } = req.body;

  let newUserData = {
    username: username,
    password: password,
    date,
    following: [],
  };

  const db = await connect();
  const collection = db.collection("users");

  const newUser = await collection.insertOne(newUserData, function (err, res) {
    if (err) res.json({ message: err }).status(400);
  });
  return res.json({ message: "New User Added" }).status(200);
};

let date = new Date();

exports.register = register;
