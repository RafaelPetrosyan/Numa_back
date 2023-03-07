const experss = require("express");
const sqlite = require("sqlite3").verbose();
const cors = require("cors");
const app = experss();
app.use(experss.json());
app.use(cors());
const port = 3001;

const db = new sqlite.Database("data.db", (err) => {
  if (err) {
    console.log(err);
  } else console.log("no err");
});

app.get("/", (req, res) => {
  db.all("select * from item", [], (err, data) => {
    res.send(data);
  });
});

app.get("/item/:id", (req, res) => {
  const id = req.params.id;
  db.get("select * from item where id=?", [id], (err, data) => {
    res.send(data);
  });
});

app.post("/new", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imgSrc = req.body.imgSrc;

  db.run(
    "insert into item(title,description,price,imgSrc) values(?,?,?,?)",
    [title, description, price, imgSrc],
    () => {
      res.send("OK");
    }
  );
});

app.put('/update/:id', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imgSrc = req.body.imgSrc;
  const id = req.params.id;

  db.run('update item set title=?,description=?,price=?,imgSrc=? where id=?', [
    title,
    description,
    price,
    imgSrc,
    id
  ],() => {
    res.send('all is well')
  });
});

app.delete('/delete/:id',(req,res) => {
  const id = req.params.id
  db.get('delete from item where id =?',[id],(err,data) =>{
    res.send('Thank YOU ) ')
  })
})

app.listen(port);
