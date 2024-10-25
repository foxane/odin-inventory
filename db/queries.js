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
      p.category_id,
      COALESCE(c.name, 'Category is unset') AS category
    FROM
      part AS p
    LEFT JOIN
      category AS c ON c.id = p.category_id
    WHERE
      p.id = $1
    ;`,
    [itemId],
  );

  return data;
}

export async function getCategory(categoryId) {
  const data = await pool.query(
    `
    SELECT *
    FROM category
    WHERE id = $1
    `,
    [categoryId],
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
      COALESCE(c.name, 'Category is unset') AS category
    FROM
      part AS p
    LEFT JOIN
      category AS c ON c.id = p.category_id
    ORDER BY
      p.id DESC;
  `);

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

export async function addItem({ name, categoryId }) {
  await pool.query(
    `
    INSERT INTO
      part (name, category_id)
    VALUES
      ($1, $2)
    ;`,
    [name, categoryId],
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

export async function editItem({ id, name, categoryId }) {
  await pool.query(
    `
    UPDATE part
    SET name = $1, category_id = $2
    WHERE id = $3
    ;`,
    [name, categoryId, id],
  );
}

export async function editCategory({ id, name }) {
  await pool.query(
    `
    UPDATE category
    SET name = $1
    WHERE id = $2
    ;`,
    [name, id],
  );
}
