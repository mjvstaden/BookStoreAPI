import express from 'express';
import { getAllBooks, addNewBook, getBook, updateBook, getDiscountedPrice, deleteBook} from '../controllers/books';

export default (router: express.Router) => {
    router.get('/books', getAllBooks);
    router.post('/book/create', addNewBook);
    router.get('/book/find/:id', getBook);
    router.put('/book/update/:id', updateBook);
    router.get('/books/discounted-price', getDiscountedPrice);
    router.delete('/book/:id', deleteBook);
}
