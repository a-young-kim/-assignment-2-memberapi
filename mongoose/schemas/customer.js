import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    login_id:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    salt:{
        type: String,
        required: true,
    },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
