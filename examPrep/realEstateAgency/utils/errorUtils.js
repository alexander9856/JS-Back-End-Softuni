function getfirstMongooseError(error) {
    const errors = Object.keys(error.errors).map(x => error.errors[x].message);
    return errors[0]
}
exports.getErrorMessage = (error) => {
    switch (error.name) {
        case 'Error':
            return error.message
        case 'ValidationError':
            return getfirstMongooseError(error)
        default:
            return error.message
    }
}