const express = require('express');

const { sequelize,User,Post} = require('./models');

const app = express();
app.use(express.json())
app.post('/users',async(req,res)=>{
    const {name,email,role} = req.body

    try{
        const user = await User.create({name,email,role})
        return res.json(user)
    }catch(error){
            console.log(error);
            return res.json(error);

    }
})


/*async function main(){
    await sequelize.sync({alter: true})
}
main()*/
app.get('/users',async(req,res)=>{
    try {
        const users = await User.findAll()
        return res.json(users)
    }catch(e){
        return res.json(e);

    }



})
app.get('/users/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: {uuid},
            include:'posts'
        })
        return res.json(user)
    }catch(e){
        return res.json(e);

    }
})
app.post('/posts',async(req,res) =>{
    const { userUuid,body} = req.body
    try{
     const user = await User.findOne({where: {uuid:userUuid}})
        const post = await Post.create({body,userId:user.id})
        return res.json(post)

    }catch(e){
        return res.json(e);

    }
})

app.get('/posts',async(req,res) =>{
    
    try{
        const posts = await Post.findAll({include:['user']})
        return res.json(posts)

    }catch(e){
        return res.json(e);

    }
})

app.listen(5000,async()=>{
    console.log("server running port 5000")
    await sequelize.authenticate()
    console.log('database connected');
})