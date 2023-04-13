const checkUser = (req, res) => {
  return res.status(200).json({ user: req.loggedInUser.user })
};

module.exports = {
  checkUser
}