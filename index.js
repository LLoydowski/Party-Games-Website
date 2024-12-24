import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));

app.get("/", (req, res) => {
    console.log(req.query);
    res.render("lobbies.ejs", { textVisible: "textInvisible" });
});

app.get("/createlobby", (req, res) => {
    res.render("createLobby.ejs", { textVisible: "textInvisible" });
});

app.listen(7676, () => {
    console.log("Example app listening on port 7676");
});
