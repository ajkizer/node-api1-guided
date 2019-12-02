const express = require("express");
const hubsModel = require("./data/hubs-model.js");
const server = express();
server.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`Server started on port ${port}`));

server.get("/", (req, res) => {
  res.send("hello node 24");
});

server.get("/hubs", (req, res) => {
  hubsModel
    .find()
    .then(hubs => res.send(hubs))
    .catch(error => res.send(error));
});

server.post("/hubs", (req, res) => {
  const hubsData = req.body;
  hubsModel
    .add(hubsData)
    .then(hub => res.json(hub))
    .catch(error => res.send({ message: "Error" }));
});

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;
  hubsModel
    .remove(id)
    .then(hub => {
      res.json(hub);
    })
    .catch(error => {
      res.json({ message: "error" });
    });
});

server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  hubsModel
    .update(id, changes)
    .then(hub => res.json(hub))
    .catch(error => {
      res.json({ message: "error" });
    });
});
