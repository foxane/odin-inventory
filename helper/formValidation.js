import { body } from 'express-validator';
import * as db from '../db/queries.js';

const emptyMsg = 'cannot be empty';
const alphaMsg = 'should only contain alphabet';
const lengthMsg = 'should have 2 - 20 characters';
const bigLengthMsg = 'should have 5 - 100 characters';
const missingProp = 'Please select or create new';

export const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage(`Category name ${emptyMsg}`)
    .isAlpha()
    .withMessage(`Category ${alphaMsg}`)
    .isLength({ min: 2, max: 20 })
    .withMessage(`Category ${lengthMsg}`),
];

export const itemValidation = async () => {
  const { rows } = await db.getAllCats();
  const { cat_count } = rows.length;

  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage(`Item name ${emptyMsg}`)
      .isLength({ min: 5, max: 100 })
      .withMessage(`Item name ${bigLengthMsg}`),

    body('categoryId')
      .trim()
      .notEmpty()
      .withMessage(`${missingProp} category`)
      .custom(val => {
        const id = Number(val);
        if (isNaN(id) || id < 1 || id > cat_count) {
          throw new Error('Invalid category');
        }
        return true;
      }),

    body('imageUrl')
      .isEmpty() // FIXME: delete this chain when image upload is ready
      .withMessage('I said image is disabled!!! FUCK OFF'),
  ];
};
