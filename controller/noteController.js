var noteDB = require('../services/noteStore');
var darkStyle = false;
var showFinished = true;
var orderBy = [{"importance":false, "reverseOrder":false},
               {"endDate":false, "reverseOrder":false},
               {"createdDate":false, "reverseOrder":false}];

module.exports.showIndex = function (req, res) {
    console.log("importance order: " + orderBy[0].importance + " endDate order: " + orderBy[1].endDate + " createdDate order: " + orderBy[2].createdDate);
    console.log("imp reverse: " + orderBy[0].reverseOrder + " end reverse: " + orderBy[1].reverseOrder + " created reverse: " + orderBy[2].reverseOrder);
    noteDB.all(renderIndex, res, orderBy, showFinished);
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
    if(orderBy[0].importance){
        orderBy[0].reverseOrder = !orderBy[0].reverseOrder;
    }

    orderBy[0].importance = true;
    orderBy[1].endDate = false;
    orderBy[2].createdDate = false;
    res.redirect('/');
};

module.exports.sortEndDate = function (req, res) {
    if(orderBy[1].endDate) {
        orderBy[1].reverseOrder = !orderBy[1].reverseOrder;
    }

    orderBy[0].importance = false;
    orderBy[1].endDate = true;
    orderBy[2].createdDate = false;
    res.redirect('/');
};

module.exports.sortCreatedDate = function (req, res) {
    if(orderBy[2].createdDate) {
        orderBy[2].reverseOrder = !orderBy[2].reverseOrder;
    }

    orderBy[0].importance = false;
    orderBy[1].endDate = false;
    orderBy[2].createdDate = true;
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
    res.render('newNote', {note: data, dark: darkStyle});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}