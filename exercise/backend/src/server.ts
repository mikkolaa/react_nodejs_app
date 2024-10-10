import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const port = 7000;
const domain = `http://localhost:${port}`;
const app = express();

app.use(cors());
app.use(express.json());

// Tallennetaan pitkä ja lyhyt URL tänne
const shortURLs: { [key: string]: string } = {}; 
const keySet: Set<string> = new Set();

// Palvelu joka lyhentää pitkän URL:n ja tallentaa sen muistiin.
app.post("/urlshorter", (req, res) => {
  console.log("Server API urlshorter called");
  const longUrl = req.body.url;
  if (!longUrl) 
	throw new Error("Pitkä URL on pakollinen");
  if (!/^http(s){0,1}:\/\//.test(longUrl)) 
 	throw new Error("URL:n täytyy sisältää protokolla eli 'http://' or 'https://'");
  // Avain URL:en tallennuksen ja URL kryptataan 5 merkin pituiseksi
  const key = nanoid(5);
  if (keySet.has(key)) 
	throw new Error("Avaimesta löytyy jo duplikaatti");

  keySet.add(key);
  shortURLs[key] = longUrl;
  const shortUrl = `${domain}/${key}`;
  res.status(200).send({ shortUrl });
});

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  const status = err.status || 404;
  res.status(status).send(err.message);
};
app.use(errorHandler);

app.listen(port, () => console.log(`Short URL kuuntelee portissa ${port}`));
