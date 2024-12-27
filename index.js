import cookieParser from "cookie-parser";
import express from "express";
import fs, { promises } from "fs";

const app = express();

const GAME_ID_SIZE = 10;
const USERS_DATA_PATH = "data/users.json";
let games = [];

function generateGameID() {
    const chars =
        "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let id = "";

    do {
        id = "";
        for (let i = 0; i < GAME_ID_SIZE; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            let char = chars[randomIndex];

            id += char;
        }
    } while (games.some((game) => game.id === id));

    return id;
}

function generatePlayerID() {
    const chars =
        "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let id = "";

    let players = readFile(USERS_DATA_PATH);

    do {
        id = "";
        for (let i = 0; i < GAME_ID_SIZE; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            let char = chars[randomIndex];

            id += char;
        }
    } while (players.some((player) => player.id === id));

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

function readFile(path) {
    let data = fs.readFileSync(path, { encoding: "utf8" });

    return data;
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

    console.log(games.length);

    writeLogs();
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
    const reqBody = req.body;

    const username = reqBody["username"];
    const email = reqBody["email"];
    const password = reqBody["password"];

    let users = JSON.parse(readFile(USERS_DATA_PATH));

    console.log(users);

    let user = {
        username: username,
        email: email,
        password: password,
        id: "static",
    };

    users.push(user);

    writeFile(USERS_DATA_PATH, JSON.stringify(users));
});

app.listen(7676, () => {
    console.log("Example app listening on port 7676");
});
