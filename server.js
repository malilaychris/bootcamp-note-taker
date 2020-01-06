const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    let db = JSON.parse(data);
    res.send(db);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    if(err) {
      throw err;
    }
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
    }
    json.push(note);

    fs.writeFile('db/db.json', JSON.stringify(json), (err) => {
      if(err) {
        throw err;
      }
      res.send(json);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {

  });
});