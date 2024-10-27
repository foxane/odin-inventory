import * as db from '../db/queries.js';
import { capitalize } from '../helper/utils.js';

export const dashboard = async (req, res) => {
  const item = await db.getAllItems();
  const cat = await db.getAllCats();
  res.render('index', { items: item.rows, cats: cat.rows, capitalize });
};

export const allItems = async (req, res, next) => {
  try {
    const { rows } = await db.getAllItems();
    res.render('items', { items: rows, capitalize });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const allCategories = async (req, res, next) => {
  try {
    const { rows } = await db.getAllCats();
    res.render('categories', { categories: rows, capitalize });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
