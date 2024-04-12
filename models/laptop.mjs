import mongoose, { mongo } from 'mongoose';

const laptopSchema = new mongoose.Schema({
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


const Laptop = mongoose.model('Laptop', laptopSchema);

export default Laptop;