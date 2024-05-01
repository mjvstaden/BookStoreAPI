import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(cors({
    credentials: true, 
}));

const server = http.createServer(app);

server.listen(8080, () => { 
    console.log('Server is running on port 8080');
});

const MONGO_URL = 'mongodb+srv://mjvstaden01:010503@cluster0.muda7ma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise; 
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err: Error) => console.error(err));

app.use('/', router());