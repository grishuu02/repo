
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo_db')
.then(()=>console.log('MongoDB Connected'));

app.get('/', (req,res)=>{
  res.json({message:'Cloud To-Do API Running'});
});

app.listen(5001, ()=>{
  console.log('Server running on port 5001');
});
