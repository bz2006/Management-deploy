import mongoose from 'mongoose';
import { type } from 'os';

const { Schema } = mongoose;

const invoicesSchema = new Schema({
  marketname: {
    type: String,
  },
  marketid: {
    type: String,
    required: true,
  },
  invNo: {
    type: String,
  },
  date: {
    type: String,
  },
  poNo: {
    type: String,
  },
  mrpart:{
    type:String
  },
  billCont: [{}],
  grandtotal: {
    type: Number,
  },
  subtotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  vehicleNo: {
    type: String,
  },
  AccNo: {
    type: String,
  },
  instruction: {
    type: String,
  },
  Tqty: {
    type: Number,
  },
  taxmeth: {
    type: String,
  }
});


const Invoices = mongoose.model('Invoices', invoicesSchema);

export default Invoices;
