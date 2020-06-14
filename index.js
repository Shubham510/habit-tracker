const express = require('express');
const path = require('path');
const port =8000;

const db= require('./config/mongoose');
const Task = require('./models/habit');
const Habit = require('./models/habit');

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

var days= ['Daily','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

app.get('/',function(req,res){
    Habit.find({},function(err,habits){
        if(err){
            console.log('Error in fetching habits from db');
            return;
        }

        return res.render('home',{
            habits: habits
        });
    });
});

app.get('/weekly-view',function(req,res){
    return res.render('week_view');
});

app.get('/create-habit',function(req,res){
    return res.render('create_habit',{
        days:days
    });
});

app.post('/create',function(req,res){
    let repeatValue=req.body.repeat;
    let rep ="Daily";
    if (repeatValue==='Daily'){
        rep=repeatValue;
    }
    else if (repeatValue[0]==='Daily'){
        rep="Daily";
    }
    else{
        rep= repeatValue.length+" days"
    }
    Habit.create({
        habit: req.body.habit,
        time: req.body.time,
        repeat:req.body.repeat,
        days:rep,
        currentStreak: req.body.currentStreak,
        longestStreak: req.body.longestStreak
    }, function(err,newHabit){
        if(err){
            console.log('Error in creating habit',err);
            return;
        }

        return res.redirect('/');
    });
});

app.listen(port, function(err){
    if(err){
        console.log("Error in running the server ", err)
    }

    console.log("The express server is running on port: ",port);
})