const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


const dotenv = require('dotenv');
dotenv.config(); // ✅ correct




const port = 2000;

const app = express()
app.use(express.urlencoded({extended:true}));

// i have already use inline css in html , oterwise i would had used "express.static(__dirname)"", this function right here in app.use function.

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// mongoose.connect('mongodb://127.0.0.1:27017/Passion')
const db = mongoose.connection
db.once('open', ()=>{
    console.log("MongoDB Connection is successful. Kudos to you Sakshi!!!");
})

//Defining Schema i.e structure of a database.
const userSchema = new mongoose.Schema({
    name:String, 
    email:String,
    branch:String,
    college:String,
    skill:String,
    language:String,
    productivity:String,
    higher:String,
    career:String

});

const Users = mongoose.model("data", userSchema)

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'form2.html'));
})

app.post('/post', async(req,res)=>{
    const { name, email, branch,college, language,skill,productivity,
        higher,career  } = req.body
    const User = new Users({
        name,
        email,
        branch ,
        college,
        language,
        skill,
        productivity,
        higher,
        career,

    });
    await User.save();
    console.log(User)
    res.send(alert("Form Submitted"));




})

app.listen(port, ()=>{
    console.log("server started");
})




