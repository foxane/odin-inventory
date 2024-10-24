import { Router } from 'express';
import {
  categoryValidation,
  itemValidation,
} from '../helper/formValidation.js';
import {
  editCategoryGet,
  editCategoryPost,
  editItemGet,
  editItemPost,
} from '../controllers/editController.js';

const editRouter = Router();

editRouter.get('/item/:itemId', editItemGet);
editRouter.post('/item/:itemId', await itemValidation(), editItemPost);

editRouter.get('/category/:categoryId', editCategoryGet);
editRouter.post('/category/:categoryId', categoryValidation, editCategoryPost);

export default editRouter;
