const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const CharacterSchema = new mongoose.Schema({
    name: String,
    title: String,
    meta: getMeta(),
});

mongoose.model('Character', CharacterSchema);