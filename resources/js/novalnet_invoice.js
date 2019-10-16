$(document).ready( function() {
	
	$("#nn_invoice_date").on("keypress keyup",function (e) {     	
	var value = String.fromCharCode(e.which);		
	var reg = new RegExp(/[^0-9]/g);
	if (value.match(reg))
	{		
	e.preventDefault();
	}
	var day_val = $('#nn_invoice_date').val();
	var len = day_val.length;     
	if ((len == 1 && ((value > -1 && day_val.charAt(0) > 3))) || (len == 1 && ((value == 0 && day_val.charAt(0) == 0))) || (len == 1 && ((value > 1 && day_val.charAt(0) == 3)))) {
	return false;
	}

	});
	
	$("#nn_invoice_year").on("keypress keyup",function (e) {		
		var value = String.fromCharCode(e.which);
		var reg = new RegExp(/[^0-9]/g);
		if (value.match(reg))
		{
		  e.preventDefault();
		}
        	var year_val = $( '#nn_invoice_year' ).val();
        	var len = year_val.length;     
      		
		if ((len == 0 && (value != 2 && value != 1)) || (len == 1 && ((value != 9 && year_val.charAt(0) == 1) || (value != 0 && year_val.charAt(0) == 2))))
		{
		  return false;
		} 
	
	});

	
    function autocomplete(inp, arr) {
 
    var currentFocus;
  
   inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
     
      closeAllLists();
      if (!val || val.length < 2) { return false;}
      currentFocus = -1;
      
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      
      this.parentNode.appendChild(a);
      var count = 1;
      for (i = 0; i < arr.length; i++) {     
        var regex = new RegExp( val, 'g' );
        if (arr[i].match(regex)) {   
	  if( count == 10 ) {
	   break;
	  }
          b = document.createElement("DIV");
          b.innerHTML = arr[i].replace( val,"<strong>" + val + "</strong>" );          
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
	  count++;
        }
      }
  });
  
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { 
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

let current_date = new Date();
	  current_date.getFullYear();
	  var max_year = current_date.getFullYear();	  
	  var min_year = current_date.getFullYear() - 120;
	  
    var year_range = [];
    
    for( var year = max_year; year >= min_year; year-- ) {				
		year_range.push('' + year + '');
	}

    autocomplete(document.getElementById("nn_invoice_year"), year_range);
	
	$('#nn_invoice_form').on('submit', function() {
	$('#novalnet_form_btn').attr('disabled',true);
        if ( $("#nn_invoice_year").val() == '' || $("#nn_invoice_date").val() == '' ) {
	alert('Enter the date of birth');
	$('#novalnet_form_btn').attr('disabled',false);
	return false;
	}
        if($("#nn_invoice_month").val() == '' ) {
	alert('Select a month');
	$('#novalnet_form_btn').attr('disabled',false);
        return false;
	}
	var birthday = $("#nn_invoice_date").val() + '-' + $("#nn_invoice_month").val() + '-' + $("#nn_invoice_year").val();
	if (Date.parse(birthday) ) {
	alert("The date format is invalid");
	$('#novalnet_form_btn').attr('disabled',false);
	return false;
	}
	});
});

 
