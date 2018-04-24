let path = require('path');

module.exports = function(app){






    // this is the catch all route. if you get ANY route other than the above route, send the index
    app.all("*", (req, res, next) => { res.sendFile(path.resolve("./client/dist/index.html"))});

};