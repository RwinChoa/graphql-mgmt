const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progess', 'Completed'],
    }
});

module.exports = mongoose.model("Project", ProjectSchema);