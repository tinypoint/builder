import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('pages', Schema);
