import { validationResult } from 'express-validator';
import { InternalServerError } from '../helper/errors.js';
import { capitalize } from '../helper/utils.js';
import * as db from '../db/queries.js';

// Get form
export const addCategoryGet = (req, res) => {
  res.render('form', { type: 'category', isEdit: false, capitalize });
};

export const addItemGet = async (req, res, next) => {
  try {
    const { rows: categories } = await db.getAllCats();

    res.render('form', { type: 'item', isEdit: false, categories, capitalize });
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};

// Post form
export const addCategoryPost = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render('form', {
      isEdit: false,
      type: 'category',
      errors: result.errors,
      capitalize,
    });
  }

  try {
    await db.addCategory({ name: req.body.name });
    res.status(201).redirect('/category');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};

export const addItemPost = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { rows: categories } = await db.getAllCats();
    return res.render('form', {
      isEdit: false,
      type: 'item',
      errors: result.errors,
      categories,
      capitalize,
    });
  }

  const { name, categoryId, imageUrl } = req.body;

  try {
    await db.addItem({ name, categoryId, imageUrl });
    res.status(201).redirect('/item');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};
