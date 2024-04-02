const express = require('express');
const { getOrders, patchOrder, deleteOrder } = require('../controllers/orders');

export const ordersRouter = express.Router();

ordersRouter.get('/', getOrders);
ordersRouter.patch('/:id', patchOrder);
ordersRouter.delete('/:id', deleteOrder);
