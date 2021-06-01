const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signup(req,res){
  
    models.User.findOne({where:{email:req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message:"email already exits",

            });
        }else{
            bcryptjs.genSalt(10,function(err,salt){

                bcryptjs.hash(req.body.password,salt,function(err,hash){
        
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                
                    }
                    models.User.create(user).then(result =>{
                        res.status(200).json({
                            message:"success registered"
                        })
                    }).catch(error =>{
                        res.status(500).json({
                            message:"Something went wrong"
                        })
                    })
                })
         })
          }
         }).catch(error =>{
             res.status(500).json({
                 message:"error"

             })
 })

}

function login(req,res){
    models.User.findOne({where:{email:req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message:"invalid credentials"
            });
        }else{
            bcryptjs.compare(req.body.password, user.password,function(err,result){
                if(result){
                    let token = jwt.sign({
                        email:user.email,
                        userId: user.id
                    }, "process.env.jwttoken",function(err,token){
                        res.status(200).json({
                            message:"Authentication successfull",
                            token: token
                        });

                    });
                }else{
                    res.status(500).json({
                        message:"Authentication failed",
                        
                    });
                }
            });
        }
    }).catch(error =>{
        res.status(500).json({
            message: "something went wroung"
        })
    })
    
}
module.exports = {
    signup :signup,
    login :login
}