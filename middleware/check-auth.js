const jwt = require('jsonwebtoken');

function checkAuth(req,res,next){
    
    let token = req.body.token;

    try{
        console.log("helloooo");
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(token.startsWith('Bearer')){
            token = token.slice(7,token.length);
        }
        if(token){
             jwt.verify(token,"process.env.jwttoken",(err,decoded) =>{
                 if(err){
                     return res.json({
                         success:false,
                         message:'token is not valid'
                     });
                 }else{
                     req.decoded = decoded;
                     next();
                 }
             });


        }else {
            return res.json({
                success:false,
                message:"auth token is not supported"
            });
        }
        //const token = req.headers.authorization.split(" .");
       // console.log(token);
    /*    const decodedToken = jwt.verify(token,"process.env.jwttoken");
        req.userData = decodedToken;
       console.log(decodedToken);


        next();*/
    }catch(e){
        return res.status(401).json({
            "message":"invalid or expired",
            "error":e
        });
    }
}
module.exports = {
    checkAuth : checkAuth
}