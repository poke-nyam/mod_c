const express = require("express");
const path = require("path");
const app = express();

// 静的ファイルの配信設定（複数回使うなら全部app.useで設定）
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "loc")));
app.use(express.static(path.join(__dirname, "img")));
app.use(express.static(path.join(__dirname, "snd")));
app.use(express.static(path.join(__dirname, "mod")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/log', express.json(), (req, res) => {
  console.log('Browser log:', req.body.log);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Running.");
});