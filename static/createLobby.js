async function createLobby(type) {
    const url = `/create${type}`;

    const data = {
        maxPlayers: 4,
    };

    let fetchPromise = fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    Promise.resolve(fetch).then(() => {
        console.log("Emm co do sigmy?");
    });
}

function showCreateUI() {}
