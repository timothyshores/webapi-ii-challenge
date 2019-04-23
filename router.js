const express = require('express');

const db = require('./data/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await db.find(req.query);
        res.status(200).json(data);
    } catch (error) {
        const message500 = { error: "The posts information could not be retrieved." };
        res.status(500).json(message500);
    }
});

module.exports = router;