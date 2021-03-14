const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const TestSchema = new mongoose.Schema({

    essay: String,
    meta: getMeta(),
});

mongoose.model('Test', TestSchema);