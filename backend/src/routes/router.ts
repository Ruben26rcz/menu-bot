import { Router } from 'express';
import { menusRouter } from './menu';
import { ordersRouter } from './order';

export const router = Router();

router.use('/menus', menusRouter);
router.use('/orders', ordersRouter);
