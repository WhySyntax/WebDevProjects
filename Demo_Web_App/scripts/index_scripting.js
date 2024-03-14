const wikis = new Set();
function fetch_wikis() {
   var req = new Request("wikis.dat");
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
   // var xhttp = new XMLHttpRequest();
   // xhttp.onreadystatechange = function() {
   //    if (this.readyState == 4 && this.status == 200) {
   //       // console.log("retrieved file correctly");
   //       var raw = this.responseText.split('\n');
   //       for (var row of raw) {
   //          // console.log(row.trim());
   //          wikis.add(row.trim());
   //          // console.log(wikis.size);
   //       }
   //       link_wikis();
   //       // console.log(`File Contents: ${raw}`);
      // } else {
      //    console.log(`Look up what status code ${this.status} with ready state ${this.readyState} means`);
      // }
   // };
   // xhttp.open("POST", "wikis.dat", true);
   // xhttp.send();
}

function link_wikis() {
   var wikis_list = document.getElementById("wikis_list");
   wikis_list.innerHTML = "";
   for (var wiki of wikis.values()) {
      // console.log(wiki);
      wikis_list.innerHTML += '<li><a href="' + wiki + '_index.html">' + wiki.replace(/_/g, ' ') + '</a></li><br>';
   }
}

window.onload = function() {
   var path = window.location.pathname;
   var page = path.split("/").pop();
   // console.log(page);
   // console.log(path);
   if (page == "index.html" || page == "") {
      //loop through folder and check for index files, create a list of links to them
      fetch_wikis();
   } else {
      //loop through folder with corresponding names and create a list of links to any that are html
      
      
   }
   console.log("Done Loading window");
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

}