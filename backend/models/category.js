import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

export default mongoose.model('Category', categorySchema);

