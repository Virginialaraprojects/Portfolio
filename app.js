const express= require('express');
const { nextTick } = require('process');

const app =express();

const { data }=require('./data.json');

app.set('view engine','pug')

app.use('/static',express.static('public'));

app.get('/', (req,res)=>{
    res.render('index',{data});
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/project/:id',(req,res)=>{
    const { id }=req.params.id;
    const data= data[id];
    if(data){
        res.render('project',{ data })
    }else{
    next();
    }
})  
/****** 404 Error Handler ******/
app.use((req,res,next)=>{
    const err= new Error ('Not Found');
    err.status=404;
    err.message="Sorry, page not found!"
    next(err);
})

/****** Global Error Handler ******/


app.listen(3000,()=>{
    console.log('The application is running on the localhost:3000!')
});