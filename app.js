
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();

let shopItems = [{
  image: "decbottle.png",
  itemName: "Decorative Bottle",
  aboutItem: "A beautiful decorative glass bottle with a light inside it. It has a tree with pink colour leaves. There are grasses surrounding it. All of it is glass painted. It has a string light which makes it even more awesome.",
  phoneNo: "+91 91485 48587",
  email: "mugi.gunalan@gmail.com",
  cost:"₹200"
}];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", function(req, res){
  res.redirect("/home");
});

app.get("/home", function(req, res){
  res.render("home");
});

app.get("/mnm-bros", function(req, res){
  res.render("mnm-bros");
});

app.get("/shopping", function(req, res){
  res.render("shopping", {
    items: shopItems
  });
});

app.get("/shopping-:itemName", function(req, res){
  const requiredName = lodash.lowerCase(req.params.itemName);
  shopItems.forEach(function(item){
    const eachItemName = lodash.lowerCase(item.itemName);
    if (requiredName === eachItemName) {
      res.render("shop-item", {
        item:item
      });
    } else {
      res.render("shop-item", {
        item:"Not Found"
      });
    }
  });
});

app.get("/novel-the-mistake", function(req, res){
  res.render("the-mistake");
});

app.listen(3000, function(){
  console.log("Server runing on port 3000.");
});
