import Post from '../models/post';

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
            const { _id, title, description, dateCreated, category } = post;
            return {
              id: _id,
              title,
              description,
              category,
              dateCreated
            }
        })
      })
     });
  }
  static getPostsDetail(req, res) {
    Post.find((err, posts) => {
      console.log(posts);
      if (err) {
         return res.status(500).json({
           error: err
         });
      }
     return res.status(200).json({
       message: 'Successfully fetched posts',
       posts: posts.map(post => {

           const { _id, title, description, category, dateCreated } = post;
           return {
             id: _id,
             title,
             description,
             category,
             dateCreated
           }
       })
     })
    });
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
      const { _id, title, description, category, dateCreated } = post;
      return res.status(200).json({
        message: 'Post was fetched successfully',
        post: {
          id: _id,
          title,
          description,
          category,
          dateCreated
        }
      });
    });
  }


  static async addPost(req, res) {
    const {title, description, category} = req.body;
    const post = new Post({
      title,
      description,
      category
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
          dateCreated: savedPost.dateCreated
        }
      });
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  }
  static deletePost(req, res) {
    const postId = req.params.id;
    Post.deleteOne({_id: postId}, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err});
      }
      if (result.n === 0) {
        return res.status(404).json({
          message: 'Post was not Found'
        });
      }
      return res.status(200).json({
        message: 'Deleted Post'
      });
    })
  }
}

export default PostController;
