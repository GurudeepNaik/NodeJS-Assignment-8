const array = require("./InitialData");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here

let newId = array.length + 1;

app.get("/api/student/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Sucess",
      Students: array,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.get("/api/student/:id", async (req, res) => {
  try {
    const Idx = array.findIndex((obj) => obj.id == req.params.id);
    if (Idx == -1) {
      res.status(200).json({
        status: "Sucess",
        Students: "Invalid Student ID",
      });
    }
    res.status(200).json({
      status: "Sucess",
      Students: array[Idx],
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.post("/api/student/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.currentClass || !req.body.division) {
      res.status(500).json({
        status: "Failed",
        Students: "Incomplete Data",
      });
    }
    array.push({
      id: newId++,
      name: req.body.name,
      currentClass: req.body.currentClass,
      division: req.body.division,
    });
    res.status(200).json({
      status: "Sucess",
      Students: array[newId - 2],
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.put("/api/student/:id", async (req, res) => {
  try {
    const Idx = array.findIndex((obj) => obj.id == req.params.id);
    if (Idx == -1) {
      res.status(500).json({
        status: "Failed",
        Students: "Invalid Student ID",
      });
    }
    if (req.body.name) array[Idx].name = req.body.name;

    if (req.body.currentClass) array[Idx].currentClass = req.body.currentClass;

    if (req.body.division) array[Idx].division = req.body.division;
    res.status(200).json({
      status: "Sucess",
      Students: array[Idx],
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    const Idx = array.findIndex((obj) => obj.id == req.params.id);
    if (Idx == -1) {
      res.status(500).json({
        status: "Failed",
        Students: "Invalid Student ID",
      });
    }
    array.splice(Idx, Idx + 1);
    res.status(200).json({
      status: "Sucess",
      Students: "Data Has Been Deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
