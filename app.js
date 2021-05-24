//REQUIRED:
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var expressSanitizer=require("express-sanitizer");
var mongoose=require("mongoose");
var methodOverride=require("method-override");

//REQUIRED:
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//MONGOOSE CONNECT(DATABASE NAME):
mongoose.connect("mongodb://localhost/blog_app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//MONGOOSE SCHEMA:
var blogappSchema=new mongoose.Schema({
    name:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
});

//MONGOOSE MODEL(COLLECTION NAME):
var blogApp=mongoose.model("BlogApp",blogappSchema);

//CREATE:
// blogApp.create({
//     name:"Doggie",
//     image:"data:image/jpeg;base64,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",
//     body:"Hello Guys! Meet my cute doggie:Rusty! He is super adorable and cute!"
// },function(err,blog){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(blog);
//     }
// });

//(LOCALHOST:3000) PAGE:
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//INDEX:
app.get("/blogs",function(req,res){
    blogApp.find({},function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blog:blog})
        }
    })
});

//NEW:
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//CREATE:
app.post("/blogs",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blogApp.create(req.body.blog,function(err,blogs){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    })
});

//SHOW:
app.get("/blogs/:id",function(req,res){
    blogApp.findById(req.params.id,function(err,foundnewblog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show",{blog:foundnewblog});
        }
    })
});

//EDIT:
app.get("/blogs/:id/edit",function(req,res){
    blogApp.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.render("edit",{blog:foundBlog});
        }
    })
});

//UPDATE:
app.put("/blogs/:id",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blogApp.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//DELETE:
app.delete("/blogs/:id",function(req,res){
    blogApp.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    })
});


//REQUIRED:
app.listen(3000, function() { 
    console.log('BlogApp server has started'); 
  });