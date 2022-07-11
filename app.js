const express= require('express');
const app =express();
const { projects }=require('./data.json');

/****** View engine ******/
app.set('view engine','pug')

app.use('/static',express.static('public'));

/****** GET home page ******/
app.get('/', (req,res)=>{
//pass all the project data to the index template
    res.render('index',{projects});
});

/******  GET About page ******/
app.get('/about',(req,res)=>{
    res.render('about');
});

/****** GET Project page ******/
app.get('/project/:id',(req,res,next)=>{
    const id =req.params.id;
    const project = projects[id];
    //console.log(data.find(({ id })=> id === +projectId));
    
    if(project){
    //pass the project data to project template
        res.render('project',{project});
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
app.use((err,req,res, next)=>{
    if(err.status === 404){
        console.log("404 Error Handler Called");
        res.status (404).render('page-not-found',{ err })
    }else{
    res.status(err.status|| 500).render('error',{ err });
    }
});


// display app on screen
app.listen(3000,()=>{
    console.log('The application is running on the localhost:3000!')
});
