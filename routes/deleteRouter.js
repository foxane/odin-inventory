import { Router } from 'express';
import { NotFoundError } from '../helper/errors.js';
import { deleteCategory, deleteItem } from '../controllers/deleteController.js';

const deleteRouter = Router();

deleteRouter.post('/item/:itemId', deleteItem);
deleteRouter.post('/category/:categoryId', deleteCategory);
deleteRouter.get('/', (req, res, next) => {
  next(new NotFoundError());
});

export default deleteRouter;
