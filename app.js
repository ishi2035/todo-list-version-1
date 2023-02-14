const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());


const app = express();
const port = 3000;


var items = ["buy", "cook", "eat"];
var workItem = [];


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.listen(port, function() {
    console.log("sever started at port 3000");
});


app.get("/", function(req, res) {

    day = date();
    console.log(day);


    res.render("list", { ListTitle: day, newItems: items });
});

app.get("/work", function(req, res) {
    res.render("list", { ListTitle: "Work list", newItems: workItem });
});

app.get("/about", function(req, res) {
    res.render("about");
})



app.post("/", function(req, res) {
    console.log(req.body);
    var item = req.body.task;
    if (req.body.list === "Work") {
        // console.log("work");
        workItem.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});
// app.post("/work", function(req, res) {
//     var item = req.body.task;
//     workItem.push(item);
//     res.redirect("/work");
// })