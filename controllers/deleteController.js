import * as db from '../db/queries.js';
import { InternalServerError } from '../helper/errors.js';

export const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await db.deleteItem(Number(itemId));
    res.status(204).redirect('/item');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await db.deleteCategory(Number(categoryId));
    res.status(204).redirect('/category');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};
