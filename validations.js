function validatePassword(password) {
    const letters = "qwertyuiopasdfghjklzxcvbnm";
    const numbers = "1234567890";
    const specialSigns = "!@#$%^&*()_-+=";

    const len = password.length;

    if (len < 8 || len > 32) {
        return {
            type: "error",
            errCode: 1,
        };
    }

    let numberAndSpecialCounter = 0;

    for (let i = 0; i < password.length; i++) {
        let char = password[i];
        console.log(char);

        if (numbers.includes(char)) {
            numberAndSpecialCounter++;
        } else if (specialSigns.includes(char)) {
            numberAndSpecialCounter++;
        } else if (
            letters.includes(char) ||
            letters.includes(char.toUpperCase())
        ) {
        } else {
            return {
                type: "error",
                errCode: 3,
                char: char,
            };
        }
    }

    if (numberAndSpecialCounter < 3) {
        return {
            type: "error",
            errCode: 2,
        };
    }

    return {
        type: "success",
        errCode: 0,
    };
}

function validateEmail(email) {
    const validChars = "qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_-+=.";

    if (username.lenght > 64) {
        return {
            type: "error",
            errCode: 4,
        };
    }

    if (!email.includes("@")) {
        return {
            type: "error",
            errCode: 1,
        };
    }

    if (!email.includes(".")) {
        return {
            type: "error",
            errCode: 2,
        };
    }

    for (let i = 0; i < email.length; i++) {
        let char = email[i];

        if (
            !validChars.includes(char) &&
            !validChars.includes(char.toUpperCase())
        ) {
            return {
                type: "error",
                errCode: 3,
                char: char,
            };
        }
    }

    return {
        type: "success",
        errCode: 0,
    };
}

function validateUsername(username) {
    const validChars = "qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_-+=";

    if (username.lenght > 32) {
        return {
            type: "error",
            errCode: 2,
        };
    }

    for (let i = 0; i < username.length; i++) {
        let char = username[i];

        if (
            !validChars.includes(char) &&
            !validChars.includes(char.toUpperCase())
        ) {
            return {
                type: "error",
                errCode: 1,
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
