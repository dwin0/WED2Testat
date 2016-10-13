var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');


router.get('/', notes.showIndex);
router.get('/notes', notes.getNewNote);
router.post('/notes', notes.addNewNote);
router.get('/notes/:id/', notes.getNode);
router.post('/notes/:id', notes.update); //TODO: put
router.delete('/notes/:id', notes.removeNote);



module.exports = router;
