const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
// const {google} = require('googleapis');
// const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
// const googleSheets = google.sheets({version: 'v4', });

const app = express();

let items = [{
  itemName: "Painting",
  requiredInfo: [{ info1: "Paper/Fabric" }, { info2: "Image to be painted." }],
  phoneNo: "+91 91485 48587",
  email: "mugi.gunalan@gmail.com"
}, {
  itemName: "Name Shading",
  requiredInfo: [{ info1: "Name to be shaded" }, { info2: "Light to dark level shading/Same level shading." }],
  phoneNo: "+91 91485 48587",
  email: "mugi.gunalan@gmail.com"
}];

let stories = [{ name: "the-mistake", likes: 0, dislikes: 0 }, { name: "the-johns-p1", likes: 0, dislikes: 0 }];

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

app.get("/artics", function(req, res){
  res.render("artics", {
    items: items
  });
});

app.get("/artics-:itemName", function(req, res){
  const requiredName = lodash.lowerCase(req.params.itemName);
  items.forEach(function(item){
    const eachItemName = lodash.lowerCase(item.itemName);
    if (requiredName === eachItemName) {
      res.render("artics-item", {
        item:item
      });
    } else {
      res.render("artics-item", {
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
    likes: stories[0].likes,
    dislikes: stories[0].dislikes
  });
});

app.get("/the-johns-p1", function(req, res){
  res.render("the-johns-p1", {
    likes: stories[1].likes,
    dislikes: stories[1].dislikes
  })
});

app.post("/:storyNo/like", function(req, res){
  let i = req.params.storyNo;
  stories[i].likes = stories[i].likes + 1;
  res.redirect(stories[i].name);
});

app.post("/:storyNo/dislike", function(req, res){
  let i = req.params.storyNo;
  stories[i].dislikes = stories[i].dislikes + 1;
  res.redirect(stories[i].name);
});

app.listen(3000 || process.env.PORT, function(){
  console.log("Server runing on port 3000.");
});

// 880558919012-ulfchtfleqm47c7tds4f6uv0qm7f6e20.apps.googleusercontent.com - Client Id
// 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 - client secret
