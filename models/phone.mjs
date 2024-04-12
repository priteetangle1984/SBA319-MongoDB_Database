import mongoose, { mongo } from 'mongoose';

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    readyToUse: Boolean
});


const Phone = mongoose.model('Phone', phoneSchema);

export default Phone;