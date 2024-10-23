import * as db from '../db/queries.js';
import { capitalize } from '../helper/utils.js';

export const dashboard = async (req, res) => {
  const item = await db.getAllItems();
  const cat = await db.getAllCats();
  res.render('index', { items: item.rows, cats: cat.rows, capitalize });
};
