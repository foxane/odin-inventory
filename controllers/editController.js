import { validationResult } from 'express-validator';
import * as db from '../db/queries.js';
import { InternalServerError } from '../helper/errors.js';
import { capitalize } from '../helper/utils.js';

export const editItemGet = async (req, res, next) => {
  try {
    const { rows: categories } = await db.getAllCats();
    const { rows } = await db.getItem(Number(req.params.itemId));
    res.render('form', {
      type: 'item',
      isEdit: true,
      item: rows[0],
      categories,
      capitalize,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const editCategoryGet = async (req, res, next) => {
  try {
    const { rows } = await db.getCategory(Number(req.params.categoryId));
    res.render('form', {
      type: 'category',
      isEdit: true,
      item: rows[0],
      capitalize,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const editItemPost = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const { rows: categories } = await db.getAllCats();
      const { rows } = await db.getItem(Number(req.params.itemId));
      return res.render('edit', {
        type: 'item',
        item: rows[0],
        categories,
        errors: result.errors,
        capitalize,
      });
    }

    const { name, categoryId, imageUrl } = req.body;
    const { itemId: id } = req.params;
    await db.editItem({ name, categoryId, imageUrl, id });
    res.redirect('/item');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const editCategoryPost = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const { rows } = await db.getCategory(Number(req.params.categoryId));
      res.render('edit', {
        type: 'category',
        item: rows[0],
        errors: result.errors,
        capitalize,
      });
    }

    const { name } = req.body;
    const { categoryId: id } = req.params;
    await db.editCategory({ name, id });
    res.redirect('/category');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};
