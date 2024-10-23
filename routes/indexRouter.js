import { Router } from 'express';
import { dashboard } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', dashboard);

export default indexRouter;
