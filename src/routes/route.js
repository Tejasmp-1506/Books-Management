const express = require ('express');
const router = express.Router();// Once you imported your router.js in the index, you need to tell express it can use this router
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const reviewController1 = require("../controllers/reviewController1")
const auth = require("../middleware/auth")





router.post('/register', userController.createUser)

router.post('/loginUser' , userController.userLogin)

router.post('/books' ,auth.authenticate, bookController.createBook)

router.get('/books', auth.authenticate, bookController.getBooks)

router.get('/books/:bookId',auth.authenticate, bookController.getBookById)

router.put('/books/:bookId',auth.authenticate, auth.authorise, bookController.updateBook)

router.delete('/books/:bookId',auth.authenticate,auth.authorise, bookController.deleteBookById)

router.post('/books/:bookId/review', reviewController1.createReview)










module.exports = router