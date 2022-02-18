class CustomErrorHandler {
        errorFound(err) {
                return { message: 'we found an error' }
        }
}

module.exports = new CustomErrorHandler();