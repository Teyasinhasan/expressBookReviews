const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const bookList = books;
  res.status(200).send(JSON.stringify(bookList, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:id',function (req, res) {
   // Retrieve the ISBN from the request parameters
   const id = req.params.id;

   // Fetch the book details from the books object
   const bookDetails = books[id];
 
   // Check if the book exists
   if (bookDetails) {
     // Send the book details as a JSON response
     res.status(200).send(JSON.stringify(bookDetails, null, 2));
   } else {
     // If the book does not exist, send a 404 response
     res.status(404).json({ message: "Book not found" });
   }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  // Initialize an array to hold books by the specified author
  let booksByAuthor = [];

  // Iterate through the books object
  for (let key in books) {
    if (books[key].author === author) {
      // Add the book to the array if the author matches
      booksByAuthor.push(books[key]);
    }
  }

  // Check if any books were found
  if (booksByAuthor.length > 0) {
    // Send the books as a JSON response
    res.status(200).send(JSON.stringify(booksByAuthor, null, 2));
  } else {
    // If no books were found, send a 404 response
    res.status(404).json({ message: "No books found by this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 // Retrieve the title from the request parameters
 const title = req.params.title;

 // Initialize an array to hold books with the specified title
 let booksByTitle = [];

 // Iterate through the books object
 for (let key in books) {
   if (books[key].title === title) {
     // Add the book to the array if the title matches
     booksByTitle.push(books[key]);
   }
 }

 // Check if any books were found
 if (booksByTitle.length > 0) {
   // Send the books as a JSON response
   res.status(200).send(JSON.stringify(booksByTitle, null, 2));
 } else {
   // If no books were found, send a 404 response
   res.status(404).json({ message: "No books found with this title" });
 }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
   // Retrieve the ISBN from the request parameters
   const isbn = req.params.isbn;
   console.log(`Received request for ISBN: ${isbn}`);
 
   // Fetch the book details from the books object
   const bookDetails = books[isbn];
   console.log(`Book details: ${JSON.stringify(bookDetails)}`);
 
   // Check if the book exists
   if (bookDetails) {
     // Send the book reviews as a JSON response
     res.status(200).send(JSON.stringify(bookDetails.reviews, null, 2));
   } else {
     // If the book does not exist, send a 404 response
     res.status(404).json({ message: "Book not found" });
   }
});

module.exports.general = public_users;
