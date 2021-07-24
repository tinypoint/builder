import mongoose from 'mongoose';

export default mongoose.model('pages_records', new mongoose.Schema({
  schema: Object,
  scriptText: String,
  status: String,
  page: String,
  layoutCss: String, // 布局样式
}));
