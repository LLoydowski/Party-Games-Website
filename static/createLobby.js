async function createLobby(type) {
    const url = `/create${type}`;

    const data = {
        maxPlayers: 4,
    };

    let fetchPromise = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    console.log(fetchPromise);
}

function showCreateUI() {}
