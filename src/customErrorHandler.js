class CustomErrorHandler{
        errorFound (err){
                console.error(err);
                return {message:'we found an error'}
        }
}

module.exports = new CustomErrorHandler();