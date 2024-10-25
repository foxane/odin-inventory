import { Router } from 'express';
import {
  allCategories,
  allItems,
  dashboard,
} from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/item', allItems);
indexRouter.get('/category', allCategories);

indexRouter.get('/', dashboard);

export default indexRouter;
