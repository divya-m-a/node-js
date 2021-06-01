const express = require('express');
//const postController = require('./controllers/post.controller');
const bodyParser = require('body-parser');

const app = express();
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');
//const imageRoute = require('./routes/images');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/uploads', express.static('uploads'));

app.use("/a",postRoute);
app.use("/user",userRoute);
//app.use("/images",imageRoute);
 module.exports = app;