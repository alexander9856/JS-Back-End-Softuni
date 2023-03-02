const jwt = require('../lib/jsonWebToken');
const config = require('../config')

const authentication = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, config.SECRET);

            req.user = decodedToken
            req.isAuthenticated = true
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true
        }
        catch (err) {
            console.log(err);
            res.clearCookie('token')
            return res.redirect('/login')
        }
    }
    next()
}

const isAuthenticated = (req,res,next) => {
    if(!req.isAuthenticated){
        return res.redirect('/login')
    }
    next()
}

module.exports = {
    authentication,
    isAuthenticated
}