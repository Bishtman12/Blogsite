//IMPORTING LIBS 
const express = require("express");
const BodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const $ = require("jquery");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// DATABSE LOGIC // 
mongoose.connect("mongodb://localhost:27017/BlogDB");
const PostSchema = new mongoose.Schema({
    title : {type : String , required:true}, 
    article : String
});

const Post =  mongoose.model("Post" , PostSchema);


let Posts = [];
app.set('view engine' , 'ejs');
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const article = "THIS IS THE FIRST POST OF MY BLOG";
const about = "Self-Taught Prog";
const contact = "Contact me at bishtman12@gmail.com";


//Routes for websites
app.get("/" , function(req,res){
    Post.find(function(err,postList){
        if (err){
            console.log(err);
        }
        else{
            res.render("home" , {postList:postList});
        }
    })
});

app.get("/about" , function(req,res){
    res.render("about" , {about : about});
});

app.get("/contact" , function(req,res){
    res.render("contact" , {contact : contact});
});

app.get("/compose" , function(req,res){
    res.render("compose");
});

app.get("/post/:title" , function(req,res){
    var url = req.params.title;
    console.log(url);
    Post.findOne({_id:url} , function(err,FoundPost){
        if (err){
            console.log(err);
        }
        else{
            res.render("post" ,{PostTitle : FoundPost.title , PostText:FoundPost.article} );
        }
    })
});

app.post("/compose" , function(req,res){
    var PostTitle = req.body.PostTitle;
    var PostText = req.body.PostText;
    const newPost = new Post({
        title : PostTitle , 
        article : PostText
    });
    newPost.save();
    res.redirect("/");
});

app.listen(port, function(){
    console.log("Server is Running" + port);
});
