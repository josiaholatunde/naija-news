import Category from '../models/category';
import Post from '../models/post';

export default class CategoryController {
  static async addCategory(req, res) {
    const { title } = req.body;
    console.log('Title', title);
    try {
      Category.findOne({title}, (err, category) => {
        if (err) {
          return res.status(500).json({
            error: 'Error occurred while retrieving categpry'
          });
        }
        console.log(category);
        if (category) {
          return res.status(400).json({
            message: 'Category title Exists'
          })
        }
        const categoryToCreate = new Category({title});
        categoryToCreate.save((err) => {
           if (err) {
            return res.status(500).json({
              error: 'Error occurred while saving'
            });
           }
           return res.status(201).json({
            message: 'Successfuly created Category',
            category: {
              id: categoryToCreate._id,
              title: categoryToCreate.title
            }
          })
         });
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error'
      })
    }
  }

  static getCategories(req, res) {
    Category.find({}, (err, categories) => {
      if (err) {
        return res.status(500).json({
          error: 'Error occurred while retrieving categpry'
        });
      }
      return res.status(200).json({
        message: 'Successfully fetched categories',
        categories: categories.map(({title, _id}) =>  {
          return {
            id: _id,
            title
          }
        })
      })
    });
  }
  static getCategoriesWithPosts(req, res) {
    Post.find()
          .populate('category')
          .exec((err, posts) => {
            if (err) {
              return res.status(500).json({
                error: 'Error occurred while retrieving categories'
              });
            }
            return res.status(200).json({
              message: 'Successfully fetched categories',
              posts
            })
          })
  }
}
