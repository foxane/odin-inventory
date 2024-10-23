import { body } from 'express-validator';
import { InternalServerError } from './errors.js';
import * as db from '../db/queries.js';

const emptyMsg = 'cannot be empty';
const alphaMsg = 'should only contain alphabet';
const lengthMsg = 'should have 2 - 20 characters';
const bigLengthMsg = 'should have 5 - 100 characters';
const missingProp = 'Please select or create new';
const urlMsg = 'is not a valid URL';

export const brandValidation = [
  body('name').trim().notEmpty().withMessage(`Brand name ${emptyMsg}`),
  body('website')
    .trim()
    .notEmpty()
    .withMessage(`Brand website ${emptyMsg}`)
    .isURL()
    .withMessage(`Website ${urlMsg}`),
];

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
  try {
    const { rows } = await db.getBrandCatCount();
    const { cat_count, brand_count } = rows[0];

    return [
      body('name')
        .trim()
        .notEmpty()
        .withMessage(`Item name ${emptyMsg}`)
        .isLength({ min: 5, max: 100 })
        .withMessage(`Item name ${bigLengthMsg}`),

      body('brandId')
        .trim()
        .notEmpty()
        .withMessage(`${missingProp} brand`)
        .custom(val => {
          const id = Number(val);
          if (isNaN(id) || id < 1 || id > brand_count) {
            throw new Error('Invalid brand');
          }
          return true;
        }),

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
        .trim()
        .optional()
        .isURL()
        .withMessage(`Image url ${urlMsg}`),
    ];
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};
