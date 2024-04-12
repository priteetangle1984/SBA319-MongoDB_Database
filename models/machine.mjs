import mongoose, { mongo } from 'mongoose';

const machineSchema = new mongoose.Schema({
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


const Machine = mongoose.model('Machine', machineSchema);

export default Machine;