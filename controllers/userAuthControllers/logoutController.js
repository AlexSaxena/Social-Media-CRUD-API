exports.logout = (req, res) => {
  res
    .cookie('authToken', '', {
      maxAge: 1,
    })
    .json({message: 'User Logged Out!'});
};
