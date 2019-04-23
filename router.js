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

router.get('/:id', async (req, res) => {
    try {
        const data = await db.findById(req.params.id);
        if (data) {
            res.status(200).json(data);
        } else {
            const message404 = { message: "The post with the specified ID does not exist." }
            res.status(404).json(message404);
        }
    } catch (error) {
        const message500 = { error: "The post information could not be retrieved." }
        res.status(500).json(message500);
    }
});

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    try {
        if (title && contents) {
            const data = await db.insert(req.body);
            res.status(201).json(data);
        }
        else {
            const message400 = { errorMessage: "Please provide title and contents for the post." };
            res.status(400).json(message400);
        }
    } catch (error) {
        const message500 = { error: "There was an error while saving the post to the database" }
        res.status(500).json(message500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = await db.remove(req.params.id);
        if (id > 0) {
            res.status(200).json({ message: `Deleted post ${req.params.id}` });
        } else {
            const message404 = { message: "The post with the specified ID does not exist." };
            res.status(404).json(message404);
        }
    } catch (error) {
        const message500 = { error: "The post could not be removed" };
        res.status(500).json(message500);
    }
});

router.put('/:id', async (req, res) => {
    const { title, contents } = req.body;
    const data = await db.update(req.params.id, req.body);
    const message400 = { errorMessage: "Please provide title and contents for the post." };
    const message404 = { message: "The post with the specified ID does not exist." };
    const message500 = { error: "The post could not be removed" };

    if (title === '' || contents === '') {
        res.status(400).json(message400);
    }
    else {
        try { data === 1 ? res.status(200).json(data) : res.status(404).json(message404) }
        catch (error) { res.status(500).json(message500) }
    }
});

module.exports = router;