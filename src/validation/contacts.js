import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required().messages({ 'string.empty': 'Username should be a string' }),
  phoneNumber: Joi.string().min(3).max(15).required().messages({
    'string.min': "User phone should have at least 3 characters",
    'string.max': 'User phone should have at most 11 characters',
    'any.required': 'phone is required',
  }),
  email: Joi.string().required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

const dataToValidate = {
  name: 'Vow',
  phoneNumber: '2533',
  email: 'vovo@example.com',
  isFavourite: true,
  contactType: 'personal',
};
const validationResult = createContactSchema.validate(dataToValidate, {
  abortEarly: false,
});

if (validationResult.error) {
    
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({ 'string.empty': 'Username should be a string' }),
  phoneNumber: Joi.string().min(3).max(15).messages({
    'string.min': 'User phone should have at least 3 characters',
    'string.max': 'User phone should have at most 11 characters',
    'any.required': 'phone is required',
  }),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
