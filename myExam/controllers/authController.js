const router = require('express').Router();
const mongoose = require('mongoose')
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils')

const getRegisterPage = async (req, res) => {
    res.render('register')
}
const postRegisterPage = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    try {
        const token = await authService.register(username, email, password, repeatPassword)
        res.cookie('token', token);
        res.redirect('/')
    }
    catch (error) {
        res.status(400).render('register', { error: getErrorMessage(error) })
    }
}
const getLoginPage = async (req, res) => {
    res.render('login')
}
const postLoginPage = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.cookie('token', token);
        res.redirect('/')
    }
    catch (error) {
        return res.status(404).render('login', { error: getErrorMessage(error) })
    }

}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
}



module.exports = {
    getRegisterPage,
    postRegisterPage,
    getLoginPage,
    postLoginPage,
    logout
}