const mongoose = require('mongoose');


const database=()=>{mongoose.connect('mongodb+srv://alibarandemir798:lk8038a2oMps4Il6@cluster0.k2gsa2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   
  
  
).then(()=>{
    console.log("db is connected")
}).catch((error)=>{
    console.log(error.message)
})}


module.exports= database;