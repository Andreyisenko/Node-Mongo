import ContactCollection from '../db/models/contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactsById = (id) => ContactCollection.findOne({ _id: id });

export const createContacts = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const deleteContacts = async (contactId) => {
  const contact = ContactCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export const updateContacts = async (contactId, payload, option = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...option,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
