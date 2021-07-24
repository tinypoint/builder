import mongoose from 'mongoose';

export default mongoose.model('templates', new mongoose.Schema({
  template: [Object],
}, {
  id: false,
}));
