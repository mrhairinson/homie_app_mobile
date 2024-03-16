const express = require('express');
const router = express.Router();
const {
    signup,
    signin,
    logout,
    verify
} = require('../controllers/auth.controllers');

router.get('/signup', (req, res) => {
    signup();
    res.send("signup");
});
router.get('/signin', (req, res) => {
    signin();
    res.send("signin");
});
router.get('/verify', (req, res) => {
    verify();
    res.send("verify");
});
router.get('/logout', (req, res) => {
    logout();
    res.send("logout");
});

module.exports = router;