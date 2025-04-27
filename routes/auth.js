const passport = require("passport");
const router = require("express").Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/index.html' }),
    function(req, res) {
      res.redirect('/nuevo-articulo.html');
});

module.exports = router