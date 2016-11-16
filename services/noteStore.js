var datastore = require('nedb');
var moment = require('moment');
var db = new datastore({filename: '../services/notes.db', autoload: true});

function Note(title, description,   importance, endDate, finished) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.endDate = endDate;
    this.finished = finished == 'on';
    this.createdDate = moment().format('YYYY-MM-DD');
}

function addNote(request, callback) {
    var data = request.body;
    var note = new Note(data.title, data.description, data.importance, data.endDate, data.finished);
    db.insert(note, function (err) {
        if(err) {
            console.error(err.message);
            return;
        }

        callback();
    });
}

function updateNote(request, callback) {
    var data = request.body;
    var isFinished = data.finished == 'on';

    db.update({_id: request.params.id}, { $set: {title: data.title, description: data.description, importance: data.importance,
            endDate: data.endDate, finished: isFinished}}, {multi: false},
        function (err) {
            if(err) {
                console.error(err.message);
                return;
            }

            callback();
        })
}

function removeNote(id, callback) {
    db.remove({_id: id}, {multi: false}, function (err) {
        if(err) {
            console.error(err.message);
            return;
        }

        callback();
    })
}

function getNote(request, response, callback) {
    db.findOne({_id: request.params.id}, function (err, result) {
        if(err) {
            console.error(err.message);
            return;
        }

        callback(request, response, result);
    });
}

function getAllNotes(callback, request, response, orderBy, hideFinished) {
    if(hideFinished) {
        db.find({finished: false}).sort(orderBy).exec(function (err, result) {
            returnResult(err, result, callback, response, request);
        });
    } else {
        db.find({}).sort(orderBy).exec(function (err, result) {
            returnResult(err, result, callback, response, request);
        });
    }
}

function returnResult(err, result, callback, response, request) {
    if (err) {
        console.error(err.message);
        return;
    }

    callback(request, response, result);
}

module.exports = {add : addNote, update: updateNote, remove : removeNote, get : getNote, all : getAllNotes};