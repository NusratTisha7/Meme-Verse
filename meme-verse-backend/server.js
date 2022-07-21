require('dotenv/config') 
const express=require('express');
const app=express();
const cors=require('cors');
const error = require('./middlewares/error')
const mongoose=require('mongoose');
const compression = require('compression');

const corsOptions ={
    origin:'*',
    credentials:true,            
    optionSuccessStatus:200,
}

mongoose.connect(process.env.MONGODB_SERVER,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connected to MongoDB!'))
.catch(err=>console.log('MongoDB Connection Failed!'))

app.use(express.json()) 
app.use(cors(corsOptions))
app.use(error)
app.use(express.urlencoded({ extended: true }))
app.use(compression())

require('./middlewares/route')(app);

app.use('/api/media/img/',express.static('media/img'));

const port=process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})