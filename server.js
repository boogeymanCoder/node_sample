const express = require("express");
const app = express();

app.use(express.json());

// get, post, put, delete

const db_array = [];

app.get("/", (req, res) => {
  res.send(db_array);
  // res.send("hello world!");
});

app.post("/", (req, res) => {
  const data = req.body;

  //   adds data to database
  //   depends on used database
  db_array.push(data);

  console.log("Data Received:", data);
  res.send(data);
});

app.patch("/:id", (req, res) => {
  const id = req.params.id;

  //   get name from database with the same id of req.params.id
  //   depends on used database
  const nameToUpdate = db_array.find((nameInDb) => {
    return nameInDb.id == id;
  });

  const data = req.body;

  //   change name data
  nameToUpdate.firstname = data.firstname
    ? data.firstname
    : nameToUpdate.firstname;

  // if (data.firstname) {
  //   nameToUpdate.firstname = data.firstname;
  // } else {
  //   nameToUpdate.firstname = nameToUpdate.firstname;
  // }

  nameToUpdate.middlename = data.middlename
    ? data.middlename
    : nameToUpdate.middlename;
  nameToUpdate.lastname = data.lastname ? data.lastname : nameToUpdate.lastname;

  res.send(nameToUpdate);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;

  //   get name from database with the same id of req.params.id
  //   depends on used database
  const nameToUpdateIndex = db_array.findIndex((nameInDb) => {
    return nameInDb.id == id;
  });

  const data = req.body;

  //   change name data
  db_array[nameToUpdateIndex] = data;

  res.send(db_array[nameToUpdateIndex]);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;

  //   get name from database with the same id of req.params.id
  //   depends on used database
  const nameToDelete = db_array.find((nameInDb) => {
    return nameInDb.id == id;
  });

  //    delete nameToDelete from db_array
  //   depends on db used
  db_array.splice(
    db_array.findIndex((nameInDb) => {
      return nameInDb.id == id;
    })
  );

  res.send(nameToDelete);
});

app.listen(3000);
