const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ImageSchema = mongoose.Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const ImageModule = mongoose.model('imageModel', ImageSchema);

module.exports = ImageModule;