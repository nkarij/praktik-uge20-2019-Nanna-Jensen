
<!-- sættes ind i app.js -->

const express = require('express');
const app = express();

app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

require('./routes/index')(app);

app.listen(3333);
console.log(`Serveren er startet på http://localhost:3333`);

<!-- sættes ind i routes/index.js -->

<!-- NB dette er en demo-database -->
const mysql = require('mysql2');

const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'franksdemo'
});

<!-- her gemmes database-resultatet i et module -->
module.exports = function (app) {

<!-- eksempel på simpel route af text -->
    app.get('/', function (req, res) {
        res.send("Frank")
    });

<!-- route af JSON objekt -->
<!-- husk at tilføje /getuser i browserens url -->
    app.get('/getUser', function (req, res) {
 <!-- JSON objektet skrives inde i app.get kommando  -->
        let user = {
            "firstname": "Frank",
            "lastname": "Goldmann"
        }
        res.send(user)
    })

<!-- jer routes en kommando til databasen -->
    app.get('/getAllUsers', function (req, res) {
        db.query('SELECT * FROM bruger', function (err, rows) {
            if (err) {
                console.log(`fejl: ${err}`)
                console.log(rows);
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    })

}