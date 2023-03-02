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


app.use('/static', express.static('static'));
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);
// app.post('/CAForm', function (req, res) {
//     res.send(req.body.optradio);
// });

mongoose.connect(`mongodb://127.0.0.1:27017/SharedTrip`)
app.listen(5000, () => console.log(`Server is running on port 5000....`))