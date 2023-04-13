// Adds try/catch block and gives error handling to our custom error handler
// Code from 'acuriousanimal' website(https://www.acuriousanimal.com/blog/20180315/express-async-middleware/)
const asyncHandler = fn => (req, res, next) => 
    Promise
        .resolve(fn(req, res, next))
        .catch(next);

module.exports = asyncHandler;
