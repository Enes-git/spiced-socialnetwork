const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

// ================= USERS TABLE =======================
// inserting new user
module.exports.addNewUser = (firstname, lastname, email, password_hash) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password_hash )
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

// get user info - this should be merged with getLogInfo ????????????????????????
module.exports.getUserInfo = (id) => {
    const q = `
    SELECT first_name, last_name, email
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
