const express = require("express");
const path = require("path");
const cors = require("cors");
const quoteRoutes = require('./src/routes/quoteRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/quotes', quoteRoutes);

app.get("/", (req, res) => {
  res.send("API Citation en ligne !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
