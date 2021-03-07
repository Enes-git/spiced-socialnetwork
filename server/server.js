const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash } = require("../server/utils/bc");
const cookieSession = require("cookie-session");
const db = require("./db");
const { urlencoded } = require("express");

// ==== MIDDLEWARES ======
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//  cookie session middleware
app.use(
    cookieSession({
        secret: `Hello underworld!`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

// defining req.body
app.use(express.urlencoded({ extended: false }));

// securing the communication
app.use(express.json());

// ======= ROUTES =======
app.get("/welcome", (req, res) => {
    // is going to run if the user puts /welcome in the url bar and make a cookie check to either redirect or render this page.
    if (req.session.userId) {
        res.redirect("/");
    } else {
        // send back HTML, which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.json({ success: false });
    } else {
        hash(password)
            .then((hashedPassword) => {
                return db
                    .addNewUser(firstname, lastname, email, hashedPassword)
                    .then(({ rows }) => {
                        // setting user cookie
                        req.session.userId = rows[0].id; // should i send this in res as well
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log(
                            "err in /registration db.addNewUser :>> ",
                            err
                        );
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log("err in /registration hash :>> ", err);
                res.json({ success: false });
            });
    }
});

app.get("*", function (req, res) {
    // runs if the user goes to literally any route except /welcome
    // and we are making a cookie check her as well to redirect them to welcome (if not logged in) or (if logged in) render the requested page
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        // this runs if the user is logged in
        // in which case send back the HTML, after which start js kicks in and renders our p tag...
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Listen, I will!");
});
