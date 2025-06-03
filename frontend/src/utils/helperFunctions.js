const safeRegex = /^[^<>{};\\]*$/;
const bannedRegEx = '< > { } ; \\';

const isValidSubmission = (username, password) => {
    if (!username.trim() || username.length > 30) {
        return {
            valid: false,
            message: 'Username should be between 1 - 30 characters'
        };
    };

    if (!password || password.length < 6 || password.length > 30) {
        return {
            valid: false,
            message: 'Password should be between 6 - 30 characters'
        };
    };

    if (!safeRegex.test(username)) {
        return {
            valid: false,
            message: `Username cannot contain the following characters: ${bannedRegEx}`
        };
    }
    return { valid: true };
};

export {isValidSubmission};