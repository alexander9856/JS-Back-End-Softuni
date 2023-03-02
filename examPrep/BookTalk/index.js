const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const { authentication } = require('./middlewares/authMiddleware')

const routes = require('./routes')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');


app.use(express.static('public'));
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

mongoose.connect(`mongodb://127.0.0.1:27017/BookTalk`)
app.listen(5000, () => console.log(`Server is running on port 5000....`))