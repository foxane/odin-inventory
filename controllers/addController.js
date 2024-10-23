import { validationResult } from 'express-validator';
import { InternalServerError } from '../helper/errors.js';
import * as db from '../db/queries.js';

// Get form
export const addCategoryGet = (req, res) => {
  res.render('new', { type: 'category' });
};
export const addItemGet = async (req, res, next) => {
  try {
    const { rows: categories } = await db.getAllCats();

    res.render('new', { type: 'item', categories });
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};

// Post form
export const addCategoryPost = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render('new', { type: 'category', errors: result.errors });
  }

  try {
    await db.addCategory({ name: req.body.name });
    res.status(201).redirect('/');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};

export const addItemPost = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { rows: categories } = await db.getAllCats();
    return res.render('new', {
      type: 'item',
      errors: result.errors,
      categories,
    });
  }

  const { name, categoryId, imageUrl } = req.body;

  try {
    await db.addItem({ name, categoryId, imageUrl });
    res.status(201).redirect('/');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};
