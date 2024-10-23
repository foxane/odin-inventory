import pool from './pool.js';

async function error() {
  await pool.query('lol');
}

/**
 * Get all item from database ordered from newest to oldest. NO LIMIT!
 *
 * @returns {Promise<object>} The result is default, so {rows} need to be destructured
 */

async function getAllItems() {
  const data = await pool.query(`
    SELECT 
      p.id AS id,
      p.name AS name,
      p.image_url,
      p.create_date,
      c.name AS category,
      b.name AS brand
    FROM
      part AS p
    INNER JOIN
      category AS c ON c.id = p.category_id
    INNER JOIN
      brand AS b ON b.id = p.brand_id
    ORDER BY
      id DESC
    ;`);

  return data;
}

/**
 * Get all categories from database ordered from newest to oldest. NO LIMIT!
 *
 * @returns {Promise<object>} The result is default, so {rows} need to be destructured
 */

async function getAllCats() {
  const data = await pool.query(
    `
    SELECT
      *
    FROM
      category
    ;`,
  );

  return data;
}

async function getAllBrands() {
  const data = await pool.query(
    `
    SELECT
      *
    FROM
      brand
    ;`,
  );

  return data;
}

async function addCategory({ name }) {
  await pool.query(
    `
    INSERT INTO
      category (name)
    VALUES
      ($1)
    ;`,
    [name],
  );
}

async function addItem({ name, brandId, categoryId, imageUrl }) {
  await pool.query(
    `
    INSERT INTO
      part (name, brand_id, category_id, image_url)
    VALUES
      ($1, $2, $3, $4)
    ;`,
    [name, brandId, categoryId, imageUrl],
  );
}

async function addBrand({ name, website }) {
  await pool.query(
    `
    INSERT INTO
      brand (name, website)
    VALUES
      ($1, $2)
    ;`,
    [name, website],
  );
}

async function getBrandCatCount() {
  const data = await pool.query(`
    SELECT 
      (
        SELECT COUNT(*)
        FROM category
      ) AS cat_count,
      (
        SELECT COUNT(*)
        FROM brand
      ) AS brand_count
    ;`);

  return data;
}

export {
  getAllItems,
  getAllCats,
  getAllBrands,
  addCategory,
  addItem,
  addBrand,
  error,
  getBrandCatCount,
};
