const logout = async function (req, res) {
  return res.json({ message: "User Successfully Logged Out" });
};

exports.logout = logout;
