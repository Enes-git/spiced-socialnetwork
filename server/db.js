const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

// ================= INSERTS =======================
// inserting new user
module.exports.addNewUser = (firstname, lastname, email, hashedPassword) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password_hash )
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [firstname, lastname, email, hashedPassword];
    return db.query(q, params);
};

// log info of already registered user
module.exports.getLogInfo = (email) => {
    const q = `
    SELECT id, password_hash
    FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

// reset password code
module.exports.addResetCode = (email, code) => {
    const q = `
    INSERT INTO reset_codes (user_email, code)
    VALUES ($1, $2)
    `;
    const params = [email, code];
    return db.query(q, params);
};

// getting/verifying the reset code
module.exports.verifyResetCode = (email) => {
    const q = `
    SELECT user_email, code
    FROM reset_codes
    WHERE user_email = $1`;
    const params = [email];
    return db.query(q, params);
};

// updating password
module.exports.updatePassword = (email, password_hash) => {
    const q = `
    UPDATE users 
    SET password_hash = $1
    WHERE email = $2`;
    const params = [email, password_hash];
    return db.query(q, params);
};
