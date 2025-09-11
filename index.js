import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const baseurl = "http://127.0.0.1:80"


//Router Laden
import {router as AchievementRouter} from "./Backend/routes/Achievements/script.js"
import {router as ScoreRouter} from "./Backend/routes/Score/script.js"
import {router as UserRouter} from "./Backend/routes/User-Register/script.js"
import {router as SaveRouter} from "./Backend/routes/Save/script.js"

//Setting Variables
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Ports Definieren //! Set host port on "httpsPort" and activate HTTPS
const httpPort = 80;
const httpsPort = 2005;

// SSL-Zertifikate laden
const certPath = path.join(__dirname, 'Cert');
const privateKey = fs.readFileSync(path.join(certPath, 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(certPath, 'cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };


app.use('/', express.static(path.join(__dirname, 'Frontend', 'Landing')));
app.use('/login', express.static(path.join(__dirname, 'Frontend', 'login')));
// app.use('/admin', express.static(path.join(__dirname, 'Frontend', 'admin-login')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'Landing', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'login', 'login.html'));
});
// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Frontend', 'admin-login', 'main.html'));
// });

app.use("/api/advancements", AchievementRouter)
app.use("/api/score", ScoreRouter)
app.use("/api/user", UserRouter)
app.use("/api/storage", SaveRouter)

// app.get('/Main', (req, res) => {res.redirect('/')});
// app.use("", (req, res) => {res.redirect('/')})


// //HTTP-Server
http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`);
});

// // HTTPS-Server
https.createServer(credentials, app).listen(httpsPort, () => {
  console.log(`HTTPS server running on port ${httpsPort}`);
});


// Log
function Time() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}      `;
}

const originalLog = console.log;

if (!fs.existsSync('./LOG')) {
  fs.mkdirSync('./LOG', { recursive: true });
}

console.log = function(message, ...optionalParams) {
  fs.createWriteStream("./LOG/LOG_" + (new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-" + String(new Date().getDate()).padStart(2, '0') + ".log", { flags: 'a' }).write(Time() + message + " " + optionalParams.join(' ') + "\n");
  originalLog(Time() + message, ...optionalParams);
};

fetch(baseurl + "/api/storage/load")

console.log("Server Startup!")

export default app