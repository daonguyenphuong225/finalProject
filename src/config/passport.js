const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const localStrategy = new LocalStrategy({
        usernameField: "email",
        passwordField: "pwd",
        session: false,
    },
    function(username, password, done) {
        console.log("Local strategy", username, password);
        return done(null, { username, password }, { message: "ooooo" });
    }
);

const jwtStrategy = new JwtStrategy({
        secretOrKey: "secretKey",
        jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    },
    function(payload, done) {
        console.log(payload);
        done(null, payload);
    }
);

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;