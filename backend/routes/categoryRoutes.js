import CategoryController from '../controllers/categoryController';
import express from 'express';
import { checkAuth } from '../middlewares/check-auth';


const router = express.Router();

router.post('', checkAuth, CategoryController.addCategory);
router.get('', CategoryController.getCategories);
router.get('/detail', CategoryController.getCategoriesWithPosts);


export default router;
