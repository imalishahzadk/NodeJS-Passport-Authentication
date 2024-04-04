const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.render("welcome.pug"));
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render("dashboard.ejs", {
    name: req.user.name
}));

module.exports = router;
