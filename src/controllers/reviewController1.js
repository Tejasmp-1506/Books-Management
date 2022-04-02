const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/bookModel");


const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const createReview = async function (req, res) {
  try {
    const reviewBody = req.body;
    const bookId = req.body.bookId;

    if (Object.keys(reviewBody) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "reviewDetails must be provided" });
    }

   

    if (!isValid(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is required" });

    }


    if (bookId != req.params.bookId) {
        return res.status(400).send({ status: false, message: "invalid BookId" });
      }

    if (!/^[0-9a-fA-F]{24}$/.test(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid bookId" });
    }

    const { reviewedBy, reviewedAt, rating, review } = reviewBody;

    if (!isValid(reviewedBy)) {
      return res
        .status(400)
        .send({ status: false, message: "reviewedBy is required" });
    }

    if (!isValid(reviewedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "reviewedAt is required" });
    }

    //use regex to  validate time of reviewdAt

    if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewBody.reviewedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid date format" });
    }

    if(!reviewBody.rating) {
        return res.status(400).send({status: false , msg : "please provide rating"})
    }

    if(!(reviewBody.rating >= 1 && reviewBody.rating <= 5)){
        return res.status(400).send({status: false, msg : "please provide rating between 1-5"})
    }


    if (!isValid(review)) {
      return res
        .status(400)
        .send({ status: false, message: "review is required" });
    }

    //this is not required.

    let revieweddata = { bookId, reviewedBy, reviewedAt, rating, review };

    const reviewData = await reviewModel.create(revieweddata);
    const bookDetails = await bookModel.findById(bookId);

    return res
      .status(201)
      .send({ status: true, Book: bookDetails, reviews: reviewData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

//-----update review---------------------------------------------------------------------------------------------------


const updateReview = async function (req, res) {
    let getBookId = req.params.bookId;
    let getReviewId = req.params.reviewId
    let data = req.body;

    if (!data) {
         return res.status(400).send({ status: false, message: "enter data for update" }) 
        }

    let checkBookId = await bookModel.findOne({ _id: getBookId }, { isDeleted: false })

    if (!checkBookId) { 
        return res.status(400).send({ status: false, message: "no book exist with this id" })
     }

    let checkReviewId = await reviewModel.findOne({ _id: getReviewId , isDeleted: false })

    if (!checkReviewId) { 
        return res.status(400).send({ status: false, message: "no review exist with this id" }) 
    }
    if (data.rating < 1 || data.rating > 5 ) {
        res.status(400).send({ status: false, message: 'please provide ratings ( 1 - 5 )' })
        return
    }


    let updateReview = await reviewModel.findOneAndUpdate({ _id: getReviewId, bookId: getBookId },
        { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy,reviewedAt:Date.now() } }, { new: true })

    return res.status(200).send({ status: true, message: "review updated successfully", data: updateReview })
}

/*### DELETE /books/:bookId/review/:reviewId
- Check if the review exist with the reviewId. Check if the book exist with the bookId. Send an error response with appropirate status code like [this](#error-response-structure) if the book or book review does not exist
- Delete the related reivew.
- Update the books document - decrease review count by one*/


const deleteReview = async function (req, res) {
    try {
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        if (!(/^[0-9a-fA-F]{24}$/.test(bookId))) {
            return res.status(400).send({ status: false, message: 'please provide valid bookId' })
        }
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            res.status(400).send({ status: false, message: "Book doesn't exist" })
            return
        }
        if (!(/^[0-9a-fA-F]{24}$/.test(reviewId))) {
            res.status(400).send({ status: false, message: 'please provide valid reviewId' })
            return
        }
        const review = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
        if (!review) {
            res.status(400).send({ status: false, message: "review doesn't exist for given bookId" })
            return
        }

    
        const deletedReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId }, { isDeleted: true }, { new: true })

        
        const decreaseCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }) 
              res.status(200).send({ status: true, message: "review deleted successfully" })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createReview = createReview
module.exports.deleteReview = deleteReview
module.exports.updateReview = updateReview
