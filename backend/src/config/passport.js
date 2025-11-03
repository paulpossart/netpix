import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByUsername, getUserById } from '../queries/userQueries.js';
import { checkPassword } from '../utils/authHelpers.js';

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
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;