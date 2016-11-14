var noteDB = require('../services/noteStore');
var darkStyle = false;
var importanceActivated = false;
var endDateActivated = false;
var createdDateActivated = false;
var showFinished = true;
var orderBy;
var orderImportance = 1;
var orderEndDate = -1;
var orderCreatedDate = -1;

module.exports.showIndex = function (req, res) {
    noteDB.all(renderIndex, res, orderBy, showFinished);
};

module.exports.getNewNote = function (req, res) {
    res.render('newNote', {dark: darkStyle});
};

module.exports.addNewNote = function (req, res) {
    noteDB.add(req);
    res.redirect('/');
};

module.exports.getNote = function (req, res) {
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
    orderImportance *= -1;
    orderBy = {importance: orderImportance};
    importanceActivated = true;
    endDateActivated = false;
    createdDateActivated = false;
    res.redirect('/');
};

module.exports.sortEndDate = function (req, res) {
    orderEndDate *= -1;
    orderBy = {endDate: orderEndDate};
    importanceActivated = false;
    endDateActivated = true;
    createdDateActivated = false;
    res.redirect('/');
};

module.exports.sortCreatedDate = function (req, res) {
    orderCreatedDate *= -1;
    orderBy = {createdDate: orderCreatedDate};
    importanceActivated = false;
    endDateActivated = false;
    createdDateActivated = true;
    res.redirect('/');
};

module.exports.showFinished = function (req, res) {
    showFinished = !showFinished;
    res.redirect('/');
};

function renderIndex(res, data) {
    res.render('index', {allNotes: data, dark: darkStyle, showFinished: showFinished, importanceActivated: importanceActivated,
    endDateActivated: endDateActivated, createdDateActivated: createdDateActivated});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function renderNote(res, data) {
    res.render('newNote', {withNote: true, note: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}