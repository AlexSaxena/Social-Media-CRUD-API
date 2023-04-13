const { followUserSchema, getFollowingList } = require('../../model/userModel')
const { checkUserExists } = require('../../model/authModel')

const getUserFollowing = async (req, res) => {
  try {
    const { error, value } = followUserSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ message: errorMessage })
    }
    const { username } = value

    //Check if the user exists in database
    const userExists = await checkUserExists(username)
    if (!userExists) {
      return res.status(404).json({ message: "User not found" })
    }

    const followingList = await getFollowingList(username)
    if (!followingList) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ followingList })

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUserFollowing
}