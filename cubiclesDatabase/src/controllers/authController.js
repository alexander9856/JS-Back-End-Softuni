const authService = require('../services/authService')

const getLoginPage = (req, res) => {
    res.render('login')
}
const postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.cookie('token', token, { httpOnly: true })
        console.log(token)

    } catch (err) {
        console.log(err);
    }

    res.redirect('/')
}



const getRegisterPage = (req, res) => {
    res.render('register')
}

const postRegister = async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    const existingUser = await authService.getUserByUsername(username);

    try {
        if (existingUser) {
            throw 'User already exists'
        }
        if (password !== repeatPassword) {
            throw 'Passwords don\'t match!!!!'
        }
        const user = await authService.register(username, password)
    }
    catch (err) {
        console.log(err)
        return res.redirect('/404')
    }

    res.redirect('/login')
}

const logout = async (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    postRegister,
    postLogin,
    logout
}