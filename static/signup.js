const warningDiv = document.querySelector(".warning");

function generateWarningMessage(category, errCode, char = "") {
    if (char == " ") {
        char = "*SPACE*";
    }

    const errorCodeTranslation = {
        username: {
            1: `Your username contains ${char} sign`,
            2: `Your username is too long (max 32 characters)`,
        },
        email: {
            1: `Your email doesn't contain "@" sign`,
            2: `Your email doesn't contain "." sign`,
            3: `Your email contains ${char} sign`,
            4: `Your email is too long (max 64 characters)`,
        },
        password: {
            1: `Your password is too short or too long (8 - 32 characters)`,
            2: `Your password doesn't contain enough special signs / numbers (min. 3)`,
            3: `Your password contains ${char} sign`,
        },
    };

    const warningCategory = errorCodeTranslation[category];
    const message = warningCategory[errCode];

    return message;
}

async function createAccount() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const url = `/signup`;

    warningDiv.classList.remove("shown");

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    }).then((resp) => resp.json());

    console.log(response);

    if (response.type == "error") {
        const warningMessage = generateWarningMessage(
            response.category,
            response.errCode,
            response.char
        );

        console.log(warningMessage);

        warningDiv.children[1].textContent = warningMessage;
        showWarning();
    }
}

warningDiv.addEventListener("click", hideWarning);

function showWarning() {
    warningDiv.classList.add("shown");
}

function hideWarning() {
    const warningDiv = document.querySelector(".warning");

    warningDiv.classList.remove("shown");
}
