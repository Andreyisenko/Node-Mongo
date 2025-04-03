import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  deleteContactsController,
  upsertContactsController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));
contactsRouter.post('/', ctrlWrapper(createContactsController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

contactsRouter.put('/:contactId', ctrlWrapper(upsertContactsController));

export default contactsRouter;
