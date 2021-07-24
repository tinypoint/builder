import mongoose from 'mongoose';

export default mongoose.model('components', new mongoose.Schema({
  name: String,
  path: String,
}, {
  id: false,
}));
