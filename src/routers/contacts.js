import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  deleteContactsController,
  upsertContactsController,
  patchContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

contactsRouter.put('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(upsertContactsController));

contactsRouter.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactsController));

contactsRouter.delete('/:contactId', isValidId,  ctrlWrapper(deleteContactsController));
export default contactsRouter;
