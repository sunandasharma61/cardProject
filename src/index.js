const express = require("express")
const mongoose=require("mongoose")
const route=require('./routes/route.js')
const app = express();

app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://userProject1:WlhZV1CHyTcTiSlZ@blog.osplkog.mongodb.net/cardProject-db",{
useNewUrlParser: true
})

.then(()=>console.log("MongoDB is connected"))
.catch((error)=>console.log(error));


app.use("/",route);

app.listen( 3000, function () {
    console.log("Express App Running on Port 3000");
  });