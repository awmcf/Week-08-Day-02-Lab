const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {  // SHOW ALL
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.get('/:id', (req, res) => {  // FIND BY ID
    const id = req.params.id;
    collection
    .findOne({ _id: ObjectID(id) })
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.delete('/:id', (req, res) => {  // DELETE
    const id = req.params.id;
    collection
    .deleteOne({ _id: ObjectID(id) })
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.post('/', (req, res) => { // SAVE
    const newData = req.body;
    collection
    .insertOne(newData)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.put('/:id', (req, res) => { // EDIT UPDATE
    const id = req.params.id;
    const updatedData = req.body;
    collection
    .updateOne (
      {_id: ObjectID(id)},
      { $set: updatedData}
    )
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

return router;

};

module.exports = createRouter;
