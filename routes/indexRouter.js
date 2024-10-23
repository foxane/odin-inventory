import { Router } from 'express';
import { dashboard, itemDetails } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', dashboard);
indexRouter.get('/item/:itemId', itemDetails);

export default indexRouter;
