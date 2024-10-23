import pool from './pool.js';

export async function error() {
  await pool.query('lol');
}

export async function getItem(itemId) {
  const data = await pool.query(
    `
      SELECT 
      p.id AS id,
      p.name AS name,
      p.image_url,
      p.create_date,
      c.name AS category,
      b.name AS brand,
      b.website
    FROM
      part AS p
    INNER JOIN
      category AS c ON c.id = p.category_id
    INNER JOIN
      brand AS b ON b.id = p.brand_id
    WHERE
      p.id = $1
    ;`,
    [itemId],
  );

  return data;
}

export async function getAllItems() {
  const data = await pool.query(`
    SELECT 
      p.id AS id,
      p.name AS name,
      p.image_url,
      p.create_date,
      c.name AS category,
      b.name AS brand,
      b.website
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

export async function getAllCats() {
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

export async function getAllBrands() {
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

export async function addCategory({ name }) {
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

export async function addItem({ name, brandId, categoryId, imageUrl }) {
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

export async function addBrand({ name, website }) {
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

export async function getBrandCatCount() {
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

export async function deleteItem(itemId) {
  await pool.query(
    `
    DELETE
    FROM
      part
    WHERE
      id = $1
    ;`,
    [itemId],
  );
}

export async function deleteCategory(categoryId) {
  await pool.query(
    `
    DELETE
    FROM
      category
    WHERE
      id = $1
    ;`,
    [categoryId],
  );
}

export async function deleteBrand(brandId) {
  await pool.query(
    `
    DELETE
    FROM
      brand
    WHERE
      id = $1
    ;`,
    [brandId],
  );
}
