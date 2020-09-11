// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send('Unauthorized Access!');
  }

  // If the user isnt' logged in, redirect them to the login page
  // return res.redirect("/");
};