const jwt = require('../lib/jsonWebToken');
const { SECRET } = require('../constants')
exports.authentication = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
            res.locals.email = decodedToken.email
        }
        catch (err) {
            res.clearCookie('token')
            return res.status(401).render('404')
        }
    }

    next()
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login')
    }

    next()
}
