import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

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

app.get("/", (req, res) => {
    console.log(req.query);
    res.render("lobbies.ejs", { textVisible: "textInvisible" });
});

app.get("/createlobby", (req, res) => {
    res.render("createLobby.ejs", { textVisible: "textInvisible" });
});

app.post("/createtaboo", (req, res) => {
    const reqBody = req.body;

    writeFile("req.json", JSON.stringify(reqBody));
});

app.listen(7676, () => {
    console.log("Example app listening on port 7676");
});
