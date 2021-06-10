const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { User } = require("../model");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passport.use(                                                                //update
//     'signup',
//     new localStrategy({
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async(email, password, done) => {
//             try {
//                 const user = await User.create({ email, password });

//                 return done(null, user);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );

// passport.use(
//     'login',
//     new localStrategy({
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async(email, password, done) => {
//             try {
//                 const user = await User.findOne({ email });

//                 if (!user) {
//                     return done(null, false, { message: 'Khong tim thay user' });
//                 }

//                 const validate = await user.isValidPassword(password);

//                 if (!validate) {
//                     return done(null, false, { message: 'sai password' });
//                 }

//                 return done(null, user, { message: 'Logged thanh cong' });
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );