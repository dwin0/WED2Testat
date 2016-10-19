var noteDB = require('../services/noteStore');
var darkStyle = false;

module.exports.showIndex = function (req, res) {
    noteDB.all(renderIndex, res);
};

module.exports.getNewNote = function (req, res) {
    res.render('newNote', {dark: darkStyle});
};

module.exports.addNewNote = function (req, res) {
    noteDB.add(req);
    res.redirect('/');
};

module.exports.getNode = function (req, res) {
    noteDB.get(req, res, renderNote);
};

module.exports.update = function (req, res) {
    noteDB.update(req, function () {
        res.redirect('/');
    });
};

module.exports.removeNote = function (req, res) {
    noteDB.remove(req.params.id, function () {
        res.redirect('/');
    });
};

module.exports.changeStyle = function (req, res) {
    darkStyle = !darkStyle;
    res.redirect('/');
};

function renderIndex(response, data) {
    response.render('index', {allNotes: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function renderNote(response, data) {
    response.render('newNote', {note: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}