import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  address: addressSchema, // Embed the address schema within the user schema
});

const UserModel = mongoose.model('UserModel', userSchema);

export { UserModel };
