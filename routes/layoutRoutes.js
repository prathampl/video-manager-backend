const express = require('express');
const router = express.Router();
const Layout = require('../models/Layout');

// Save Layout
router.post('/save', async (req, res) => {
  const { userId, layout } = req.body;

  try {
    const existingLayout = await Layout.findOne({ userId });
    if (existingLayout) {
      existingLayout.layout = layout;
      await existingLayout.save();
    } else {
      const newLayout = new Layout({ userId, layout });
      await newLayout.save();
    }
    res.status(200).json({ message: 'Layout Saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save layout' });
  }
});

// Load Layout
router.get('/load/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const layout = await Layout.findOne({ userId });
    if (!layout) {
      return res.status(404).json({ error: 'Layout not found' });
    }
    res.status(200).json(layout.layout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load layout' });
  }
});

module.exports = router;
