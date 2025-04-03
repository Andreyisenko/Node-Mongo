import createHttpError from 'http-errors';
import { getContacts, getContactsById } from '../services/contacts.js';
import { createContacts } from '../services/contacts.js';
import { deleteContacts } from '../services/contacts.js';
import { updateContacts } from '../services/contacts.js';
export const getContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);

  if (!data) {
    throw createHttpError(404, `Contact not foundssssss`);
    // const error = new Error(`Contact not foundssssss  `);
    // error.status = 404;
    // throw error;

    // return res.status(404).json({
    //   status: 404,
    //   message: 'Contact not found',
    // });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });

  // const { status = 500, message = "Server error" } = error;
  // res.status(status).json({
  //   message: error.message,
  // });
};

export const createContactsController = async (req, res) => {
  const contact = await createContacts(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContacts(contactId);

  if (!contact) {
    next(createHttpError(404, 'contact not found)))'));
    return;
  }
  res.status(204).send();
};

export const upsertContactsController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContacts(contactId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Contact not not'));
  }
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};
