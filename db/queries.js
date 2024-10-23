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
      c.name AS category
    FROM
      part AS p
    INNER JOIN
      category AS c ON c.id = p.category_id
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
      c.name AS category
    FROM
      part AS p
    INNER JOIN
      category AS c ON c.id = p.category_id
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

export async function addItem({ name, categoryId, imageUrl }) {
  await pool.query(
    `
    INSERT INTO
      part (name, category_id, image_url)
    VALUES
      ($1, $2, $3)
    ;`,
    [name, categoryId, imageUrl],
  );
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
