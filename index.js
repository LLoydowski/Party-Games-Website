import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";

const app = express();

const GAME_ID_SIZE = 10;
let games = [];

function generateGameID() {
    const chars =
        "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let id = "";

    // do {
    for (let i = 0; i < GAME_ID_SIZE; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        let char = chars[randomIndex];

        id += char;
    }
    // } while (
    //     () => {
    //         games.forEach((game) => {
    //             if (game.id == id) {
    //                 return false;
    //             }
    //         });

    //         return false;
    //     }
    // );

    return id;
}

function writeLogs() {
    let data = [];
    games.forEach((game) => {
        let playerList = [];

        game.players.forEach((player) => {
            let playerData = {
                name: player.name,
                id: player.id,
            };
            playerList.push(playerData);
        });

        let gameData = {
            type: game.type,
            maxPlayers: game.maxPlayers,
            id: game.id,
            players: playerList,
        };

        data.push(gameData);
    });

    writeFile("logs/games.json", JSON.stringify(data));
}

class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

class GameLobby {
    constructor(type, maxPlayers) {
        this.type = type;
        this.maxPlayers = maxPlayers;
        this.players = [];
        this.id = generateGameID();
    }
    playerJoin(player) {
        this.players.push(player);
    }
    playerLeave(removedPlayerID) {
        this.players.filter((player) => player.id != removedPlayerID);
    }
}

async function writeFile(path, data) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(`Error writing file at ${path}`);
            return;
        }

        console.log("File written succesfully");
    });
}

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log(req.query);

    let nick = req.cookies["nick"];

    res.render("lobbies.ejs", { nick: nick });
});

app.get("/createlobby", (req, res) => {
    console.log(req.query);

    let nick = req.cookies["nick"];

    res.render("createLobby.ejs", { nick: nick });
});

app.post("/createtaboo", (req, res) => {
    const reqBody = req.body;

    let game = new GameLobby("taboo", reqBody["maxPlayers"]);

    games.push(game);

    writeLogs();
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
    const reqBody = req.body;

    const username = reqBody["username"];
    const email = reqBody["email"];
    const password = reqBody["password"];

    console.log(username, email, password);
});

app.listen(7676, () => {
    console.log("Example app listening on port 7676");
});
