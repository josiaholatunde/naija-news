import PostController from '../controllers/postsController';
import express from 'express';
import { checkAuth } from '../middlewares/check-auth';
import extractFile from '../middlewares/extractfile';
const router = express.Router();



router.get('', PostController.getPosts);
router.get('/all', PostController.getPostsDetail);
router.get('/:id', PostController.getPost);
router.put('/:id', checkAuth, extractFile, PostController.editPost);
router.post('', checkAuth, extractFile, PostController.addPost);
router.delete('/:id', checkAuth, PostController.deletePost);



export default router;
