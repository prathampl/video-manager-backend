const mongoose = require('mongoose');

const layoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  layout: { type: Array, required: true },
});

module.exports = mongoose.model('Layout', layoutSchema);
