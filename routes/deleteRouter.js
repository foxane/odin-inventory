import { Router } from 'express';
import { NotFoundError } from '../helper/errors.js';
import { deleteItem } from '../controllers/deleteController.js';

const deleteRouter = Router();

deleteRouter.get('/item/:itemId', deleteItem);
deleteRouter.get('/', (req, res, next) => {
  next(new NotFoundError());
});

export default deleteRouter;
