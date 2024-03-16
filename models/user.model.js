const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
}, {versionKey: false});

module.exports = model('User', UserSchema);