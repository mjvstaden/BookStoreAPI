import express from 'express';
import { addBook, getBookById, updateBookById, deleteBookById, getBooks, getBooksByGenre, getBooksByAuthor, getBookbyTitle } from '../db/books'; 

export const getAllBooks = async (req: express.Request, res: express.Response) => {
    try {
        const { genre, author, title } = req.query;
        let books;
        if (genre) {
            books = await getBooksByGenre(genre as string);
        } else if (author) {
            books = await getBooksByAuthor(author as string);
        } else if (title) {
            books = await getBookbyTitle(title as string);
        } else {
            books = await getBooks();
        }
        res.status(200).send(books);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const addNewBook = async (req: express.Request, res: express.Response) => {
    try {
        const { title, author, genre, price } = req.body;

        if (title !== undefined && typeof title !== 'string') {
            return res.status(400).send('Invalid title');
        }
        if (author !== undefined && typeof author !== 'string') {
            return res.status(400).send('Invalid author');
        }
        if (genre !== undefined && typeof genre !== 'string') {
            return res.status(400).send('Invalid genre');
        }
        if (price !== undefined && typeof price !== 'number') {
            return res.status(400).send('Invalid price');
        }

        addBook(title, author, genre, price);
        res.status(201).send('Book added successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getBook = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const book = await getBookById(id);
        res.status(200).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const updateBook = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const book = await getBookById(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        const { title, author, genre, price } = req.body;
        await updateBookById(id, title, author, genre, price);
        const updatedBook = await getBookById(id);
        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getDiscountedPrice = async (req: express.Request, res: express.Response) => {
    try {
        const { genre, discount } = req.query as { genre: string, discount: string};
        const books = await getBooksByGenre(genre);
        const discount_percentage = Number(discount);
        const total_discounted_price = books.reduce((total: number, book: { price: number; }) => total + book.price * (1 - discount_percentage / 100), 0);
        res.status(200).send({ genre, discount_percentage, total_discounted_price });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteBook = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    deleteBookById(id).then(() => {
        res.status(200).send('Book deleted successfully');
    }
    ).catch((error) => {
        console.log(error);
        res.status(500).send
    })
}
