const jwt = require('jsonwebtoken');
function middleware (password){
    return function(req,res,next){
        const token = req.headers.token;
        const decoded = jwt.verify(token,password);

        if(decoded){
            req.userId = decoded.id;
            next();
        }else{
            res.status(403).json({
                message : "you are not siggned in"
            })
        }}
}

module.exports= {
    middleware
}