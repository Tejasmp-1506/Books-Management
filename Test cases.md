### BOOK APIS
## POST/BOOKS

 1. request body should contain userId.
 2. request body should not be empty.
 3. check the user is present in the collection of that perticular userId.
 4. if not send suitable error.
 5. create atleast 10 authors.
 6. handel all errors properly.

## GET/BOOKS

1. return all the books in the collection that arent deleted.
2. response body should only contain these feilds = bookId, title, excerpt, userId, category, releasedAt, reviews field
3. return 200 code if documents are found.
4. if no documents are found return 404 with suitable msg.
5. filter books by applying any combination of these query params : 
   - by userId
   - by category
   - by subcategory
6. sort all the books in alphabetical manner.
7. all errors should handel approprietly.

## GET/BOOKS/:BOOKId

1. response body should contain  all the reviews of that books along with the book details.
2. if the book has not reviews then send the book details with an empty array of reviewsData.
3. return 200 code if documents are found.
4. if documents are not found return 404 with suitable msg
5. what is happening if book id is not provided in request body. 
6. handel all errors properly.


## PUT/BOOKS/:BOOKId

1. update book details by changing its
     - title
     - excerpt
     - release date
     - ISBN
2. what is happening if book id is not provided in request body.
3. what if book id is invalid.
4. make sure the book id is present in the collection with key isDeleted false, if doesnt return 404 with suitable error.
5. return 200 if updated successfully.
6. handel all errors properly.

## DELETE/BOOKS/:BOOKId

1. check the bood id exist in the collection or not. if doesnt exist return 404 with suitable msg.
2. if present the mark it deleted with status code 200.
3. handel the error if book id is not provided in the request body.









why we didnt use date.now() as like deletebook api in updatebook api