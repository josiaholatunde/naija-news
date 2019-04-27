import PostController from '../controllers/postsController';
import express from 'express';
const router = express.Router();

router.get('', PostController.getPosts);
router.get('/all', PostController.getPostsDetail);
router.get('/:id', PostController.getPost);
router.post('', PostController.addPost);
router.delete('/:id', PostController.deletePost);



export default router;
