import * as db from '../db/queries.js';
import { NotFoundError } from '../helper/errors.js';
import { capitalize } from '../helper/utils.js';

export const dashboard = async (req, res) => {
  const item = await db.getAllItems();
  const cat = await db.getAllCats();
  res.render('index', { items: item.rows, cats: cat.rows, capitalize });
};

export const itemDetails = async (req, res, next) => {
  try {
    const { rows } = await db.getItem(Number(req.params.itemId));
    if (rows.length < 1) throw new NotFoundError();
    res.render('details', { item: rows[0] });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
