import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from  './routes/postsRoutes';
import authRoutes from  './routes/authRoutes';
import categoryRoutes from  './routes/categoryRoutes';
import mongoose from 'mongoose';
import keys from './config/keys';
import path from 'path';

mongoose.connect(keys.mongoDbURI, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('Connected Failed...');
  } else {
    console.log('Connection was successful...');
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);


export default app;
