const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

// ================= USERS TABLE =======================
// inserting new user
module.exports.addNewUser = (firstname, lastname, email, password_hash) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [firstname, lastname, email, password_hash];
    return db.query(q, params);
};

// log info of already registered user
module.exports.getLogInfo = (email) => {
    const q = `
    SELECT id, password_hash, email
    FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

// get user info
module.exports.getUserInfo = (id) => {
    const q = `
    SELECT first_name, last_name, prof_pic_url, bio
    FROM users
    WHERE id=$1`;
    const params = [id];
    return db.query(q, params);
};

// updating password
module.exports.updatePassword = (password_hash, email) => {
    const q = `
    UPDATE users 
    SET password_hash = $1
    WHERE email = $2`;
    const params = [password_hash, email];
    return db.query(q, params);
};

// add new profile picture url
module.exports.addProfilePic = (url, id) => {
    const q = `
    UPDATE users 
    SET prof_pic_url = $1
    WHERE id = $2
    RETURNING prof_pic_url`;
    const params = [url, id];
    return db.query(q, params);
};

// add bio info
module.exports.addBio = (bio, id) => {
    const q = `
    UPDATE users 
    SET bio = $1
    WHERE id = $2
    RETURNING bio`;
    const params = [bio, id];
    return db.query(q, params);
};

// get other user info
module.exports.getOtherUser = (id) => {
    const q = `
    SELECT first_name, last_name, prof_pic_url, bio
    FROM users
    WHERE id=$1`;
    const params = [id];
    return db.query(q, params);
};

// getting most recent users for user search
module.exports.getRecentUsers = () => {
    const q = `
    SELECT id, first_name, last_name, prof_pic_url
    FROM users
    ORDER BY id DESC
    LIMIT 5`;
    return db.query(q);
};

// getting searched link
module.exports.getUsersByName = (name) => {
    const q = `
    SELECT id, first_name, last_name, prof_pic_url
    FROM users
    WHERE first_name ILIKE $1 OR last_name ILIKE $1
    LIMIT 5`;
    const params = [name + "%"];
    return db.query(q, params);
};

module.exports.checkFriendship = (recipient_id, sender_id) => {
    const q = `
    SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

// =============== RESET_CODES TABLE =====================
// reset password code
module.exports.addResetCode = (user_email, code) => {
    const q = `
    INSERT INTO reset_codes (user_email, code)
    VALUES ($1, $2)
    ON CONFLICT (user_email)
    DO UPDATE SET code=$2`;
    const params = [user_email, code];
    return db.query(q, params);
};

// getting/verifying the reset code
module.exports.verifyResetCode = (user_email) => {
    const q = `
    SELECT *
    FROM reset_codes
    WHERE user_email = $1
    `;
    const params = [user_email];
    return db.query(q, params);
};

// AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes;' PROBLEMATIC LINE!!!
