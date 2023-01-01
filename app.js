
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
// const {google} = require('googleapis');
// const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
// const googleSheets = google.sheets({version: 'v4', });

const app = express();

let shopItems = [{
  image: "decbottle.png",
  itemName: "Decorative Bottle",
  aboutItem: "A beautiful decorative glass bottle with a light inside it. It has a tree with pink colour leaves. There are grasses surrounding it. All of it is glass painted. It has a string light which makes it even more awesome.",
  phoneNo: "+91 91485 48587",
  email: "mugi.gunalan@gmail.com",
  cost:"₹200"
}];

let stories = [{ name: "the-mistake", likes: 0 }, { name: "the-johns-p1", likes: 0 }];

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

app.get("/latest-update", function(req, res){
  res.render("update");
});

// app.get("/subscribe", function(req, res){
//   res.render("subscribe");
// });
//
// app.post("/", async function (req, res) {
//   const data = {
//     name: req.body.name,
//     email: req.body.email
//   }
//
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets"
//   });
//
//   const client = await auth.getClient();
//   const spreadsheetId = "1j13wEpFAQvtnQS7VQNzVWC0KExaUj1xWVwqrwCGbVOM";
//
//   const metaData = googleSheets.get({
//     auth,
//     spreadsheetId
//   });
//
//   const getRows = await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A2:B"
//   });
//
// async function main () {
//   const authClient = await authorize();
//   const request = {
//     // The ID of the spreadsheet to update.
//     spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.
//     resource: {
//       // How the input data should be interpreted.
//       valueInputOption: '',
//       data: [data],
//     },
//     auth: authClient,
//   };
//  }
// });

app.get("/the-mistake", function(req, res){
  res.render("the-mistake", {
    likes: stories[0].likes
  });
});

app.get("/the-johns-p1", function(req, res){
  res.render("the-johns-p1", {
    likes: stories[1].likes
  })
});

app.post("/:storyNo-like", function(req, res){
  let i = req.params.storyNo;
  stories[i].likes = stories[i].likes + 1;
  res.redirect(stories[i].name);
});

app.post("/:storyNo-dislike", function(req, res){
  let i = req.params.storyNo;
  stories[i].likes = stories[i].likes - 1;
  res.redirect(stories[i].name);
});

app.listen(3000 || process.env.PORT, function(){
  console.log("Server runing on port 3000.");
});

// 880558919012-ulfchtfleqm47c7tds4f6uv0qm7f6e20.apps.googleusercontent.com - Client Id
// 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 - client secret
