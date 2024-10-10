"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var nanoid_1 = require("nanoid");
var port = 7000;
var domain = "http://localhost:".concat(port);
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Tallennetaan pitkä ja lyhyt URL tänne
var shortURLs = {};
var keySet = new Set();
// Palvelu joka lyhentää pitkän URL:n ja tallentaa sen muistiin.
app.post("/urlshorter", function (req, res) {
    console.log("Server API urlshorter called");
    var longUrl = req.body.url;
    if (!longUrl)
        throw new Error("Pitkä URL on pakollinen");
    if (!/^http(s){0,1}:\/\//.test(longUrl))
        throw new Error("URL:n täytyy sisältää protokolla eli 'http://' or 'https://'");
    // Avain URL:en tallennuksen ja URL kryptataan 5 merkin pituiseksi
    var key = (0, nanoid_1.nanoid)(5);
    if (keySet.has(key))
        throw new Error("Avaimesta löytyy jo duplikaatti");
    keySet.add(key);
    shortURLs[key] = longUrl;
    var shortUrl = "".concat(domain, "/").concat(key);
    res.status(200).send({ shortUrl: shortUrl });
});
var errorHandler = function (err, _, res, __) {
    var status = err.status || 404;
    res.status(status).send(err.message);
};
app.use(errorHandler);
app.listen(port, function () { return console.log("Short URL kuuntelee portissa ".concat(port)); });
