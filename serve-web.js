const compression = require('compression');
const express = require('express');

let router = express.Router();
router.use(compression());
router.use(express.static('web'));

router.all('*', (req, res, next) => {
    res.status(404).send('404!');
});

module.exports = router;