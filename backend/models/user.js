import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;


const userSchema = new Schema({
  userName: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true
  },
  role: {
    type: Number, required: true, default: 0
  },
  password: {
    type: String, required: true
  }
});

mongoose.plugin(mongooseUniqueValidator);

export default mongoose.model('User', userSchema);
