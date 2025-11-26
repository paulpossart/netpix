import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByUsername, getUserById } from '../queries/usersQueries.js';
import { checkPassword } from '../utils/helpers.js';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            const passwordOk = await checkPassword(username, password);
            if (!passwordOk) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
