import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  listID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // Add other fields as necessary
});

const deletedCustomerSchema = new mongoose.Schema({
  listID: { type: String, required: true },
  name: { type: String, required: true },
  deletedAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);
const DeletedCustomer = mongoose.model('DeletedCustomer', deletedCustomerSchema);

export { 
    Customer,
    DeletedCustomer 
    };