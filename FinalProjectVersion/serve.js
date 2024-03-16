const express = require("express");
const url = require("url");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.get("*", (req, res) => {
   var q = url.parse(req.url, true);
   if (q.pathname == "/exit") process.exit();
   if (q.pathname == "/") q.pathname = "/index.html";

   res.sendFile(path.join(__dirname, q.pathname), (err) => {
      if (err) {
         if (q.pathname.slice(-10) == "index.html") {
            let wiki = q.pathname.split('/').pop();
            wiki = wiki.slice(0, -11);
            wiki = wiki.replace(/_/g, ' ');
            res.render("wiki_index", {wiki: wiki});
         } else {
            console.log(err);
            res.status(404);
            res.render("404", {resource: q.pathname});
         }
      }
   });
});

app.listen(PORT, (error) =>{ 
   if(!error)
       console.log("Server is Successfully Running, and App is listening on port "+ PORT);
   else
       console.log("Error occurred, server can't start", error); 
   }
); 