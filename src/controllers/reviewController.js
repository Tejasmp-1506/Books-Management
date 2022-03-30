// const reviewModel = require("../models/reviewModel");
// const bookModel = require("../models/bookModel");
// const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

// const isValidDate = (date) => {
//   const specificDate = new Date(date);
//   const today = new Date();
//   return specificDate < today;
// };

// const isValidRequestBody = function (requestBody) {
//   return Object.keys(requestBody).length > 0;
// };

// const isValidObjectId = function (objectId) {
//   return mongoose.Types.ObjectId.isValid(objectId.trim());
// };

// const isValid = function (value) {
//   if (typeof value == undefined || value == null) return false;
//   if (typeof value === "string" && value.trim().length === 0) return false;
//   return true;
// };


// //1)
// //---------Create review-----------------------------------------------------------------------------------------------

// const createReview = async function (req, res) {
//   let data = req.body;
//   let bookId = req.params.bookId;

//   if (!isValidRequestBody(data))
//     res.status(400).send({ status: false, message: "data is required" });

//   if (!isValidObjectId(bookId))
//     res.status(400).send({ status: false, message: "bookId is required" });

//   // let { booksId,reviewedBy,reviewedAt,rating,review }=data

//   if (!isValidObjectId(bookId)) {
//     return res.status(400).send({ status: false, message: "Valid BookiD is required" });
//   }

//   const checkBookId = await bookModel.findOne({_id: bookId, isDeleted: false});

//   if (!checkBookId) return res.status(400).send({ status: false, message: "bookId not found" });

//   //if(!isValid(data.reviewedBy)){return res.status(400).send({status: false, message:"reviewedBy is required"})}

//   if (!isValidDate(data.reviewedAt)) {
//     return res
//       .status(400)
//       .send({ status: false, message: "reviewedAt is required" });
//   }
//   if (!isValid(data.rating)) {
//     return res
//       .status(400)
//       .send({ status: false, message: "rating is required" });
//   }
//   if (!/^[1-5]$/.test(data.rating)) {
//     res
//       .status(400)
//       .send({ status: false, message: "please enter rating between 1 to 5" });
//   }

//   if (!isValid(data.review)) {
//     return res
//       .status(400)
//       .send({ status: false, message: "review is required" });
//   }

//   const revieweddata = {
//     bookId: bookId,
//     reviewedBy: data.reviewedBy,
//     reviewedAt: data.reviewedAt,
//     rating: data.rating,
//     review: data.review
//   };

//   const reviewData = await reviewModel.create(revieweddata);

//   return res.status(201).send({ status: true, message: reviewData });
// };

// module.exports.createReview = createReview;
