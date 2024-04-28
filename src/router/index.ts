import express from 'express';
import books from './books';

const router = express.Router();

export default (): express.Router => {
    books(router);

    return router;
}