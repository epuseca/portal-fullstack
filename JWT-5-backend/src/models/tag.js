const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        listSystem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'system' }],
    },
    { timestamps: true }
);

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;

