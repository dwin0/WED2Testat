var Datastore = require('nedb');
var db = new Datastore({filename: '../services/notes.db', autoload: true});

function Note(title, description, importance, endDate, finished) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.endDate = endDate;
    this.finished = finished == 'on';
    this.createdDate = JSON.stringify(new Date());
}

function addNote(req) {
    var data = req.body;
    var note = new Note(data.title, data.description, data.importance, data.endDate, data.finished);
    db.insert(note);
    return note;
}

function updateNote(req, res, callback) {
    var data = req.body;
    var isFinished = data.finished == 'on';
    db.update({_id: req.params.id}, {title: data.title, description: data.description, importance: data.importance, endDate: data.endDate, finished: isFinished}, {multi: false},
        function (err) {
            if(err) {
                console.error(err.message);
                return;
            }

            getAllNotes(callback, res);
        })
}

function removeNote(callback, id, response) {
    db.remove({_id: id}, {multi: false}, function (err) {
        if(err) {
            console.error(err.message);
            return;
        }

        getAllNotes(callback, response);
    })
}

function getNote(request, response, callback) {
    db.findOne({_id: request.params.id}, function (err, result) {
        if(err) {
            console.error(err.message);
            return;
        }

        callback(response, result);
    });
}

function getAllNotes(callback, response) {
    db.find({}, function (err, result) {
        if(err) {
            console.error(err.message);
            return;
        }

        callback(response, result);
    });
}

module.exports = {add : addNote, update: updateNote, remove : removeNote, get : getNote, all : getAllNotes};