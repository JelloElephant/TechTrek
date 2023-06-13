const router = require('express').Router();

const userRoutes = require('./userRoutes');
const gptRoutes = require('./dataGpt');

router.use('/users', userRoutes);
router.use('/gpt', gptRoutes)

module.exports = router;
