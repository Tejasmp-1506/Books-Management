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
};

module.exports.createReview = createReview;
