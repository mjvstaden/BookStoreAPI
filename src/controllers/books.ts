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
        const discountPercentage = Number(discount);
        const totalDiscountedPrice = books.reduce((total: number, book: { price: number; }) => total + book.price * (1 - discountPercentage / 100), 0);
        res.status(200).send({ genre, discount, totalDiscountedPrice });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteBook = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    deleteBookById(id).then(() => {
        res.status(200).send('Book deleted successfully');
    }
    ).catch((error) => {
        console.log(error);
        res.status(500).send
    })
}
