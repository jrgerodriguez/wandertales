const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/google'); 
    }
    next();
  };
  
module.exports = { isAuthenticated };