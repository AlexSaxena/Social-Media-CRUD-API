const { createPost } = require('../controllers/postControllers/createPost');
const {deletePost} = require('../controllers/userPostControllers/deletePostController');

const postRoute = express.Router();

postRoute.post('/create', createPost)
// DELETE route
postRoute.delete('/', deletePost);

module.exports = {
  postRoute,
};
