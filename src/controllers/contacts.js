import createHttpError from 'http-errors';
import { getContacts, getContactsById } from '../services/contacts.js';

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
