const wikis = new Set();
function fetch_wikis() {
   var req = new Request("/dirs/wikis.dat");
   fetch(req).then((response) => {
      if (!response.ok){
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
   }).then((raw) => {
      for (var wiki of raw.split('\n')) {
         wikis.add(wiki.trim());
      }
      link_wikis();
   });
}

function link_wikis() {
   var wikis_list = document.getElementById("wikis_list");
   wikis_list.innerHTML = "";
   for (var wiki of wikis.values()) {
      // console.log(wiki);
      wikis_list.innerHTML += '<li><a href="' + wiki + '_index.html">' + wiki.replace(/_/g, ' ') + '</a></li><br>';
   }
}

function fetch_articles(wiki) {
   var req = new Request('/dirs/' + wiki + '.dat');
   fetch(req).then((response) => {
      console.log(response.status);
      if (response.ok) {
         return response.text();
      }
      return "";
   }).then((raw) => {
      // console.log(raw);
      if (raw == "") return;
      for (var article of raw.split('\n')) {
         wikis.add(article.trim());
      }
      link_articles(wiki);
   });
}

function link_articles(wiki) {
   var articles_list = document.getElementById("articles_list");
   articles_list.innerHTML = "";
   for (var article of wikis.values()) {
      articles_list.innerHTML += '<li><a href="' + '/articles/' + article + '.html">' + article.replace(/_/g, ' ') + '</a></li><br>';
   }
}

window.onload = function() {
   var path = window.location.pathname;
   var page = path.split("/").pop();
   // console.log(page);
   console.log(path);
   if (page == "index.html" || page == "") {
      //loop through folder and check for index files, create a list of links to them
      fetch_wikis();
   } else {
      //loop through folder with corresponding names and create a list of links to any that are html
      // console.log(page);
      // console.log(page.slice(0,-11));
      fetch_articles(page.slice(0,-11));
   }
   // console.log("Done Loading window");
}

function create_wiki() {
   var check_user = document.getElementById("passcode").value;
   if (check_user != "kabir") {
      alert("You lack permission to make a wiki");
      return;
   }
   var new_wiki = document.getElementById("new_wiki").value.replace(/ /g, "_").toLowerCase();
   console.log(new_wiki);
   if (wikis.has(new_wiki)) {
      alert("Wiki Already Exists");
      return;
   }
   //create an index file and an articles folder
}

function create_article() {
   var check_user = document.getElementById("passcode").value;
   if (check_user != "kabir") {
      alert("You lack permission to make an article");
      return;
   }
   var new_article = document.getElementById("new_article").value.replace(/ /g, "_").toLowerCase();
   // console.log(new_article);
   if (wikis.has(new_article)) {
      alert("Article Already Exists");
      return;
   }
   //add new article to .dat
}