module.exports = (req, res, next) => {
   // console.log(req.user)
   // console.log(req.isAuthenticated())
   if(req.isAuthenticated()) {
      return next();
   }
   res.send({authLogin: false});
}