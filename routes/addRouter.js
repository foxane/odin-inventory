import { Router } from 'express';
import {
  addItemGet,
  addItemPost,
  addCategoryGet,
  addCategoryPost,
} from '../controllers/addController.js';
import {
  categoryValidation,
  itemValidation,
} from '../helper/formValidation.js';
import { NotFoundError } from '../helper/errors.js';
const addRouter = Router();

addRouter.get('/item', addItemGet);
addRouter.post('/item', await itemValidation(), addItemPost);

addRouter.get('/category', addCategoryGet);
addRouter.post('/category', categoryValidation, addCategoryPost);

addRouter.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default addRouter;
