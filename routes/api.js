/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { Books } = require('../model.js');

const BookModel = require('../model.js').Books

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      BookModel.find({}, (error, found) => {
        //console.log(found)
        if (error || !found) {
          res.send('error')
        } else {
          const allBooks = found.map((book) => {
            return {
              _id: book._id,
              title: book.title,
              commentcount: book.comments.length,
              comments: book.comments
            }
          })
          res.json(allBooks)
        }
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //console.log(title)
      if (!title) {
        res.send('missing required field title')
      } else {
        const newBook = new BookModel({ title, comments: [] })
        newBook.save((error, data) => {
          if (error || !data) {
            res.send('error during saving the new book')
          } else {
            res.json({ _id: data._id, title: data.title })
          }
        })
      }

    })
    
    .delete(function(req, res){
      BookModel.deleteMany({}, (error, data) => {
        if (error || !data) {
          res.send('error deleting all the library')
        } else {
          res.json('complete delete successful')
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //console.log(bookid)
      BookModel.findById(bookid, (error, bookFound) => {
        //console.log(bookFound)
        if (error || !bookFound) {
          res.send('no book exists')
        } else {
          res.json({ 
            _id: bookFound._id, 
            title: bookFound.title, 
            comments: bookFound.comments,  
          })
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        res.send('missing required field comment')
      } else {
        BookModel.findById(bookid, (error, bookFound) => {
          //console.log(bookFound)
          if (error || !bookFound) {
            res.send('no book exists')
          } else {
            bookFound.comments.push(comment)
            //console.log(bookFound)
            bookFound.save((error, data) => {
              if (error || !data) {
                res.send('error during saving the new comment')
              } else {
                //console.log(data)
                res.json({ 
                  _id: data._id, 
                  title: data.title, 
                  commentcount: data.comments.length, 
                  comments: data.comments 
                })
              }
            })
            
          }
        })
      }

    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      BookModel.findByIdAndDelete(bookid, (error, data) => {
        if (error || !data) {
          res.send('no book exists')
        } else {
          res.send('delete successful')
        }
      })
    });
  
};
