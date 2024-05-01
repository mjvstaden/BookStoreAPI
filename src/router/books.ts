import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
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
    router.get('/book/find/:id',
        param('id').isMongoId(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            getBook(req, res);
        }
    );
    router.put('/book/update/:id',
        param('id').isMongoId(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            updateBook(req, res);
        }
    );
    router.get('/books/discounted-price',
        query('genre').isString().notEmpty(),
        query('discount').isNumeric().notEmpty(),
            async (req: express.Request, res: express.Response) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                getDiscountedPrice(req, res);
            }
        );
    router.delete('/book/:id', 
        param('id').isMongoId(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            deleteBook(req, res);
        }
    );
}
