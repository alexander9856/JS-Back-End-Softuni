const express = require('express');
const cookieParser = require('cookie-parser')

const routes = require('./routes')
const config = require('./config');
const setupViewEngine = require('./config/viewEngine');
const initDatabse = require('./config/database')

const middlewares = require('./middlewares.js/authMiddleware')

const app = express();
setupViewEngine(app)

app.use(express.static('src/public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(middlewares.authentication)
app.use(routes)


initDatabse()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`)))
    .catch(err => console.error(err))
