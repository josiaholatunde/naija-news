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
  category: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toUTCString()
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Post', postSchema);

