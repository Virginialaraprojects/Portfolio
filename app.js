const express= require('express');
const app =express();
const { data }=require('./data.json');

/****** View engine ******/
app.set('view engine','pug')

app.use('/static',express.static('public'));

/****** GET home page ******/
app.get('/', (req,res)=>{
//pass all the project data to the index template
    res.render('index',{data});
});

/******  GET About page ******/
app.get('/about',(req,res)=>{
    res.render('about');
});

/****** GET Project page ******/
app.get('/project/:id',function(req,res,next){
    const  projectId =req.params.id;
    const  project = data.find(({id})=> id === +projectId);
    if(project){
    //pass the project data to project template
        res.render('project',{data});
    }else{
        res.sendStatus(404);
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



// display app on screen
app.listen(3000,()=>{
    console.log('The application is running on the localhost:3000!')
});
