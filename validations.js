export function validatePassword(password) {
    const letters = "qwertyuiopasdfghjklzxcvbnm";
    const numbers = "1234567890";
    const specialSigns = "!@#$%^&*()_-+=";

    const len = password.length;

    if (len < 8 || len > 32) {
        return {
            type: "error",
            errCode: 1,
            category: "password",
        };
    }

    let numberAndSpecialCounter = 0;

    for (let i = 0; i < password.length; i++) {
        let char = password[i];

        if (numbers.includes(char)) {
            numberAndSpecialCounter++;
        } else if (specialSigns.includes(char)) {
            numberAndSpecialCounter++;
        } else if (
            letters.includes(char) ||
            letters.includes(char.toLowerCase())
        ) {
        } else {
            return {
                type: "error",
                errCode: 3,
                category: "password",
                char: char,
            };
        }
    }

    if (numberAndSpecialCounter < 3) {
        return {
            type: "error",
            errCode: 2,
            category: "password",
        };
    }

    return {
        type: "success",
        errCode: 0,
        category: "password",
    };
}

export function validateEmail(email) {
    const validChars = "qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_-+=.";

    if (email.length > 64) {
        return {
            type: "error",
            errCode: 4,
            category: "email",
        };
    }

    if (!email.includes("@")) {
        return {
            type: "error",
            errCode: 1,
            category: "email",
        };
    }

    if (!email.includes(".")) {
        return {
            type: "error",
            errCode: 2,
            category: "email",
        };
    }

    for (let i = 0; i < email.length; i++) {
        let char = email[i];

        if (
            !validChars.includes(char) &&
            !validChars.includes(char.toLowerCase())
        ) {
            return {
                type: "error",
                errCode: 3,
                category: "email",
                char: char,
            };
        }
    }

    return {
        type: "success",
        errCode: 0,
    };
}

export function validateUsername(username) {
    const validChars = "qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_-+=";

    if (username.length > 32) {
        return {
            type: "error",
            errCode: 2,
            category: "username",
        };
    }

    for (let i = 0; i < username.length; i++) {
        let char = username[i];

        if (
            !validChars.includes(char) &&
            !validChars.includes(char.toLowerCase())
        ) {
            return {
                type: "error",
                errCode: 1,
                category: "username",
                char: char,
            };
        }
    }
    return {
        type: "success",
        errCode: 0,
    };
}

export default { validatePassword, validateEmail, validateUsername };
