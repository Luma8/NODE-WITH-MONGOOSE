const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MissionsSchema = new Schema({
    id: ObjectId,
    id_user: String,
    title: String,
    description: String,
    check: Boolean
});

const MissionsModel = mongoose.model('missions', MissionsSchema);

module.exports = MissionsModel;