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


const contactsRouter = Router();

contactsRouter.get('/',  ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));
contactsRouter.post('/', ctrlWrapper(createContactsController));


contactsRouter.put('/:contactId', ctrlWrapper(upsertContactsController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactsController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));
export default contactsRouter;
