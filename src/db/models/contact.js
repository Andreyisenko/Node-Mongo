import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    isFavourite: {
      type: Boolean,
      default: false,
      require: true,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', (error, doc, next) => {
  error.status = 400;
  next();
});

contactSchema.pre('findOneAndUpdate', function (next) {
  (this.options.new = true), (this.options.runValidators = true), next();
});
contactSchema.post('findOneAndUpdate', (error, doc, next) => {
  error.status = 400;
  next();
});

const ContactCollection = model('contact', contactSchema);
export default ContactCollection;
