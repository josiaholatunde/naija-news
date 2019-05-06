import Post from '../models/post';
import post from '../models/post';

class PostController {

  static getPosts(req, res) {
     Post.find((err, posts) => {
       if (err) {
          return res.status(500).json({
            error: err
          });
       }
      return res.status(200).json({
        message: 'Successfully fetched posts',
        posts: posts.map(post => {
          const { _id, title, description, dateCreated, category, creator } = post;
            return {
              id: _id,
              title,
              description,
              category,
              dateCreated,
              creator
            }
        })
      })
     });
  }
  static async getPostsDetail(req, res) {
    let { pageSize, pageNumber } = req.query;
    if (typeof(pageSize) === 'undefined' && typeof(pageNumber) === 'undefined') {
      pageSize = 10;
      pageNumber = 1;
    }
    try {
      console.log('ddd', typeof(pageNumber), typeof(pageSize));
      let postData;
      const count = await Post.countDocuments();
      console.log('count', count);
       Post.find({}, (err, posts) => {
        return res.status(200).json({
          message: 'Successfully fetched posts',
          posts:   posts.map(post => {
              const { _id, title, description, category, dateCreated, imagePath, creator } = post;
              return {
                id: _id,
                title,
                description,
                category,
                dateCreated,
                imagePath,
                creator
              }
          }),
          totalItems: count
        });
      }).skip((+pageNumber - 1) * +pageSize).limit(+pageSize);
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }

  static getPost(req, res) {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      if (!post) {
        return res.status(404).json({
          message: 'Post was not found'
        });
      }
      const { _id, title, description, category, dateCreated, imagePath } = post;
      return res.status(200).json({
        message: 'Post was fetched successfully',
        post: {
          id: _id,
          title,
          description,
          category,
          dateCreated,
          imagePath
        }
      });
    });
  }


  static async addPost(req, res) {
    const {title, description, category} = req.body;
    const url = `${req.protocol}://${req.get('host')}/images`
    const post = new Post({
      title,
      description,
      category,
      imagePath: `${url}/${req.file.filename}`,
      creator: req.userData.userId

    });
    try {
      const savedPost = await post.save();
      return res.status(201).json({
        message: 'Successfully created Post',
        post: {
          id: savedPost._id,
          title,
          description,
          category,
          imagePath,
          creator: savedPost.creator
        }
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
  static editPost(req, res) {
    const {title, description, category, creator} = req.body;
    const loggedInUser = req.userData.userId;
    if (creator !== loggedInUser) {
      return res.status(401).json({
        error: 'Unauthorized access'
      });
    }
    let imagePath = req.body.imagePath;
    if(req.file) {
      const url = `${req.protocol}://${req.get('host')}/images`
      imagePath = `${url}/${req.file.filename}`
    }

    const updatedPost = {
      id: req.params.id,
      title,
      description,
      category,
      imagePath
    }
    Post.updateOne({_id: req.params.id}, updatedPost, { new: true }, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'Error occurred while updating post'
        });
        }
        console.log(result.nModified);
        if (result.nModified > 0) {
          return res.status(200).json({
            message: 'Succeessully updated post',
            imagePath
          });
        }
        return res.status(404).json({
          message: 'Post was not found'
        });
    });
  }
  static deletePost(req, res) {
    const postId = req.params.id;
    const loggedInUser = req.userData.userId;

    Post.deleteOne({_id: postId, creator: loggedInUser}, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err});
      }
      if (result.n === 0) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }
      return res.status(200).json({
        message: 'Deleted Post'
      });
    })
  }
}

export default PostController;
