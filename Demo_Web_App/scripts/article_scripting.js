function swap_table_of_contents(evt, needed_table) {
   console.log(evt);
   var i, tables, table_switchers;
   tables = document.getElementsByClassName("table_of_contents");
   table_switchers = document.getElementsByClassName("tablinks");
   for (i = 0; i < tables.length; i++) {
      tables[i].style.display = "none";
      table_switchers[i].className = table_switchers[i].className.replace(" active", "");
   }
   document.getElementById(needed_table).style.display = "block";
   evt.currentTarget.className += " active";
}

function hide_spoilers() {
   var i, current_position, pars;
   var slider = document.getElementById("progress_indicator");
   current_position = Number(slider.value);
   console.log(`Hiding spoilers unavalible at ${current_position}`);
   pars = document.getElementsByClassName("spoiler_potential");
   for (i = 0; i < pars.length; i++) {
      let reveal, retcon;
      if ("reveal" in pars[i].dataset) {
         reveal = Number(pars[i].dataset.reveal);
      } else {
         reveal = 0;
      }
      if ("retcon" in pars[i].dataset) {
         retcon = Number(pars[i].dataset.retcon);
      } else {
         retcon = Number(slider.max) + 1;
      }
      //console.log("Current item revealed at " + reveal + " and retconned at " + retcon);
      if (reveal <= current_position && retcon > current_position) {
         if ((current_position - reveal) == 0) {
            pars[i].style.color = "red";
         } else {
            pars[i].style.color = "azure";
         }
         pars[i].style.display = "block";
      } else {
         pars[i].style.display = "none";
      }
   }
}

function update_progress_indicator() {
   /*
   you could also have an array here of the possible options for user progress, ie book1, book2, book3 and just index the list by the slider position and display that
   */
   document.getElementById("indicated_progress").innerHTML = String(document.getElementById("progress_indicator").value).padStart(2,'0');
}

window.onload = function() {
   update_progress_indicator();
   hide_spoilers();
   var toc = document.getElementsByClassName("tablinks");
   toc[0].click();
}