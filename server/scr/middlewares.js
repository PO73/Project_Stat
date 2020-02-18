const notFound = (req, res, next) =>{ //404 catch
    const errorMessage = new Error("Page Not Found - " + req.originalUrl);
    res.status(404);
    next(error); //Pass error message to error handler 
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.status === 200 ? 500 : res.statusCode; //Check to see if error was in our routes or external 
    res.status(statusCode);
    res.json({
        message: error.message,
    });
};

module.exports = {
    notFound,
    errorHandler,
};