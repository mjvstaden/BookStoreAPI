import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllBooks, addNewBook, getBook, updateBook, getDiscountedPrice, deleteBook} from '../controllers/books';

export default (router: express.Router) => {
    router.get('/books', getAllBooks);
    router.post('/book/create',
        body('title').isString().notEmpty(),
        body('author').isString().notEmpty(),
        body('genre').isString().notEmpty(),
        body('price').isNumeric().notEmpty(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            addNewBook(req, res);
        }
    );
    router.get('/book/find/:id', getBook);
    router.put('/book/update/:id', updateBook);
    router.get('/books/discounted-price', getDiscountedPrice);
    router.delete('/book/:id', deleteBook);
}
