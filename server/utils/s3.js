const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    // checking if multer failed
    if (!req.file) {
        console.log("req.file does not exist - multer fail");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(function () {
            next();

            // if you wanna delete it from uploads folder
            // fs.unlink(path, () => {});
        })
        .catch(function (err) {
            console.log("err in s3.putObject (upload)", err);
            res.sendStatus(500);
        });
};

// for account deletion
module.exports.delete = (filename) => {
    s3.deleteObject(
        {
            Bucket: "spicedling",
            Key: filename,
        },
        function (err, data) {
            if (err) console.log(err);
            else console.log(data);
        }
    );
};
