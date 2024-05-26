const express = require ('express')

const PORT = process.env.PORT || 3001

const app = express();


app.get("/login",( req, res )=>{

res.send("we are at about route")
})


app.listen( PORT, ()=>
    console.log(`API Running on ${PORT}`)
)


