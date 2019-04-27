import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from  './routes/postsRoutes';
import mongoose from 'mongoose';
import keys from './config/keys';

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);


export default app;
