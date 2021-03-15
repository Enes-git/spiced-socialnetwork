const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
const db = require("./db");
const csurf = require("csurf");
const { sendEmail } = require("./utils/ses");
const crs = require("crypto-random-string");
const s3 = require("./utils/s3");
const { s3Url } = require("../server/utils/config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");

// ==== setting storage place and limitations =====
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4097152,
    },
});

// =======================
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

// adding csurf token
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// defining req.body
app.use(express.urlencoded({ extended: false }));

// securing the communication
app.use(express.json());

// ============================
//   ======= ROUTES ==========
app.get("/user/:id", (req, res) => {
    const { requestedId } = req.body;
    db.getOtherUser(requestedId)
        .then(({ rows }) => {
            // if(success){go for it} else{go back to your page}
            rows[0].requestingId = req.session.userId;
            res.json({ rows });
        })
        .catch((err) => {
            console.log("err in /user/:id db.getOtherUser :>> ", err);
            res.json({ success: false });
        });
});

app.post("/updateBio", (req, res) => {
    // console.log("req.body :>> ", req.body);
    const { bio } = req.body;
    db.addBio(bio, req.session.userId)
        .then(({ rows }) => {
            // console.log("rows :>> ", rows);
            res.json({ rows });
        })
        .catch((err) => {
            console.log("err in /updateBio db.addBio :>> ", err);
            res.json({ success: false });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("hit the post route....");
    console.log("req.file :>> ", req.file);

    const { filename } = req.file;
    let url = s3Url + filename;

    db.addProfilePic(url, req.session.userId)
        .then((result) => {
            console.log("result from db.addProfPic :>> ", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log('err in route "/upload" addNewImage :>> ', err);
            res.json({
                success: false,
            });
        });
});

app.get("/user", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(({ rows }) => {
            // console.log("rows[0] :>> ", rows[0]);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("err in get/user route db.getUserInfo :>> ", err);
            res.json({ success: false });
        });
});

app.post("/password_reset/start", (req, res) => {
    const { email } = req.body;
    db.getLogInfo(email)
        .then(({ rows }) => {
            if (!rows.length) {
                console.log("err in rows :>> ", rows);
                return res.json({ success: false });
            }
            const code = crs({ length: 6 });
            db.addResetCode(email, code)
                .then(() => {
                    sendEmail(
                        "delicious.unicorn@spicedling.email",
                        "Reset Your Cool Rocker Password",
                        "We saw that you are too much focused on the cool tones and forgot your password to Rocker World! So here is a new key to set another cool password. Beware! This code will expire in 10 minutes! Your reset code is: " +
                            code
                    )
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log(
                                "err in post/reset sendEmail :>> ",
                                err
                            );
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log("err in post/reset db.addResetCode :>> ", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in post/reset db.getLogInfo :>> ", err);
            res.json({ success: false });
        });
});

app.post("/password_reset/verify", (req, res) => {
    // console.log("req.body :>> ", req.body);
    const { email, password } = req.body;
    const incomingCode = req.body.code;
    db.verifyResetCode(email)
        .then(({ rows }) => {
            // console.log("rows from verify reset code :>> ", rows);
            const { user_email, code } = rows[0];
            if (user_email === email && code === incomingCode) {
                hash(password)
                    .then((hashedPassword) => {
                        return db
                            .updatePassword(hashedPassword, email)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "err in post/verify db.updatePassword :>> ",
                                    err
                                );
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "err in post/verify pasword hashing :>> ",
                            err
                        );
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in post/verify db.verifyResetCode :>> ", err);
            res.json({ success: false });
        });
});

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
        res.json({ success: false, error: true });
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

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email == "" || password == "") {
        res.json({ success: false, error: true });
    }
    db.getLogInfo(email)
        .then(({ rows }) => {
            // console.log("rows :>> ", rows);
            const { id, password_hash } = rows[0];
            return compare(password, password_hash)
                .then((match) => {
                    if (match) {
                        req.session.userId = id;
                        res.json({ success: true });
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch((err) => {
                    console.log("err in password matching :>> ", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in post/login db.getLogInfo :>> ", err);
            res.json({ success: false });
        });
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
