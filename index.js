import cookieParser from "cookie-parser";
import express from "express";

import {
    validateEmail,
    validatePassword,
    validateUsername,
} from "./validations.js";

import { writeFile, readFile } from "./fileManagement.js";

const app = express();

const GAME_ID_SIZE = 10;
const USER_ID_SIZE = 10;
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

    let players = JSON.parse(readFile(USERS_DATA_PATH));

    do {
        id = "";
        for (let i = 0; i < USER_ID_SIZE; i++) {
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

function getUserFromID(id) {
    const users = JSON.parse(readFile(USERS_DATA_PATH));

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.id == id) {
            return user;
        }
    }

    return "a";
}

function logUserIn(login, password) {
    const users = JSON.parse(readFile(USERS_DATA_PATH));

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.username == login || user.email == login) {
            if (user.password == password) {
                return {
                    type: "succes",
                    errCode: 0,
                    desc: "User logged in",
                    user: user,
                };
            }
            return {
                type: "error",
                errCode: 2,
                desc: "Wrong password",
            };
        }
    }

    return {
        type: "error",
        errCode: 1,
        desc: "No such user",
    };
}

function doesUserIDExist(id) {
    const users = JSON.parse(readFile(USERS_DATA_PATH));

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.id == id) {
            return true;
        }
    }

    return false;
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

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    const userID = req.cookies["userID"];
    const user = getUserFromID(userID);

    let nick = "";

    if (user == undefined) {
        nick = "";
    } else {
        nick = user.username;
    }

    res.render("lobbies.ejs", { nick: nick });
});

app.get("/createlobby", (req, res) => {
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
    const cookies = req.cookies;

    if (doesUserIDExist(cookies["userID"])) {
        res.redirect("/");
        return;
    }

    res.render("login.ejs");
});
app.get("/signup", (req, res) => {
    const cookies = req.cookies;

    if (doesUserIDExist(cookies["userID"])) {
        res.redirect("/");
    }

    res.render("signup.ejs");
});

app.post("/login", (req, res) => {
    const reqBody = req.body;

    const login = reqBody["login"].trim();
    const password = reqBody["password"].trim();

    const status = logUserIn(login, password);
    const user = status.user;

    res.cookie("userID", user.id);

    res.send(status);
});

app.post("/signup", async (req, res) => {
    const reqBody = req.body;

    const username = reqBody["username"].trim();
    const email = reqBody["email"].trim();
    const password = reqBody["password"].trim();

    let users = JSON.parse(readFile(USERS_DATA_PATH));

    const userID = generatePlayerID();

    const usernameValidation = validateUsername(username);
    if (usernameValidation.type == "error") {
        res.send(usernameValidation);
        return;
    }

    const emailValidation = validateEmail(email);
    if (emailValidation.type == "error") {
        res.send(emailValidation);
        return;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation.type == "error") {
        res.send(passwordValidation);
        return;
    }

    let user = {
        username: username,
        email: email,
        password: password,
        id: userID,
    };

    users.push(user);

    writeFile(USERS_DATA_PATH, JSON.stringify(users));

    res.cookie("userID", userID);

    res.send({
        type: "succes",
    });
});

app.listen(7676, () => {
    console.log("Example app listening on port 7676");
});
