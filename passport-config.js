const LocalStrategy = require("passport-local").Strategy;
function initialize(passport, getUserByEmail) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Stämmer användaruppgifterna?
      const user = getUserByEmail(email);
      if (email != 'test@testemail.com' || password != 'admin') {
        return done(null, false, { message: "Något gick fel" });
      } else {
        return done(null, user);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}
module.exports = initialize;
