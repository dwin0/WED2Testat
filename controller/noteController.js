var noteDB = require('../services/noteStore');

module.exports.showIndex = function (req, res) {
    var order = req.session.sortBy;
    var up = req.session.up;

    var orderBy;

    switch(order) {
        case 'endDate':
            orderBy = {endDate: up};
            break;
        case 'createdDate':
            orderBy = {createdDate: up};
            break;
        case 'importance':
            orderBy = {importance: up*-1};
            break;
    }

    noteDB.all(renderIndex, req, res, orderBy, req.session.hideFinished);
};

module.exports.getNewNote = function (req, res) {
    res.render('newNote', {activeButtons: getActiveButtons(req)});
};

module.exports.addNewNote = function (req, res) {
    noteDB.add(req, function () {
        res.redirect('/');
    });
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
    req.session.darkStyle = !req.session.darkStyle;
    res.redirect('/');
};

module.exports.sort = function (req, res) {
    var up = 1;

    if(typeof req.session.sortBy != 'undefined' && req.session.sortBy == req.query.by) {
        up = req.session.up * -1;
    }

    req.session.sortBy = req.query.by;
    req.session.up = up;

    res.redirect('/');
};

module.exports.hideFinished = function (req, res) {
    req.session.hideFinished = !req.session.hideFinished;
    res.redirect('/');
};

function renderIndex(req, res, data) {
    res.render('index', {allNotes: data, activeButtons: getActiveButtons(req)});
    //Daten werden sowohl an layout.hbs als auch an index.hbs weitergeleitet
}

function renderNote(req, res, data) {
    res.render('newNote', {withNote: true, note: data, activeButtons: getActiveButtons(req)});
}

function getActiveButtons(req) {
    var activeButtons = '';

    if(!!req.session.darkStyle) {
        activeButtons += 'darkStyle';
    }
    if(!!req.session.hideFinished) {
        activeButtons += 'hideFinished';
    }
    if(typeof req.session.sortBy != 'undefined'){
        activeButtons += req.session.sortBy;
    }

    return activeButtons;
}