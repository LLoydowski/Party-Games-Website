async function login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const url = `/login`;

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    }).then((resp) => resp.json());

    console.log(response);
}
