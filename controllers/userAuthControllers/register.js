const { connect } = require("../../db/connect");
const { loginSchema, checkUserExists } = require("../../model/authModel");

const register = async function (req, res) {
  let validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const { username, password } = req.body;
  const checkUser = await checkUserExists(username);

  if (checkUser) {
    return res.status(409).json({ message: "User Already Exists!" });
  } else {
    let newUserData = {
      username: username,
      password: password,
      date,
      following: [],
    };

    const db = await connect();
    const collection = db.collection("users");

    const newUser = await collection.insertOne(
      newUserData,
      function (err, res) {
        if (err) res.json({ message: err }).status(400);
      }
    );
    return res.json({ message: "New User Added" }).status(200);
  }
};

let date = new Date();

exports.register = register;
