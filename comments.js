//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

//create schema for comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

//get all comments
app.get('/comments', function(req, res){
    Comment.find(function(err, comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    });
});

//get single comment
app.get('/comments/:id', function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            res.send(err);
        }
        res.json(comment);
    });
});

//add comment
app.post('/comments', function(req, res){
    var comment = new Comment(req.body);
    comment.save(function(err){
        if(err){
            res.send(err);
        }
        res.send({message: 'Comment added'});
    });
});

//update comment
app.put('/comments/:id', function(req, res){
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment){
        if(err){
            res.send(err);
        }
        res.json(comment);
    });
});

//delete comment
app.delete('/comments/:id', function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'Comment deleted'});
    });
});

app.listen(3000);
