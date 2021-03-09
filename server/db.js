const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

// ================= INSERTS =======================
// inserting new user
module.exports.addNewUser = (first_name, last_name, email, password_hash) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password_hash )
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [first_name, last_name, email, password_hash];
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
