import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toUTCString()
  }
});

export default mongoose.model('Post', postSchema);

