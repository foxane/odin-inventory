import { Router } from 'express';
import {
  addBrandGet,
  addBrandPost,
  addItemGet,
  addItemPost,
  addCategoryGet,
  addCategoryPost,
} from '../controllers/addController.js';
import {
  brandValidation,
  categoryValidation,
  itemValidation,
} from '../helper/formValidation.js';
const addRouter = Router();

addRouter.get('/', (req, res) => {
  // TODO: Add error handler
  res.send('Add new table - WIP');
});
addRouter.get('/brand', addBrandGet);
addRouter.post('/brand', brandValidation, addBrandPost);

addRouter.get('/item', addItemGet);
addRouter.post('/item', await itemValidation(), addItemPost);

addRouter.get('/category', addCategoryGet);
addRouter.post('/category', categoryValidation, addCategoryPost);

export default addRouter;
