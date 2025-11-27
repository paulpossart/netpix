import {
    createUser,
    replacePassword,
    replaceUsername,
    removeUser
} from '../queries/usersQueries.js';
import { isValidInput, httpErr, sanitiseUser } from '../utils/helpers.js';
import { signOff } from './authControllers.js';

export const registerUser = async (req, res, next) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (
            !isValidInput('username', username, 1, 30)
            || !isValidInput('password', password, 6, 30)
            || password !== confirmPassword
        ) {
            return next(httpErr('Invalid input', 400, 'RegistrationError'));
        };

        const newUser = await createUser(username, password);
        req.logIn(newUser, (err) => {
            if (err) return next(err);

            return res.status(201).json({
                message: 'User created and logged in.',
                user: sanitiseUser(req.user)
            })
        });
    } catch (err) {
        next(err);
    }
};

export const authenticateUser = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    res.status(200).json({
        message: 'User authenticated.',
        user: sanitiseUser(req.user)
    });
};

export const updatePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        if (
            !isValidInput('password', currentPassword, 6, 30)
            || !isValidInput('password', newPassword, 6, 30)
            || newPassword !== confirmNewPassword
        ) {
            return next(httpErr('Invalid input', 400, 'PasswordError'));
        };

        await replacePassword(userId, currentPassword, newPassword);

        return signOff(req, res, next, 200, 'Password updated, please sign in again.');

    } catch (err) {
        next(err);
    }
};

export const updateUsername = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { newUsername } = req.body;

        if (!isValidInput('username', newUsername, 1, 30)) {
            return next(httpErr('Invalid input', 400, 'UsernameError'));
        };

        const updatedUser = await replaceUsername(userId, newUsername);

        req.user.username = updatedUser.username;

        return res.status(200).json({
            message: `Username updated to: ${updatedUser.username}`,
            user: sanitiseUser(req.user) // or req.user?
        });

    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const oldUser = await removeUser(userId);

        if (!oldUser) {
            return next(httpErr('User not found', 404, 'DeletionError'));
        }

        return signOff(req, res, next, 200, `Username '${oldUser.username}' has been removed`);

    } catch (err) {
        next(err);
    }
};
