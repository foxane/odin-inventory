import * as db from '../db/queries.js';
import { InternalServerError } from '../helper/errors.js';

export const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await db.deleteItem(Number(itemId));
    res.status(204).redirect('/');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    await db.deleteBrand(Number(brandId));
    res.status(204).redirect('/');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await db.deleteCategory(Number(categoryId));
    res.status(204).redirect('/');
  } catch (err) {
    console.error(err);
    next(new InternalServerError());
  }
};
