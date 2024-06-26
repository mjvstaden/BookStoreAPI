import mongoose from "mongoose";
const mongo = require('mongodb')

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
});

export const BookModel = mongoose.model('Book', BookSchema);

export const addBook = (title: string, author: string, genre: string, price: number) => {
    BookModel.create({ title, author, genre, price });
}

export const getBooks = () => {
    return BookModel.find({});
}

export const getBookById = (id: string) => {
    return BookModel.findById(id);
}

export const getBookbyTitle = (title: string) => {
    return BookModel.findOne({ title });
}

export const getBooksByAuthor = (author: string) => {
    return BookModel.find({ author });
}

export const getBooksByGenre = (genre: string) => {
    return BookModel.find({ genre });
}

export const getBooksByMaxPrice = (price: number) => {
    BookModel.find({ price: { $lte: price } });
}

export const updateBookByTitle = (title: string, author: string, genre: string, price: number) => {
    BookModel.updateOne({ title }, { author, genre, price });
}

export const updateBookById = (id: string, title: string, author: string, genre: string, price: number) => {
    return BookModel.findByIdAndUpdate(id, { title, author, genre, price });
}

export const deleteBookById = async (id: string) => {
    await BookModel.deleteOne({ _id: new mongo.ObjectId(id) });
}

export const deleteBookByTitle = (title: string) => {
    BookModel.deleteOne({ title });
}

export const deleteBookByAuthor = (author: string) => {
    BookModel.deleteMany({ author});
}

export const deleteAllBooks = () => {
    BookModel.deleteMany({});
}