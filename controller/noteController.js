var noteDB = require('../services/noteStore');
var darkStyle = false;
var showFinished = true;
var orderBy = {"importance":false, "reverseOrderImportance":false,
               "endDate":false, "reverseOrderEndDate":false,
               "createdDate":false, "reverseOrderCreatedDate":false};

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
    switchOrder("importance");

    orderBy["importance"] = true;
    orderBy["endDate"] = false;
    orderBy["createdDate"] = false;
    res.redirect('/');
};

module.exports.sortEndDate = function (req, res) {
    switchOrder("endDate");

    orderBy["importance"] = false;
    orderBy["endDate"] = true;
    orderBy["createdDate"] = false;
    res.redirect('/');
};

module.exports.sortCreatedDate = function (req, res) {
    switchOrder("createdDate");

    orderBy["importance"] = false;
    orderBy["endDate"] = false;
    orderBy["createdDate"] = true;
    res.redirect('/');
};

module.exports.showFinished = function (req, res) {
    showFinished = !showFinished;
    res.redirect('/');
};

function renderIndex(res, data) {
    res.render('index', {allNotes: data, dark: darkStyle, showFinished: showFinished});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function renderNote(res, data) {
    res.render('newNote', {withNote: true, note: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function switchOrder(name) {
    if(orderBy[name]) {
        var upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
        orderBy["reverseOrder" + upperCaseName] = !orderBy["reverseOrder" + upperCaseName];
    }
}