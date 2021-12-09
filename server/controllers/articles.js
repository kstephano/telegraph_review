const express = require('express');
const router = express.Router();

const Article = require('../models/article')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.all
        res.status(200).json({articles})
    } catch(err) {
        res.status(500).json({err})
    }
});

router.get('/:path', async (req, res) => {
    try {
        const article = await Article.findByPath(req.params.path)
        res.status(200).json(article)
    } catch(err) {
        res.status(404).json({err})
    }
});

router.post('/', async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch(err) {
        res.status(404).json({err})
    }
});

router.put('/:path', async (req, res) => {
    try {
        const article = await Article.update(req.body);
        res.status(201).json(article);
    } catch(err) {
        res.status(404).json({err});
    }
});




module.exports = router;
