const http = require('http');
const mysql = require("mysql");
const POST = "POST";
const GET = "GET";

const db = mysql.createConnection({
    host: "localhost",
    user: "littlefa_root",
    password: "Root-0327",
    database: "littlefa_COMP4537"
});

db.connect(function (err) {
    if (err) {
        throw err;
    }
});

function post(quote, source){
    return new Promise(function (resolve, reject) {
        db.query(
            `INSERT INTO quotes (quote, source) VALUES ("${quote}", "${source}")`,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function reset() {
    return new Promise(function (resolve, reject) {
        db.query(
            `Truncate table quotes`,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    });
}

const server = http.createServer(async function (req, res) {
    let url = req.url;

    res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Methods" : "*"});


    if (req.method === POST && url === "/COMP4537/assignments/individual/quote/") {
        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Methods" : "*"});
        let data = "";
        let json = {};
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", async () => {
            json = JSON.parse(data);
            try {
                await post(json["quote"], json["source"]);
                res.write(json["quote"], json["source"]);
            } catch (err) {
                res.write(console.log(err));
            }
        });

        res.end();

    } else if (req.method === POST && url === "/COMP4537/assignments/individual/reset/") {
        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Methods" : "*"});
        try {
            await reset();
            res.end();
        } catch (err) {
            res.end(console.log(err));
        }
    } else if (req.method === GET && url === "/COMP4537/assignments/individual/quotes/") {
        db.query(
            `SELECT * FROM quotes`,
            (err, result) => {
                if (err) throw err;
                res.end(JSON.stringify(result));
            });
    } else if (req.method === GET && url === "/COMP4537/assignments/individual/quotes/1/") {
        db.query(
            `SELECT * FROM quotes ORDER BY id DESC LIMIT 1`,
            (err, result) => {
                if (err) throw err;
                res.end(JSON.stringify(result));
            });
    } else {

        res.end();
    }
});

server.listen();