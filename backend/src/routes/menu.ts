const express = require('express');
const { getMenus } = require('../controllers/menus');

export const menusRouter = express.Router();

menusRouter.get('/', getMenus);
