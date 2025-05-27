const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const chokidar = require('chokidar');
const cors = require('cors');
const fs = require('fs');

const jsonMg = require('./jsonmg.js');

const app = express();

app.use(cors());
app.use(express.json());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '../frontend'));

liveReloadServer.server.once("connection", () => {
  console.log("🔁 LiveReload client connected.");
});

const frontendPath = path.join(__dirname, '../frontend');

const watcher = chokidar.watch(frontendPath, {
  ignoreInitial: true,
  usePolling: true,
  interval: 100,
});

app.use(connectLivereload());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `../frontend/index.html`));
});

app.post('/api/data', (req, res) => {
  console.log('data: ', req.body);
  if (JSON.stringify(req.body) === JSON.stringify({})) {
    const jsonData = fs.readFileSync(`../data/perlin_noise_settup.json`, 'utf-8');
    const data = JSON.parse(jsonData);
    return res.json({ data });
  } else {
    const data = req.body;
    jsonMg.saveData(data);
  }
});

watcher.on('all', (event, filePath) => {
  liveReloadServer.refresh(filePath);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
