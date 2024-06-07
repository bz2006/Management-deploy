import mongoose from 'mongoose';

const { Schema } = mongoose;

const catlogSchema = new Schema({
  catlogname: {
    type: String,
    required: true,
    unique: true,
  },
  products:[{
    model: {
      type: String,
  },
  mrp: {
      type: Number,
  },
  unitPrice: {
      type: Number
  },
  articleNo: {
      type: String
  },
  }]
});


const Catlog = mongoose.model('Catlog', catlogSchema);

export default Catlog;
