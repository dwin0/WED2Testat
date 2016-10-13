var noteDB = require('../services/noteStore');

module.exports.showIndex = function (req, res) {
    noteDB.all(renderIndex, res);
};

module.exports.getNewNote = function (req, res) {
    res.render('newNote');
};

module.exports.addNewNote = function (req, res) {
    noteDB.add(req);
    noteDB.all(renderIndex, res);
};

module.exports.getNode = function (req, res) {
    noteDB.get(req, res, renderNote);
};

module.exports.update = function (req, res) {
    noteDB.update(req, res, function () {
        res.redirect('/');
    });
};

module.exports.removeNote = function (req, res) {
    noteDB.remove(renderIndex, req.params.id, res);
};

function renderIndex(response, data) {
    response.render('index', {notes: data});
}

function renderNote(response, data) {
    response.render('newNote', {note: data});
}