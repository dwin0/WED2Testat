var noteDB = require('../services/noteStore');
var darkStyle = false;
var importanceSorting = false;
var finishedDateSorting = false;
var createdDateSorting = false;
var showFinished = false;

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

module.exports.sortImportance = function (req, res) {
    importanceSorting = !importanceSorting;
    res.redirect('/');
};

module.exports.sortFinishedDate = function (req, res) {
    finishedDateSorting = !finishedDateSorting;
    res.redirect('/');
};

module.exports.sortCreatedDate = function (req, res) {
    createdDateSorting = !createdDateSorting;
    res.redirect('/');
};

module.exports.showFinished = function (req, res) {
    showFinished = !showFinished;
    res.redirect('/');
};

function renderIndex(res, data) {
    res.render('index', {allNotes: data, dark: darkStyle, importance: importanceSorting,
        finishedDate: finishedDateSorting, createdDate: createdDateSorting, showFinished: showFinished});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function renderNote(res, data) {
    res.render('newNote', {note: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}